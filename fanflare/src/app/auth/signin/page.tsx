'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn('credentials', { email, password, callbackUrl: '/' });
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="glass-card w-full max-w-md p-6 text-white shadow-xl">
        <div className="glass-content">
          <h1 className="mb-4 text-2xl font-semibold text-white">Sign In</h1>
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-slate-100">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="glass-input"
              required
            />
          </div>
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-slate-100">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="glass-input"
              required
            />
          </div>
          <button type="submit" className="glass-button w-full">
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}
