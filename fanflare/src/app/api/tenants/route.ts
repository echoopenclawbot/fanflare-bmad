import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../lib/auth';
import { prisma } from '../../../lib/prisma';

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'AGENCY_OWNER') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { name } = await request.json();
  if (!name) {
    return NextResponse.json({ error: 'Tenant name required' }, { status: 400 });
  }

  try {
    const tenant = await prisma.tenant.create({
      data: {
        name,
        ownerId: session.user.id,
      },
    });

    await prisma.user.update({
      where: { id: session.user.id },
      data: { tenantId: tenant.id },
    });

    return NextResponse.json(tenant);
  } catch {
    return NextResponse.json({ error: 'Failed to create tenant' }, { status: 500 });
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const tenants = await prisma.tenant.findMany({
      where: { ownerId: session.user.id },
    });
    return NextResponse.json(tenants);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch tenants' }, { status: 500 });
  }
}