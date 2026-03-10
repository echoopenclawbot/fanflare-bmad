'use client';

import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Tenant {
  id: string;
  name: string;
  createdAt: string;
}

interface Invitation {
  id: string;
  email: string;
  role: 'MANAGER' | 'MODEL' | 'FREELANCER';
  token: string;
  createdAt: string;
  expiresAt: string;
  acceptedAt?: string | null;
  status: 'pending' | 'accepted' | 'expired';
}

interface LocalTenantDoc extends Tenant {
  _id: string;
  _rev?: string;
  _deleted?: boolean;
}

interface LocalDbRow {
  id: string;
  value: {
    rev?: string;
  };
  doc?: Partial<Tenant>;
}

interface LocalDb {
  allDocs(options?: { include_docs?: boolean }): Promise<{ rows: LocalDbRow[] }>;
  bulkDocs(docs: Array<Record<string, unknown>>): Promise<unknown>;
}

const INVITABLE_ROLES: Invitation['role'][] = ['MANAGER', 'MODEL', 'FREELANCER'];

async function getLocalDb(): Promise<LocalDb> {
  const pouchModule = await import('pouchdb');
  const PouchDB = pouchModule.default;

  return new PouchDB('tenants') as LocalDb;
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [newTenantName, setNewTenantName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<Invitation['role']>('MANAGER');
  const [inviteMessage, setInviteMessage] = useState('');

  const inviteBaseUrl = useMemo(
    () => (typeof window === 'undefined' ? '' : window.location.origin),
    []
  );

  const loadOfflineTenants = useCallback(async () => {
    const localDb = await getLocalDb();
    const result = await localDb.allDocs({ include_docs: true });
    const offlineTenants = result.rows.flatMap((row) => {
      const doc = row.doc as Partial<Tenant> | undefined;

      if (!doc?.id || !doc.name || !doc.createdAt) {
        return [];
      }

      return [
        {
          id: doc.id,
          name: doc.name,
          createdAt: doc.createdAt,
        },
      ];
    });

    setTenants(offlineTenants);
  }, []);

  const fetchInvitations = useCallback(async () => {
    const res = await fetch('/api/invitations');
    if (!res.ok) {
      return;
    }

    const data: Invitation[] = await res.json();
    setInvitations(data);
  }, []);

  const fetchTenants = useCallback(async () => {
    const localDb = await getLocalDb();

    try {
      const res = await fetch('/api/tenants');

      if (!res.ok) {
        await loadOfflineTenants();
        return;
      }

      const data: Tenant[] = await res.json();
      setTenants(data);

      const existingDocs = await localDb.allDocs();
      if (existingDocs.rows.length > 0) {
        await localDb.bulkDocs(
          existingDocs.rows.map((row) => ({
            _id: row.id,
            _rev: row.value.rev,
            _deleted: true,
          }))
        );
      }

      await localDb.bulkDocs(
        data.map((tenant) => ({
          _id: tenant.id,
          ...tenant,
        } satisfies LocalTenantDoc))
      );
    } catch {
      await loadOfflineTenants();
    }
  }, [loadOfflineTenants]);

  useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      router.push('/auth/signin');
      return;
    }

    if (session.user.role !== 'AGENCY_OWNER') {
      router.push('/');
      return;
    }

    const timeoutId = window.setTimeout(() => {
      void fetchTenants();
      void fetchInvitations();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [fetchInvitations, fetchTenants, router, session, status]);

  const createTenant = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = newTenantName.trim();
    if (!trimmedName) {
      return;
    }

    const res = await fetch('/api/tenants', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: trimmedName }),
    });

    if (res.ok) {
      setNewTenantName('');
      await fetchTenants();
    }
  };

  const createInvitation = async (e: React.FormEvent) => {
    e.preventDefault();
    setInviteMessage('');

    const res = await fetch('/api/invitations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: inviteEmail, role: inviteRole }),
    });

    const data = (await res.json()) as Invitation & { error?: string };

    if (!res.ok) {
      setInviteMessage(data.error ?? 'Failed to create invitation');
      return;
    }

    setInviteEmail('');
    setInviteRole('MANAGER');
    setInviteMessage('Invitation created successfully. Share the acceptance link below.');
    await fetchInvitations();
  };

  if (status === 'loading') return <div>Loading...</div>;

  return (
    <div className="space-y-8 p-6">
      <section>
        <h1 className="mb-6 text-3xl">Agency Dashboard</h1>
        <form onSubmit={createTenant} className="mb-6">
          <label className="mb-2 block text-sm font-medium">New Tenant Name</label>
          <input
            type="text"
            value={newTenantName}
            onChange={(e) => setNewTenantName(e.target.value)}
            className="mr-2 rounded border p-2"
            required
          />
          <button type="submit" className="rounded bg-green-500 p-2 text-white">
            Create Tenant
          </button>
        </form>
        <h2 className="mb-4 text-2xl">Your Tenants</h2>
        <ul>
          {tenants.map((tenant) => (
            <li key={tenant.id} className="mb-2 rounded border p-2">
              {tenant.name} - Created: {new Date(tenant.createdAt).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded border p-4">
        <h2 className="mb-4 text-2xl">Invite users</h2>
        <form className="grid gap-4 md:grid-cols-[1fr_180px_auto]" onSubmit={createInvitation}>
          <input
            type="email"
            placeholder="teammate@example.com"
            className="rounded border p-2"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            required
          />

          <select
            className="rounded border p-2"
            value={inviteRole}
            onChange={(e) => setInviteRole(e.target.value as Invitation['role'])}
          >
            {INVITABLE_ROLES.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>

          <button type="submit" className="rounded bg-black px-4 py-2 text-white">
            Send invite
          </button>
        </form>

        {inviteMessage ? <p className="mt-3 text-sm text-gray-700">{inviteMessage}</p> : null}

        <div className="mt-6 space-y-3">
          <h3 className="text-lg font-semibold">Invitation links</h3>
          {invitations.length === 0 ? (
            <p className="text-sm text-gray-600">No invitations yet.</p>
          ) : (
            invitations.map((invitation) => {
              const acceptUrl = `${inviteBaseUrl}/invite/${invitation.token}`;

              return (
                <div key={invitation.id} className="rounded border p-3 text-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span>
                      <strong>{invitation.email}</strong> · {invitation.role}
                    </span>
                    <span className="rounded bg-gray-100 px-2 py-1 uppercase tracking-wide text-xs">
                      {invitation.status}
                    </span>
                  </div>
                  <p className="mt-2 break-all text-gray-700">{acceptUrl}</p>
                  <p className="mt-1 text-xs text-gray-500">
                    Expires {new Date(invitation.expiresAt).toLocaleString()}
                  </p>
                </div>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
}
