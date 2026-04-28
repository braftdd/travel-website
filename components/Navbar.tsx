'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createBrowserClient } from '@supabase/ssr';
import type { User } from '@supabase/supabase-js';

const navLinks = ['Destinations', 'Stays', 'Flights', 'Packages', 'Deals'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const truncatedEmail = user?.email
    ? user.email.length > 22 ? user.email.slice(0, 20) + '…' : user.email
    : '';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 transition-shadow duration-300 ${
        scrolled ? 'shadow-md' : 'shadow-none'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-18 py-4">
        {/* Wordmark */}
        <Link
          href="/"
          className="text-[#1B2D4F] text-xl font-bold tracking-[0.3em] uppercase"
        >
          ORBIS
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link}
              href="#"
              className="text-[#1B2D4F] text-sm font-medium hover:text-[#C9A96E] transition-colors duration-200"
            >
              {link}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-6">
          {user ? (
            <>
              <span className="text-[#1B2D4F] text-sm font-medium truncate max-w-[160px]" title={user.email}>
                {truncatedEmail}
              </span>
              <Link
                href="/dashboard"
                className="text-[#1B2D4F] text-sm font-medium hover:text-[#C9A96E] transition-colors duration-200"
              >
                Dashboard
              </Link>
              <form action="/auth/signout" method="post">
                <button
                  type="submit"
                  className="bg-[#C9A96E] text-[#1B2D4F] text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#b8944f] transition-colors duration-200"
                >
                  Sign Out
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="text-[#1B2D4F] text-sm font-medium hover:text-[#C9A96E] transition-colors duration-200"
              >
                Sign In
              </Link>
              <Link
                href="#"
                className="bg-[#C9A96E] text-[#1B2D4F] text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#b8944f] transition-colors duration-200"
              >
                Book Now
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-[#1B2D4F] transition-all duration-300 ${
              menuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-[#1B2D4F] transition-all duration-300 ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-[#1B2D4F] transition-all duration-300 ${
              menuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link}
              href="#"
              className="block text-[#1B2D4F] text-sm font-medium py-2 hover:text-[#C9A96E] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link}
            </Link>
          ))}
          <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
            {user ? (
              <>
                <span className="text-[#1B2D4F] text-sm font-medium" title={user.email}>
                  {truncatedEmail}
                </span>
                <Link
                  href="/dashboard"
                  className="text-[#1B2D4F] text-sm font-medium"
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <form action="/auth/signout" method="post">
                  <button
                    type="submit"
                    className="w-full bg-[#C9A96E] text-[#1B2D4F] text-sm font-semibold px-5 py-2.5 rounded-full text-center"
                  >
                    Sign Out
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="text-[#1B2D4F] text-sm font-medium"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="#"
                  className="bg-[#C9A96E] text-[#1B2D4F] text-sm font-semibold px-5 py-2.5 rounded-full text-center"
                >
                  Book Now
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
