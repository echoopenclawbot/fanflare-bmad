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
  const [consentAccepted, setConsentAccepted] = useState(false);
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
        body: JSON.stringify({ token, name, password, consentAccepted }),
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
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="glass-card w-full max-w-md p-6 text-white shadow">
        <div className="glass-content">
          <h1 className="mb-2 text-2xl font-semibold text-white">Accept your Fanflare invite</h1>
          <p className="glass-muted mb-6 text-sm">
            Finish profile setup and acknowledge consent to activate your account.
          </p>

          {accepted ? (
            <div className="space-y-4">
              <p className="rounded-xl bg-emerald-500/15 p-3 text-emerald-100">
                Invite accepted. You can now sign in with your email and password.
              </p>
              <a href="/auth/signin" className="glass-button inline-block">
                Go to sign in
              </a>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={acceptInvite}>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-100">Full name</label>
                <input className="glass-input" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-100">Password</label>
                <input
                  type="password"
                  className="glass-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={8}
                  required
                />
              </div>

              <label className="rounded-xl border border-white/20 bg-white/10 p-3 text-sm text-slate-100 flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={consentAccepted}
                  onChange={(e) => setConsentAccepted(e.target.checked)}
                  className="mt-1"
                  required
                />
                <span>
                  I acknowledge the platform consent and usage requirements and want to activate my
                  account for the assigned tenant role.
                </span>
              </label>

              {error ? <p className="text-sm text-red-200">{error}</p> : null}

              <button type="submit" className="glass-button w-full disabled:opacity-60" disabled={submitting}>
                {submitting ? 'Accepting…' : 'Complete onboarding'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
