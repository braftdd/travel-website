'use client';

import { useState } from 'react';
import { Plus, Minus, Share2 } from 'lucide-react';

interface Props {
  price: number;
  flightClass: string;
  from: string;
  to: string;
}

export default function FlightBookingCard({ price, flightClass, from, to }: Props) {
  const [passengers, setPassengers] = useState(1);
  const total = price * passengers;

  const LABEL = 'block text-[10px] font-bold text-[#1B2D4F]/40 uppercase tracking-[0.18em] mb-1.5';

  return (
    <div>
      <div className="bg-white rounded-2xl border border-[#1B2D4F]/8 shadow-[0_4px_32px_rgba(27,45,79,0.12)] p-6">

        {/* Price */}
        <div className="mb-5">
          <span className="text-[#1B2D4F] font-bold text-3xl">${price.toLocaleString()}</span>
          <span className="text-[#1B2D4F]/45 text-sm ml-1.5">/ person</span>
        </div>

        {/* Route summary */}
        <div className="bg-[#F5F5F0] rounded-xl px-4 py-3 mb-4 flex items-center justify-between">
          <div className="text-center">
            <p className="text-[#1B2D4F] font-bold text-lg leading-none">{from}</p>
            <p className="text-[#1B2D4F]/40 text-[10px] mt-1 uppercase tracking-wide">Origin</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-16 h-px bg-[#1B2D4F]/15" />
            <svg className="w-4 h-4 text-[#C9A96E] rotate-90" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
            </svg>
            <div className="w-16 h-px bg-[#1B2D4F]/15" />
          </div>
          <div className="text-center">
            <p className="text-[#1B2D4F] font-bold text-lg leading-none">{to}</p>
            <p className="text-[#1B2D4F]/40 text-[10px] mt-1 uppercase tracking-wide">Destination</p>
          </div>
        </div>

        {/* Class badge */}
        <div className="mb-4">
          <label className={LABEL}>Cabin Class</label>
          <div className="bg-[#F5F5F0] rounded-xl px-4 py-2.5">
            <span className="text-[#1B2D4F] font-semibold text-sm">{flightClass}</span>
          </div>
        </div>

        {/* Passenger counter */}
        <div className="bg-[#F5F5F0] rounded-xl px-4 py-3 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#1B2D4F] text-sm font-semibold">Passengers</p>
              <p className="text-[#1B2D4F]/40 text-xs">Adults</p>
            </div>
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setPassengers(Math.max(1, passengers - 1))}
                disabled={passengers <= 1}
                className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center
                           text-[#1B2D4F]/50 hover:border-[#C9A96E] hover:text-[#C9A96E]
                           disabled:opacity-25 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="text-[#1B2D4F] font-bold text-sm w-4 text-center">{passengers}</span>
              <button
                onClick={() => setPassengers(Math.min(9, passengers + 1))}
                disabled={passengers >= 9}
                className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center
                           text-[#1B2D4F]/50 hover:border-[#C9A96E] hover:text-[#C9A96E]
                           disabled:opacity-25 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Total */}
        <div className="flex items-center justify-between mb-4 bg-[#C9A96E]/8 rounded-xl px-4 py-3">
          <span className="text-[#1B2D4F]/70 text-sm font-medium">
            Total ({passengers} passenger{passengers !== 1 ? 's' : ''})
          </span>
          <span className="text-[#1B2D4F] font-bold text-base">${total.toLocaleString()}</span>
        </div>

        {/* Book button */}
        <button className="w-full bg-[#C9A96E] hover:bg-[#b8944f] text-[#1B2D4F] font-bold
                           py-3.5 rounded-xl transition-colors duration-200 cursor-pointer text-sm tracking-wide">
          Select Flight — ${total.toLocaleString()}
        </button>

        <p className="text-center text-[#1B2D4F]/35 text-xs mt-3">
          Price includes all taxes &amp; fees
        </p>
      </div>

      {/* Share */}
      <div className="mt-4">
        <button className="w-full flex items-center justify-center gap-2 border border-gray-200
                           rounded-xl py-3 text-[#1B2D4F]/60 text-sm font-semibold
                           hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors duration-200 cursor-pointer">
          <Share2 className="w-4 h-4" />
          Share this flight
        </button>
      </div>
    </div>
  );
}
