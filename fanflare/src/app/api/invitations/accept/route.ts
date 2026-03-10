import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '../../../../lib/prisma';

export async function POST(request: NextRequest) {
  const body = (await request.json()) as {
    token?: string;
    name?: string;
    password?: string;
  };

  const token = body.token?.trim() ?? '';
  const name = body.name?.trim() ?? '';
  const password = body.password ?? '';

  if (!token || !name || password.length < 8) {
    return NextResponse.json(
      { error: 'Token, name, and a password with at least 8 characters are required' },
      { status: 400 }
    );
  }

  const invitation = await prisma.invitation.findUnique({
    where: { token },
  });

  if (!invitation) {
    return NextResponse.json({ error: 'Invitation not found' }, { status: 404 });
  }

  if (invitation.status !== 'PENDING' || invitation.acceptedAt || invitation.expiresAt <= new Date()) {
    return NextResponse.json({ error: 'Invitation is no longer valid' }, { status: 410 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await prisma.user.findUnique({
    where: { email: invitation.email },
  });

  await prisma.$transaction(async (tx) => {
    if (existingUser) {
      await tx.user.update({
        where: { id: existingUser.id },
        data: {
          name,
          password: hashedPassword,
          role: invitation.role,
          tenantId: invitation.tenantId,
        },
      });
    } else {
      await tx.user.create({
        data: {
          email: invitation.email,
          name,
          password: hashedPassword,
          role: invitation.role,
          tenantId: invitation.tenantId,
        },
      });
    }

    await tx.invitation.update({
      where: { id: invitation.id },
      data: {
        status: 'ACCEPTED',
        acceptedAt: new Date(),
      },
    });
  });

  return NextResponse.json({
    ok: true,
    email: invitation.email,
    role: invitation.role,
  });
}
