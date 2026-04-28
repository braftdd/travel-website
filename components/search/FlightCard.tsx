import Link from 'next/link';
import { Plane } from 'lucide-react';
import { type Flight } from '@/lib/searchData';
import { flightSlug } from '@/lib/utils';
import HeartButton from './HeartButton';

const classBadge: Record<string, string> = {
  Economy: 'bg-gray-100 text-gray-600',
  Business: 'bg-[#1B2D4F]/8 text-[#1B2D4F]',
  First:    'bg-[#C9A96E]/12 text-[#b8944f]',
};

export default function FlightCard({ flight }: { flight: Flight }) {
  return (
    <div className="group relative bg-white rounded-2xl border border-[#1B2D4F]/6
                    shadow-[0_2px_16px_rgba(0,0,0,0.06)]
                    hover:shadow-[0_8px_32px_rgba(27,45,79,0.13)]
                    transition-all duration-300 p-5 flex flex-col gap-4">

      <HeartButton type="flight" referenceId={flightSlug(flight.airline, flight.fromCode, flight.toCode, flight.flightClass)} />

      {/* Airline + class */}
      <div className="flex items-center justify-between pr-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#F5F5F0] flex items-center justify-center">
            <Plane className="w-4 h-4 text-[#1B2D4F]" strokeWidth={1.5} />
          </div>
          <span className="text-[#1B2D4F] font-semibold text-sm">{flight.airline}</span>
        </div>
        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${classBadge[flight.flightClass]}`}>
          {flight.flightClass}
        </span>
      </div>

      {/* Route */}
      <div className="flex items-center gap-3">
        <div className="text-center">
          <p className="text-[#1B2D4F] font-bold text-xl leading-none">{flight.fromCode}</p>
          <p className="text-[#1B2D4F]/40 text-xs mt-1">{flight.from}</p>
        </div>

        <div className="flex-1 flex flex-col items-center gap-1">
          <p className="text-[#1B2D4F]/40 text-xs">{flight.duration}</p>
          <div className="w-full flex items-center gap-1">
            <div className="flex-1 h-px bg-gray-200" />
            <Plane className="w-3.5 h-3.5 text-[#C9A96E] rotate-90" fill="currentColor" strokeWidth={0} />
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          <p className="text-[#1B2D4F]/30 text-[10px]">Direct</p>
        </div>

        <div className="text-center">
          <p className="text-[#1B2D4F] font-bold text-xl leading-none">{flight.toCode}</p>
          <p className="text-[#1B2D4F]/40 text-xs mt-1">{flight.to}</p>
        </div>
      </div>

      {/* Price + CTA */}
      <div className="flex items-center justify-between border-t border-[#1B2D4F]/6 pt-4">
        <div>
          <span className="text-[#1B2D4F] font-bold text-base">
            ${flight.price.toLocaleString()}
          </span>
          <span className="text-[#1B2D4F]/40 text-xs"> /person</span>
        </div>
        <Link
          href={`/flights/${flightSlug(flight.airline, flight.fromCode, flight.toCode, flight.flightClass)}`}
          className="bg-[#1B2D4F] hover:bg-[#C9A96E] text-white text-xs font-bold
                     px-4 py-2 rounded-xl transition-colors duration-200 cursor-pointer"
        >
          Select Flight
        </Link>
      </div>
    </div>
  );
}
