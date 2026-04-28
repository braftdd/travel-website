'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createBrowserClient } from '@supabase/ssr';
import { Trash2, ExternalLink, Calendar, Tag } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { stays, flights, packages } from '@/lib/searchData';
import { toSlug, flightSlug } from '@/lib/utils';

// ── Helpers ────────────────────────────────────────────────────────────────────

function getItemLabel(type: string, referenceId: string) {
  if (type === 'stay') {
    return stays.find(s => toSlug(s.name) === referenceId)?.name ?? referenceId;
  }
  if (type === 'flight') {
    const f = flights.find(f => flightSlug(f.airline, f.fromCode, f.toCode, f.flightClass) === referenceId);
    return f ? `${f.from} → ${f.to} (${f.airline}, ${f.flightClass})` : referenceId;
  }
  return packages.find(p => toSlug(p.name) === referenceId)?.name ?? referenceId;
}

function getItemHref(type: string, referenceId: string) {
  if (type === 'stay')    return `/stays/${referenceId}`;
  if (type === 'flight')  return `/flights/${referenceId}`;
  return `/packages/${referenceId}`;
}

function fmtDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

const STATUS_STYLE: Record<string, string> = {
  confirmed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  pending:   'bg-amber-50  text-amber-700  border-amber-200',
  cancelled: 'bg-red-50    text-red-600    border-red-200',
};

const TYPE_STYLE: Record<string, string> = {
  stay:    'bg-[#1B2D4F]/6 text-[#1B2D4F]',
  flight:  'bg-[#C9A96E]/12 text-[#b8944f]',
  package: 'bg-emerald-50 text-emerald-700',
};

// ── Page ───────────────────────────────────────────────────────────────────────

interface Booking {
  id: string;
  type: string;
  reference_id: string;
  status: string;
  total_price: number;
  created_at: string;
}

interface SavedItem {
  id: string;
  type: string;
  reference_id: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [loading,    setLoading]    = useState(true);
  const [tab,        setTab]        = useState<'bookings' | 'wishlist'>('bookings');
  const [email,      setEmail]      = useState('');
  const [bookings,   setBookings]   = useState<Booking[]>([]);
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const [dbError,    setDbError]    = useState<string | null>(null);

  useEffect(() => {
    async function init() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { router.push('/auth/login'); return; }

      setEmail(session.user.email ?? '');

      const [
        { data: bData, error: bErr },
        { data: sData, error: sErr },
      ] = await Promise.all([
        supabase
          .from('bookings')
          .select('id, type, reference_id, status, total_price, created_at')
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false }),
        supabase
          .from('saved_items')
          .select('id, type, reference_id')
          .eq('user_id', session.user.id),
      ]);

      if (bErr || sErr) {
        const err = bErr ?? sErr;
        console.error('Dashboard query error:', err);
        const isRls = err?.code === '42501' || err?.message?.includes('row-level security');
        const isFk  = err?.code === '23503';
        setDbError(
          isRls
            ? 'RLS policy missing — go to Supabase Dashboard → Table Editor → bookings/saved_items → Enable RLS and add a SELECT policy for authenticated users.'
            : isFk
            ? 'Foreign key mismatch — bookings.user_id must reference auth.users, not the custom users table.'
            : `Query failed: ${err?.message}`
        );
      }

      setBookings((bData ?? []) as Booking[]);
      setSavedItems((sData ?? []) as SavedItem[]);
      setLoading(false);
    }
    init();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function removeSaved(id: string) {
    await supabase.from('saved_items').delete().eq('id', id);
    setSavedItems(prev => prev.filter(i => i.id !== id));
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#F9F7F4] flex items-center justify-center pt-24">
          <div className="w-8 h-8 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin" />
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F9F7F4] pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <div className="mb-8">
            <p className="text-[#C9A96E] text-xs font-bold uppercase tracking-[0.2em] mb-1">My Account</p>
            <h1 className="text-[#1B2D4F] text-2xl font-bold">Dashboard</h1>
            <p className="text-[#1B2D4F]/45 text-sm mt-1">{email}</p>
          </div>

          {/* DB error banner */}
          {dbError && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-xl px-5 py-4 text-sm text-red-700">
              <p className="font-semibold mb-1">Supabase configuration needed</p>
              <p className="text-red-600 leading-relaxed">{dbError}</p>
            </div>
          )}

          {/* Tabs */}
          <div className="flex gap-1 bg-white border border-gray-100 rounded-xl p-1 mb-6 w-fit shadow-sm">
            {(['bookings', 'wishlist'] as const).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  tab === t
                    ? 'bg-[#1B2D4F] text-white shadow-sm'
                    : 'text-[#1B2D4F]/55 hover:text-[#1B2D4F]'
                }`}
              >
                {t === 'bookings' ? 'My Bookings' : 'My Wishlist'}
                <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
                  tab === t ? 'bg-white/20' : 'bg-[#1B2D4F]/8'
                }`}>
                  {t === 'bookings' ? bookings.length : savedItems.length}
                </span>
              </button>
            ))}
          </div>

          {/* ── BOOKINGS TAB ─────────────────────────────────────────────────── */}
          {tab === 'bookings' && (
            <div className="space-y-4">
              {bookings.length === 0 ? (
                <EmptyState
                  message="No bookings yet"
                  sub="Start exploring and book your first luxury trip."
                  cta="Browse destinations"
                  href="/search"
                />
              ) : (
                bookings.map(b => (
                  <div key={b.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${TYPE_STYLE[b.type] ?? ''}`}>
                            {b.type.charAt(0).toUpperCase() + b.type.slice(1)}
                          </span>
                          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${STATUS_STYLE[b.status] ?? ''}`}>
                            {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                          </span>
                        </div>
                        <p className="text-[#1B2D4F] font-bold text-base leading-tight mb-1 truncate">
                          {getItemLabel(b.type, b.reference_id)}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-[#1B2D4F]/45 mt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {fmtDate(b.created_at)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Tag className="w-3 h-3" />
                            {b.id.slice(0, 8).toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 flex-shrink-0">
                        <span className="text-[#1B2D4F] font-bold text-lg">${Number(b.total_price).toLocaleString()}</span>
                        <Link
                          href={getItemHref(b.type, b.reference_id)}
                          className="flex items-center gap-1.5 text-xs font-semibold text-[#C9A96E] hover:underline"
                        >
                          View <ExternalLink className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* ── WISHLIST TAB ─────────────────────────────────────────────────── */}
          {tab === 'wishlist' && (
            <div className="space-y-4">
              {savedItems.length === 0 ? (
                <EmptyState
                  message="Your wishlist is empty"
                  sub="Save hotels, flights and packages with the heart icon."
                  cta="Browse destinations"
                  href="/search"
                />
              ) : (
                savedItems.map(item => (
                  <div key={item.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full inline-block mb-2 ${TYPE_STYLE[item.type] ?? ''}`}>
                          {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                        </span>
                        <p className="text-[#1B2D4F] font-bold text-base leading-tight truncate">
                          {getItemLabel(item.type, item.reference_id)}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <Link
                          href={getItemHref(item.type, item.reference_id)}
                          className="text-xs font-semibold text-[#C9A96E] border border-[#C9A96E] px-3 py-1.5 rounded-lg
                                     hover:bg-[#C9A96E] hover:text-[#1B2D4F] transition-colors duration-200"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => removeSaved(item.id)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200
                                     text-[#1B2D4F]/40 hover:border-red-300 hover:text-red-500 transition-colors duration-200"
                          aria-label="Remove from wishlist"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

function EmptyState({ message, sub, cta, href }: { message: string; sub: string; cta: string; href: string }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
      <div className="w-16 h-16 bg-[#F5F5F0] rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-[#1B2D4F]/20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <p className="text-[#1B2D4F] font-bold text-base mb-1">{message}</p>
      <p className="text-[#1B2D4F]/45 text-sm mb-5">{sub}</p>
      <Link href={href} className="inline-block bg-[#C9A96E] hover:bg-[#b8944f] text-[#1B2D4F] font-bold
                                    text-sm px-6 py-2.5 rounded-full transition-colors duration-200">
        {cta}
      </Link>
    </div>
  );
}
