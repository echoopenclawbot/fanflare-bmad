# Story 1.3: invite-users-and-assign-roles

Status: ready-for-dev

## Story

As an Agency Owner,
I want to invite users and assign roles,
so that I can manage my team permissions and collaborate securely within the tenant.

## Acceptance Criteria

1. Agency Owner can generate invite links or email invites for new users (Manager, Model, Freelancer roles).
2. Invited user receives invite via email/link, completes self-onboarding with profile setup.
3. Agency Owner can assign/revoke roles and permissions (RBAC: Owner full, Manager ops, Model self-scoped).
4. Role changes take effect immediately, with audit log entry.
5. Offline support for invite acceptance (sync on reconnect).
6. Compliance: Consent acknowledgment during onboarding; immutable logs.
7. Error handling: Invalid invites expire, duplicate emails handled gracefully.

## Tasks / Subtasks

- [ ] Implement invite generation API (app/api/users/invite/route.ts)
  - [ ] POST /api/users/invite with {email, role, permissions}
  - [ ] Generate secure token (JWT-like, expires 7d), email service stub.
- [ ] Build invite acceptance flow (features/auth/InviteAccept.tsx)
  - [ ] GET /api/auth/accept-invite?token=...
  - [ ] Self-onboarding form (profile, consent).
- [ ] Role management UI/API (features/users/RoleManager.tsx, app/api/users/roles/route.ts)
  - [ ] PATCH /api/users/{id}/roles {role, permissions}
  - [ ] RBAC enforcement via middleware (lib/auth.ts).
- [ ] Audit logging for role changes (services/complianceService.ts).
- [ ] Tests: unit for APIs, e2e for flow, offline sync.
- [ ] Update Prisma schema: add invites table (token, status, expires_at).

## Dev Notes

- **Architecture Compliance:** Use NextAuth Credentials for auth; JWT custom claims for roles (tenantId, role, permissions). Middleware for RBAC. Prisma users table with role enum (AGENCY_OWNER, MANAGER, MODEL, FREELANCER). Redis cache for sessions.
- **Source Tree Components:** src/components/features/auth/, src/services/userService.ts, app/api/users/, prisma/schema.prisma (users, invites tables), lib/auth.ts.
- **Previous Stories:** 1-1 (Next.js setup): Use app router, Tailwind. 1-2 (tenant create): Extend tenant-aware middleware; reuse tenantId from user claims.
- **Latest Tech:** NextAuth v4.24+, Prisma v5.17+ (RLS for multi-tenant). Zod for validation.
- **Testing Standards:** Jest/Vitest, 80% coverage; test RBAC edge cases, offline queue.
- **Anti-Patterns:** No direct DB access (use services); immutable audits only via complianceService; no global state for roles (use Zustand store).

### Project Structure Notes

- Align with features/users/, services/userService.ts.
- No conflicts detected.

### References

- [PRD: FR2, FR4 - User Management](_bmad-output/planning-artifacts/prd.md#functional-requirements)
- [Architecture: Auth & RBAC](_bmad-output/planning-artifacts/architecture.md#authentication--security)
- [Starter: Next.js App Router](_bmad-output/planning-artifacts/architecture.md#architectural-decisions-provided-by-starter)

## Dev Agent Record

### Agent Model Used

xai/grok-4

### Debug Log References

N/A

### Completion Notes List

- Comprehensive context extracted from PRD/Architecture.
- Ready for dev-story.

### File List

N/A (pre-implementation)