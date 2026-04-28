'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Minus, Heart, Share2 } from 'lucide-react';

interface Props {
  price: number;
  id: string;
}

const todayStr = () => new Date().toISOString().split('T')[0];

export default function HotelBookingCard({ price, id }: Props) {
  const router = useRouter();
  const [checkIn,   setCheckIn]   = useState(todayStr);
  const [checkOut,  setCheckOut]  = useState('');
  const [adults,    setAdults]    = useState(2);
  const [children,  setChildren]  = useState(0);
  const [saved,     setSaved]     = useState(false);

  const nights = checkIn && checkOut
    ? Math.max(0, Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000))
    : 0;
  const total = nights > 0 ? nights * price : null;

  const LABEL = 'block text-[10px] font-bold text-[#1B2D4F]/40 uppercase tracking-[0.18em] mb-1.5';

  return (
    <div>
      {/* Main card */}
      <div className="bg-white rounded-2xl border border-[#1B2D4F]/8 shadow-[0_4px_32px_rgba(27,45,79,0.12)] p-6">
        {/* Price */}
        <div className="mb-5">
          <span className="text-[#1B2D4F] font-bold text-3xl">${price.toLocaleString()}</span>
          <span className="text-[#1B2D4F]/45 text-sm ml-1.5">/ night</span>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className={LABEL}>Check-in</label>
            <input
              type="date"
              value={checkIn}
              onChange={e => setCheckIn(e.target.value)}
              className="w-full bg-[#F5F5F0] rounded-xl px-3 py-2.5 text-[#1B2D4F] text-sm
                         focus:outline-none focus:ring-2 focus:ring-[#C9A96E]/50"
            />
          </div>
          <div>
            <label className={LABEL}>Check-out</label>
            <input
              type="date"
              value={checkOut}
              min={checkIn}
              onChange={e => setCheckOut(e.target.value)}
              className="w-full bg-[#F5F5F0] rounded-xl px-3 py-2.5 text-[#1B2D4F] text-sm
                         focus:outline-none focus:ring-2 focus:ring-[#C9A96E]/50"
            />
          </div>
        </div>

        {/* Guests */}
        <div className="bg-[#F5F5F0] rounded-xl px-4 py-3 mb-4 space-y-3">
          {([
            { label: 'Adults', sub: 'Ages 13+', val: adults, set: setAdults, min: 1 },
            { label: 'Children', sub: 'Ages 2–12', val: children, set: setChildren, min: 0 },
          ] as const).map(({ label, sub, val, set, min }) => (
            <div key={label} className="flex items-center justify-between">
              <div>
                <p className="text-[#1B2D4F] text-sm font-semibold">{label}</p>
                <p className="text-[#1B2D4F]/40 text-xs">{sub}</p>
              </div>
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => set(Math.max(min, val - 1))}
                  disabled={val <= min}
                  className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center
                             text-[#1B2D4F]/50 hover:border-[#C9A96E] hover:text-[#C9A96E]
                             disabled:opacity-25 disabled:cursor-not-allowed transition-all cursor-pointer"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="text-[#1B2D4F] font-bold text-sm w-4 text-center">{val}</span>
                <button
                  onClick={() => set(val + 1)}
                  className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center
                             text-[#1B2D4F]/50 hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        {total !== null && (
          <div className="flex items-center justify-between mb-4 bg-[#C9A96E]/8 rounded-xl px-4 py-3">
            <span className="text-[#1B2D4F]/70 text-sm font-medium">
              Total ({nights} night{nights !== 1 ? 's' : ''})
            </span>
            <span className="text-[#1B2D4F] font-bold text-base">
              ${total.toLocaleString()}
            </span>
          </div>
        )}

        {/* Book button */}
        <button
          onClick={() => {
            const p = new URLSearchParams();
            if (checkIn)  p.set('checkin', checkIn);
            if (checkOut) p.set('checkout', checkOut);
            p.set('adults', adults.toString());
            if (children > 0) p.set('children', children.toString());
            router.push(`/checkout/stays/${id}?${p.toString()}`);
          }}
          className="w-full bg-[#C9A96E] hover:bg-[#b8944f] text-[#1B2D4F] font-bold
                     py-3.5 rounded-xl transition-colors duration-200 cursor-pointer text-sm tracking-wide"
        >
          {total ? `Book Now — $${total.toLocaleString()}` : 'Book Now'}
        </button>

        <p className="text-center text-[#1B2D4F]/35 text-xs mt-3">
          Free cancellation until 48h before check-in
        </p>
      </div>

      {/* Share / Save */}
      <div className="flex gap-3 mt-4">
        <button className="flex-1 flex items-center justify-center gap-2 border border-gray-200
                           rounded-xl py-3 text-[#1B2D4F]/60 text-sm font-semibold
                           hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors duration-200 cursor-pointer">
          <Share2 className="w-4 h-4" />
          Share
        </button>
        <button
          onClick={() => setSaved(!saved)}
          className={`flex-1 flex items-center justify-center gap-2 border rounded-xl py-3
                      text-sm font-semibold transition-colors duration-200 cursor-pointer ${
            saved
              ? 'border-[#C9A96E] text-[#C9A96E] bg-[#C9A96E]/8'
              : 'border-gray-200 text-[#1B2D4F]/60 hover:border-[#C9A96E] hover:text-[#C9A96E]'
          }`}
        >
          <Heart className={`w-4 h-4 ${saved ? 'fill-[#C9A96E]' : ''}`} />
          {saved ? 'Saved' : 'Save'}
        </button>
      </div>
    </div>
  );
}
