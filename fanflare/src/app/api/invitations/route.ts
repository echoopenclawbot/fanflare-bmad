import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../lib/auth';
import { prisma } from '../../../lib/prisma';
import {
  createInvitationToken,
  deriveInvitationStatus,
  invitationExpiryDate,
  isInvitableRole,
  normalizeInvitationEmail,
} from '../../../lib/invitations';

async function resolveOwnerTenantId(userId: string, tenantId?: string) {
  if (tenantId) {
    return tenantId;
  }

  const tenant = await prisma.tenant.findFirst({
    where: { ownerId: userId },
    orderBy: { createdAt: 'desc' },
  });

  return tenant?.id;
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'AGENCY_OWNER') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const tenantId = await resolveOwnerTenantId(session.user.id, session.user.tenantId);
  if (!tenantId) {
    return NextResponse.json([]);
  }

  const invitations = await prisma.invitation.findMany({
    where: { tenantId },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(
    invitations.map((invitation) => ({
      id: invitation.id,
      email: invitation.email,
      role: invitation.role,
      token: invitation.token,
      createdAt: invitation.createdAt,
      expiresAt: invitation.expiresAt,
      acceptedAt: invitation.acceptedAt,
      status: deriveInvitationStatus(invitation.status, invitation.expiresAt, invitation.acceptedAt),
    }))
  );
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'AGENCY_OWNER') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const tenantId = await resolveOwnerTenantId(session.user.id, session.user.tenantId);
  if (!tenantId) {
    return NextResponse.json({ error: 'Create a tenant before inviting users' }, { status: 400 });
  }

  const body = (await request.json()) as { email?: string; role?: string };
  const email = normalizeInvitationEmail(body.email ?? '');
  const role = body.role ?? '';

  if (!email || !isInvitableRole(role)) {
    return NextResponse.json({ error: 'Valid email and role are required' }, { status: 400 });
  }

  const existingPendingInvitation = await prisma.invitation.findFirst({
    where: {
      tenantId,
      email,
      status: 'PENDING',
      expiresAt: { gt: new Date() },
    },
  });

  if (existingPendingInvitation) {
    return NextResponse.json({ error: 'An active invitation already exists for this user' }, { status: 409 });
  }

  const invitation = await prisma.invitation.create({
    data: {
      email,
      role,
      token: createInvitationToken(),
      tenantId,
      inviterId: session.user.id,
      expiresAt: invitationExpiryDate(),
    },
  });

  return NextResponse.json(
    {
      id: invitation.id,
      email: invitation.email,
      role: invitation.role,
      token: invitation.token,
      createdAt: invitation.createdAt,
      expiresAt: invitation.expiresAt,
      status: deriveInvitationStatus(invitation.status, invitation.expiresAt, invitation.acceptedAt),
    },
    { status: 201 }
  );
}
