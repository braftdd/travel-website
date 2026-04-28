'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

function shortRef(uuid: string) {
  return `ORB-${uuid.replace(/-/g, '').slice(0, 8).toUpperCase()}`;
}

function ConfirmedContent() {
  const searchParams = useSearchParams();
  const ref = searchParams.get('ref') ?? crypto.randomUUID();

  return (
    <div className="w-full max-w-md text-center">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10">

        {/* Checkmark */}
        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>

        <h1 className="text-[#1B2D4F] text-2xl font-bold mb-2">Booking Confirmed!</h1>
        <p className="text-[#1B2D4F]/55 text-sm mb-7">
          Thank you for booking with Orbis. Your luxury journey is secured.
        </p>

        {/* Reference */}
        <div className="bg-[#F9F7F4] rounded-xl px-5 py-4 mb-8">
          <p className="text-[#1B2D4F]/40 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">
            Booking Reference
          </p>
          <p className="text-[#1B2D4F] font-bold text-xl tracking-widest">{shortRef(ref)}</p>
        </div>

        <div className="space-y-3">
          <Link
            href="/dashboard"
            className="block w-full bg-[#C9A96E] hover:bg-[#b8944f] text-[#1B2D4F] font-bold
                       text-sm py-3.5 rounded-full transition-colors duration-200"
          >
            View My Bookings
          </Link>
          <Link
            href="/"
            className="block w-full text-[#1B2D4F]/55 text-sm font-medium py-2 hover:text-[#C9A96E] transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function BookingConfirmedPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F9F7F4] flex items-center justify-center px-4 pt-24 pb-16">
        <Suspense fallback={
          <div className="w-8 h-8 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin" />
        }>
          <ConfirmedContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
