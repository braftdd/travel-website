'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { createBrowserClient } from '@supabase/ssr';
import { MapPin, Calendar, Users, Lock, Plane, Building2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { stays, flights, packages } from '@/lib/searchData';
import { toSlug, flightSlug } from '@/lib/utils';

type BookingType = 'stay' | 'flight' | 'package';

function fmtDate(d: string) {
  if (!d) return '';
  const [y, m, day] = d.split('-');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${months[parseInt(m) - 1]} ${parseInt(day)}, ${y}`;
}

function formatCardNumber(v: string) {
  return v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
}

function formatExpiry(v: string) {
  const c = v.replace(/\D/g, '').slice(0, 4);
  return c.length >= 2 ? `${c.slice(0, 2)}/${c.slice(2)}` : c;
}

const INPUT = 'w-full px-4 py-3 rounded-xl border border-gray-200 text-[#1B2D4F] text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:border-transparent transition';
const LABEL = 'block text-sm font-medium text-[#1B2D4F] mb-1.5';

export default function CheckoutPage({ params }: { params: { type: string; id: string } }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const urlType = params.type;
  const id      = params.id;
  const dbType  = urlType === 'stays' ? 'stay' : urlType === 'flights' ? 'flight' : 'package' as BookingType;

  const checkin   = searchParams.get('checkin')   ?? '';
  const checkout  = searchParams.get('checkout')  ?? '';
  const adults    = parseInt(searchParams.get('adults')   ?? '2');
  const children  = parseInt(searchParams.get('children') ?? '0');

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [userId, setUserId]   = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]     = useState('');

  const [cardName,   setCardName]   = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry,     setExpiry]     = useState('');
  const [cvv,        setCvv]        = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push('/auth/login');
      } else {
        setUserId(session.user.id);
        setLoading(false);
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Look up item from local data ──────────────────────────────────────────
  const stayItem    = urlType === 'stays'    ? stays.find(s => toSlug(s.name) === id) : null;
  const flightItem  = urlType === 'flights'  ? flights.find(f => flightSlug(f.airline, f.fromCode, f.toCode, f.flightClass) === id) : null;
  const packageItem = urlType === 'packages' ? packages.find(p => toSlug(p.name) === id) : null;
  const item = stayItem ?? flightItem ?? packageItem;

  // ── Price calculation ──────────────────────────────────────────────────────
  let nights = 0;
  let total  = 0;
  let priceBreakdown = '';

  if (stayItem) {
    nights = checkin && checkout
      ? Math.max(1, Math.round((new Date(checkout).getTime() - new Date(checkin).getTime()) / 86400000))
      : 1;
    total = stayItem.price * nights;
    priceBreakdown = `$${stayItem.price.toLocaleString()} × ${nights} night${nights !== 1 ? 's' : ''}`;
  } else if (flightItem) {
    total = flightItem.price * adults;
    priceBreakdown = `$${flightItem.price.toLocaleString()} × ${adults} passenger${adults !== 1 ? 's' : ''}`;
  } else if (packageItem) {
    total = packageItem.price;
    priceBreakdown = `${packageItem.nights}-night package`;
  }

  // ── Submit ─────────────────────────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!userId || !item) return;
    setSubmitting(true);
    setError('');

    const { data, error: dbError } = await supabase
      .from('bookings')
      .insert({ user_id: userId, type: dbType, reference_id: id, status: 'confirmed', total_price: total })
      .select('id')
      .single();

    if (dbError) {
      console.error('Booking insert error:', dbError);
      setError(
        dbError.code === '23503'
          ? 'Database setup required: the bookings table must reference auth.users instead of the custom users table. Run: ALTER TABLE bookings DROP CONSTRAINT IF EXISTS bookings_user_id_fkey; and add an RLS policy.'
          : dbError.code === '42501' || dbError.message?.includes('row-level security')
          ? 'Permission denied: enable RLS policy for bookings table in Supabase dashboard (Settings → Authentication → Policies).'
          : `Could not save booking: ${dbError.message}`
      );
      setSubmitting(false);
      return;
    }

    router.push(`/booking-confirmed?ref=${data.id}`);
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

  if (!item) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#F9F7F4] flex items-center justify-center pt-24">
          <div className="text-center">
            <p className="text-[#1B2D4F] font-semibold text-lg mb-4">Item not found.</p>
            <Link href="/search" className="text-[#C9A96E] font-medium hover:underline">Back to search</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const itemImage = stayItem?.image ?? packageItem?.image ?? null;
  const itemName  = stayItem?.name ?? (flightItem ? `${flightItem.from} → ${flightItem.to}` : packageItem?.name ?? '');
  const itemSub   = stayItem?.location ?? (flightItem ? `${flightItem.airline} · ${flightItem.flightClass}` : packageItem?.route ?? '');

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F9F7F4] pt-24 pb-16 px-4">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="mb-8">
            <Link href={urlType === 'stays' ? `/stays/${id}` : urlType === 'flights' ? `/flights/${id}` : `/packages/${id}`}
              className="text-[#C9A96E] text-sm font-medium hover:underline">
              ← Back
            </Link>
            <h1 className="text-[#1B2D4F] text-2xl font-bold mt-3">Complete your booking</h1>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start">

            {/* ── LEFT: Booking summary ────────────────────────────────────── */}
            <div className="flex-1 min-w-0 space-y-5">

              {/* Item card */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {itemImage && (
                  <div className="relative h-52 w-full">
                    <Image src={itemImage} alt={itemName} fill sizes="(max-width:1024px) 100vw, 60vw" className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <span className="absolute bottom-4 left-4 text-white font-bold text-lg drop-shadow">{itemName}</span>
                  </div>
                )}
                <div className="p-6">
                  {!itemImage && (
                    <h2 className="text-[#1B2D4F] font-bold text-xl mb-1">{itemName}</h2>
                  )}
                  {itemSub && (
                    <div className="flex items-center gap-1.5 text-[#1B2D4F]/50 text-sm mb-5">
                      <MapPin className="w-3.5 h-3.5 text-[#C9A96E] flex-shrink-0" />
                      {itemSub}
                    </div>
                  )}
                  {flightItem && !itemSub && null}

                  <div className="space-y-3">
                    {/* Dates row */}
                    {(checkin || checkout) && (
                      <div className="flex items-center gap-3 text-sm">
                        <Calendar className="w-4 h-4 text-[#C9A96E] flex-shrink-0" />
                        <span className="text-[#1B2D4F]/60 w-20 flex-shrink-0">Dates</span>
                        <span className="text-[#1B2D4F] font-medium">
                          {fmtDate(checkin)}{checkout ? ` – ${fmtDate(checkout)}` : ''}
                        </span>
                      </div>
                    )}
                    {/* Guests row */}
                    {(adults > 0 || children > 0) && (
                      <div className="flex items-center gap-3 text-sm">
                        <Users className="w-4 h-4 text-[#C9A96E] flex-shrink-0" />
                        <span className="text-[#1B2D4F]/60 w-20 flex-shrink-0">Guests</span>
                        <span className="text-[#1B2D4F] font-medium">
                          {adults} Adult{adults !== 1 ? 's' : ''}
                          {children > 0 ? `, ${children} Child${children !== 1 ? 'ren' : ''}` : ''}
                        </span>
                      </div>
                    )}
                    {/* Flight specifics */}
                    {flightItem && (
                      <div className="flex items-center gap-3 text-sm">
                        <Plane className="w-4 h-4 text-[#C9A96E] flex-shrink-0" />
                        <span className="text-[#1B2D4F]/60 w-20 flex-shrink-0">Route</span>
                        <span className="text-[#1B2D4F] font-medium">
                          {flightItem.fromCode} → {flightItem.toCode} · {flightItem.duration}
                        </span>
                      </div>
                    )}
                    {/* Package nights */}
                    {packageItem && (
                      <div className="flex items-center gap-3 text-sm">
                        <Building2 className="w-4 h-4 text-[#C9A96E] flex-shrink-0" />
                        <span className="text-[#1B2D4F]/60 w-20 flex-shrink-0">Hotel</span>
                        <span className="text-[#1B2D4F] font-medium">{packageItem.hotel} · {packageItem.nights} nights</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Price breakdown */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-[#1B2D4F] font-bold text-base mb-4">Price breakdown</h3>
                <div className="space-y-2.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#1B2D4F]/60">{priceBreakdown}</span>
                    <span className="text-[#1B2D4F] font-medium">${total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#1B2D4F]/60">Taxes & fees</span>
                    <span className="text-[#1B2D4F] font-medium">Included</span>
                  </div>
                  <div className="pt-3 border-t border-gray-100 flex justify-between">
                    <span className="text-[#1B2D4F] font-bold">Total</span>
                    <span className="text-[#1B2D4F] font-bold text-lg">${total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── RIGHT: Payment form ──────────────────────────────────────── */}
            <div className="lg:w-[380px] flex-shrink-0">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:sticky lg:top-24">
                <div className="flex items-center gap-2 mb-6">
                  <Lock className="w-4 h-4 text-[#C9A96E]" />
                  <h3 className="text-[#1B2D4F] font-bold text-base">Payment details</h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className={LABEL}>Cardholder name</label>
                    <input
                      type="text"
                      value={cardName}
                      onChange={e => setCardName(e.target.value)}
                      required
                      placeholder="Jane Smith"
                      className={INPUT}
                    />
                  </div>

                  <div>
                    <label className={LABEL}>Card number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={e => setCardNumber(formatCardNumber(e.target.value))}
                      required
                      inputMode="numeric"
                      placeholder="XXXX XXXX XXXX XXXX"
                      maxLength={19}
                      className={INPUT}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={LABEL}>Expiry</label>
                      <input
                        type="text"
                        value={expiry}
                        onChange={e => setExpiry(formatExpiry(e.target.value))}
                        required
                        inputMode="numeric"
                        placeholder="MM/YY"
                        maxLength={5}
                        className={INPUT}
                      />
                    </div>
                    <div>
                      <label className={LABEL}>CVV</label>
                      <input
                        type="text"
                        value={cvv}
                        onChange={e => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                        required
                        inputMode="numeric"
                        placeholder="•••"
                        maxLength={4}
                        className={INPUT}
                      />
                    </div>
                  </div>

                  {error && (
                    <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[#C9A96E] hover:bg-[#b8944f] disabled:opacity-60 text-[#1B2D4F]
                               font-bold text-sm py-3.5 rounded-full transition-colors duration-200 mt-2"
                  >
                    {submitting ? 'Processing…' : `Complete Booking — $${total.toLocaleString()}`}
                  </button>

                  <p className="text-center text-xs text-[#1B2D4F]/35 flex items-center justify-center gap-1.5">
                    <Lock className="w-3 h-3" />
                    Payments are demo only — no charges will be made
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
