'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Home() {
  const { data: session, status } = useSession();

  if (status === 'loading') return <div>Loading...</div>;

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl mb-4">Welcome to Fanflare</h1>
          <Link href="/auth/signin" className="p-2 bg-blue-500 text-white rounded">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-4">Welcome, {session.user.name || session.user.email}</h1>
      {session.user.role === 'AGENCY_OWNER' && (
        <Link href="/dashboard" className="p-2 bg-green-500 text-white rounded">
          Go to Dashboard
        </Link>
      )}
    </div>
  );
}