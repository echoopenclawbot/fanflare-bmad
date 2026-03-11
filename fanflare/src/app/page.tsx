'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';

const ROLE_COPY: Record<string, string> = {
  AGENCY_OWNER: 'Manage your agency, tenants, and invitations.',
  MANAGER: 'Access your manager workspace and collaborate with your agency team.',
  MODEL: 'Review your profile, role, and creator tools assigned by your agency.',
  FREELANCER: 'Access the freelancer workflow and collaborate with your assigned tenant.',
  USER: 'Access the features available for your account.',
};

export default function Home() {
  const { data: session, status } = useSession();

  if (status === 'loading') return <div>Loading...</div>;

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="glass-card w-full max-w-md p-8 text-center text-white shadow-xl">
          <div className="glass-content">
            <h1 className="mb-4 text-3xl">Welcome to Fanflare</h1>
            <Link href="/auth/signin" className="glass-button inline-block">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const role = session.user.role;

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="glass-card w-full max-w-xl p-8 text-white shadow-2xl">
        <div className="glass-content">
          <h1 className="mb-2 text-3xl font-semibold">Welcome, {session.user.name || session.user.email}</h1>
          <p className="mb-2 text-sm uppercase tracking-[0.2em] text-blue-200">{role}</p>
          <p className="glass-muted mb-6">{ROLE_COPY[role] ?? ROLE_COPY.USER}</p>

          <div className="flex flex-wrap gap-3">
            {role === 'AGENCY_OWNER' ? (
              <Link href="/dashboard" className="glass-button inline-block">
                Go to Dashboard
              </Link>
            ) : (
              <span className="glass-button-secondary text-sm">
                Your account is active and ready for role-based access.
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
