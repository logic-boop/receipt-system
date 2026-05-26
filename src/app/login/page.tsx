'use client';

import { useActionState } from 'react';
import { loginAction } from '@/app/actions/auth';
import Link from 'next/link';

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
      <div className="w-full max-w-sm p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-md border border-zinc-200 dark:border-zinc-800">
        <h1 className="text-xl font-bold mb-1">Welcome back</h1>
        <p className="text-xs text-zinc-500 mb-4">Log in to manage your business receipts</p>
        
        <form action={formAction} className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1">Email Address</label>
            <input name="email" type="email" required className="w-full text-sm p-2 rounded border dark:bg-zinc-800 dark:border-zinc-700 text-white" />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1">Password</label>
            <input name="password" type="password" required className="w-full text-sm p-2 rounded border dark:bg-zinc-800 dark:border-zinc-700 text-white" />
          </div>
          {state?.error && <p className="text-xs font-medium text-red-500">{state.error}</p>}
          <button type="submit" disabled={isPending} className="w-full bg-blue-600 text-white font-medium py-2 rounded text-sm hover:bg-blue-700 transition">
            {isPending ? 'Logging in...' : 'Sign In'}
          </button>
        </form>
        <p className="text-xs text-center mt-4 text-zinc-500">Don't have an account? <Link href="/register" className="text-blue-500 hover:underline">Register</Link></p>
      </div>
    </div>
  );
}