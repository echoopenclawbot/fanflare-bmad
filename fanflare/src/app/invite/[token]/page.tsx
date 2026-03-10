'use client';

import { useState } from 'react';

interface InvitePageProps {
  params: {
    token: string;
  };
}

export default function InviteAcceptPage({ params }: InvitePageProps) {
  return <InviteAcceptForm token={params.token} />;
}

function InviteAcceptForm({ token }: { token: string }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const acceptInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const response = await fetch('/api/invitations/accept', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, name, password }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(data.error ?? 'Failed to accept invitation');
        return;
      }

      setAccepted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black/5 p-6">
      <div className="w-full max-w-md rounded-xl border bg-white p-6 shadow">
        <h1 className="mb-2 text-2xl font-semibold">Accept your Fanflare invite</h1>
        <p className="mb-6 text-sm text-gray-600">
          Finish setup to join your tenant with the assigned role.
        </p>

        {accepted ? (
          <div className="space-y-4">
            <p className="rounded bg-green-50 p-3 text-green-700">
              Invite accepted. You can now sign in with your email and password.
            </p>
            <a href="/auth/signin" className="inline-block rounded bg-blue-600 px-4 py-2 text-white">
              Go to sign in
            </a>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={acceptInvite}>
            <div>
              <label className="mb-1 block text-sm font-medium">Full name</label>
              <input
                className="w-full rounded border p-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Password</label>
              <input
                type="password"
                className="w-full rounded border p-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={8}
                required
              />
            </div>

            {error ? <p className="text-sm text-red-600">{error}</p> : null}

            <button
              type="submit"
              className="rounded bg-black px-4 py-2 text-white disabled:opacity-60"
              disabled={submitting}
            >
              {submitting ? 'Accepting…' : 'Accept invitation'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
