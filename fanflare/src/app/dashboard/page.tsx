'use client';

import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Tenant {
  id: string;
  name: string;
  createdAt: string;
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

async function getLocalDb(): Promise<LocalDb> {
  const pouchModule = await import('pouchdb');
  const PouchDB = pouchModule.default;

  return new PouchDB('tenants') as LocalDb;
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [newTenantName, setNewTenantName] = useState('');

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
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [fetchTenants, router, session, status]);

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

  if (status === 'loading') return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-6">Agency Dashboard</h1>
      <form onSubmit={createTenant} className="mb-6">
        <label className="block text-sm font-medium mb-2">New Tenant Name</label>
        <input
          type="text"
          value={newTenantName}
          onChange={(e) => setNewTenantName(e.target.value)}
          className="p-2 border rounded mr-2"
          required
        />
        <button type="submit" className="p-2 bg-green-500 text-white rounded">
          Create Tenant
        </button>
      </form>
      <h2 className="text-2xl mb-4">Your Tenants</h2>
      <ul>
        {tenants.map((tenant) => (
          <li key={tenant.id} className="p-2 border rounded mb-2">
            {tenant.name} - Created: {new Date(tenant.createdAt).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
