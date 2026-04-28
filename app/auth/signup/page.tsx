'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createBrowserClient } from '@supabase/ssr';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push('/?welcome=1');
      router.refresh();
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F9F7F4] flex items-center justify-center px-4 pt-24 pb-16">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
            <div className="mb-8 text-center">
              <Link href="/" className="text-[#1B2D4F] text-xl font-bold tracking-[0.3em] uppercase">
                ORBIS
              </Link>
              <h1 className="mt-4 text-2xl font-semibold text-[#1B2D4F]">Create your account</h1>
              <p className="mt-1 text-sm text-gray-500">Start your journey beyond the ordinary</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#1B2D4F] mb-1.5">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[#1B2D4F] text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:border-transparent transition"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-[#1B2D4F] mb-1.5">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[#1B2D4F] text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:border-transparent transition"
                  placeholder="Min. 6 characters"
                />
              </div>

              <div>
                <label htmlFor="confirm" className="block text-sm font-medium text-[#1B2D4F] mb-1.5">
                  Confirm password
                </label>
                <input
                  id="confirm"
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                  autoComplete="new-password"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[#1B2D4F] text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:border-transparent transition"
                  placeholder="Repeat your password"
                />
              </div>

              {error && (
                <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#C9A96E] hover:bg-[#b8944f] disabled:opacity-60 text-[#1B2D4F] font-semibold text-sm py-3.5 rounded-full transition-colors duration-200"
              >
                {loading ? 'Creating account…' : 'Create Account'}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-500">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-[#C9A96E] font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
