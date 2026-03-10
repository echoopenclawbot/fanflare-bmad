import crypto from 'node:crypto';
import { InvitationStatus, Role } from '@prisma/client';

export const INVITABLE_ROLES: Role[] = ['MANAGER', 'MODEL', 'FREELANCER'];

export function createInvitationToken() {
  return crypto.randomBytes(24).toString('hex');
}

export function invitationExpiryDate(days = 7) {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + days);
  return expiresAt;
}

export function normalizeInvitationEmail(email: string) {
  return email.trim().toLowerCase();
}

export function isInvitableRole(role: string): role is Role {
  return INVITABLE_ROLES.includes(role as Role);
}

export function deriveInvitationStatus(
  status: InvitationStatus,
  expiresAt: Date,
  acceptedAt: Date | null
) {
  if (status === 'ACCEPTED' || acceptedAt) {
    return 'accepted' as const;
  }

  if (expiresAt.getTime() < Date.now()) {
    return 'expired' as const;
  }

  return 'pending' as const;
}
