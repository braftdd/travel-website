'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Plus, Minus } from 'lucide-react';

const DESTINATIONS = [
  { city: 'Phuket', country: 'Thailand' },
  { city: 'Koh Samui', country: 'Thailand' },
  { city: 'Chiang Mai', country: 'Thailand' },
  { city: 'Bangkok', country: 'Thailand' },
  { city: 'Dubai', country: 'UAE' },
  { city: 'Abu Dhabi', country: 'UAE' },
  { city: 'Miami', country: 'USA' },
  { city: 'New York', country: 'USA' },
  { city: 'Los Angeles', country: 'USA' },
  { city: 'Hawaii', country: 'USA' },
  { city: 'Santorini', country: 'Greece' },
  { city: 'Mallorca', country: 'Spain' },
  { city: 'Amalfi Coast', country: 'Italy' },
  { city: 'Paris', country: 'France' },
  { city: 'Maldives', country: 'Maldives' },
  { city: 'Swiss Alps', country: 'Switzerland' },
  { city: 'Barcelona', country: 'Spain' },
  { city: 'London', country: 'United Kingdom' },
  { city: 'Mykonos', country: 'Greece' },
  { city: "Côte d'Azur", country: 'France' },
];

const LABEL = 'block text-[10px] font-bold text-[#1B2D4F]/40 uppercase tracking-[0.18em] mb-1';
const PANEL = 'absolute z-50 top-full mt-2 bg-white border border-gray-150 rounded-xl shadow-xl overflow-hidden';

interface Props {
  initialDestination?: string;
  initialCheckin?: string;
  initialCheckout?: string;
  initialAdults?: number;   // undefined = not set by user; counter defaults to 2
  initialChildren?: number;
}

export default function SearchBarCompact({
  initialDestination = '',
  initialCheckin = '',
  initialCheckout = '',
  initialAdults,
  initialChildren = 0,
}: Props) {
  const router = useRouter();

  const [query, setQuery]       = useState(initialDestination);
  const [showDest, setShowDest] = useState(false);
  const [checkIn, setCheckIn]   = useState(initialCheckin);
  const [checkOut, setCheckOut] = useState(initialCheckout);
  const [showDates, setShowDates] = useState(false);
  const [adults, setAdults]     = useState(initialAdults ?? 2);
  const [children, setChildren] = useState(initialChildren);
  const [travelersSet, setTravelersSet] = useState(initialAdults !== undefined);
  const [showTravelers, setShowTravelers] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const filtered = query.trim()
    ? DESTINATIONS.filter(d => `${d.city} ${d.country}`.toLowerCase().includes(query.toLowerCase()))
    : DESTINATIONS;

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setShowDest(false);
        setShowDates(false);
        setShowTravelers(false);
      }
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const dateLabel = checkIn && checkOut ? `${fmt(checkIn)} – ${fmt(checkOut)}` : checkIn ? fmt(checkIn) : '';
  const travelLabel = travelersSet
    ? `${adults} Adult${adults !== 1 ? 's' : ''}${children > 0 ? `, ${children} Child${children !== 1 ? 'ren' : ''}` : ''}`
    : '';

  const handleSearch = () => {
    const p = new URLSearchParams();
    if (query)   p.set('destination', query);
    if (checkIn) p.set('checkin', checkIn);
    if (checkOut) p.set('checkout', checkOut);
    if (travelersSet) {
      p.set('adults', adults.toString());
      if (children > 0) p.set('children', children.toString());
    }
    router.push(`/search?${p.toString()}`);
  };

  return (
    <div ref={ref} className="relative w-full">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col md:flex-row items-stretch">

        {/* Where */}
        <div className="relative flex-1 px-5 py-3 min-w-0">
          <label className={LABEL}>Where?</label>
          <input
            type="text"
            value={query}
            onChange={e => { setQuery(e.target.value); setShowDest(true); setShowDates(false); setShowTravelers(false); }}
            onFocus={() => { setShowDest(true); setShowDates(false); setShowTravelers(false); }}
            placeholder="Search destination"
            aria-label="Search destination"
            className="w-full text-[#1B2D4F] text-sm font-medium placeholder-[#1B2D4F]/25 bg-transparent focus:outline-none"
          />
          {showDest && (
            <div className={`${PANEL} left-0 right-0 max-h-60 overflow-y-auto`}>
              {filtered.length === 0 ? (
                <p className="px-4 py-3 text-sm text-[#1B2D4F]/40">No destinations found</p>
              ) : filtered.map(d => (
                <button
                  key={`${d.city}-${d.country}`}
                  onMouseDown={e => e.preventDefault()}
                  onClick={() => { setQuery(`${d.city}, ${d.country}`); setShowDest(false); }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-[#F5F5F0]
                             border-b border-gray-50 last:border-0 transition-colors cursor-pointer"
                >
                  <div>
                    <p className="text-[#1B2D4F] text-sm font-semibold">{d.city}</p>
                    <p className="text-[#1B2D4F]/40 text-xs">{d.country}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="hidden md:block w-px bg-gray-100 my-3" />
        <div className="md:hidden h-px bg-gray-100 mx-5" />

        {/* When */}
        <div
          className="relative flex-1 px-5 py-3 cursor-pointer min-w-0"
          onClick={() => { setShowDates(!showDates); setShowDest(false); setShowTravelers(false); }}
        >
          <p className={LABEL}>When?</p>
          <p className={`text-sm font-medium truncate ${dateLabel ? 'text-[#1B2D4F]' : 'text-[#1B2D4F]/25'}`}>
            {dateLabel || 'Add dates'}
          </p>
          {showDates && (
            <div className={`${PANEL} left-0 w-72 p-5`} onClick={e => e.stopPropagation()}>
              <p className="text-[#1B2D4F] text-sm font-bold mb-4">Select dates</p>
              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] font-bold text-[#1B2D4F]/40 uppercase tracking-widest mb-1.5">Check-in</label>
                  <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)}
                    className="w-full bg-[#F5F5F0] rounded-lg px-3 py-2.5 text-sm text-[#1B2D4F] focus:outline-none focus:ring-1 focus:ring-[#C9A96E]" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-[#1B2D4F]/40 uppercase tracking-widest mb-1.5">Check-out</label>
                  <input type="date" value={checkOut} min={checkIn} onChange={e => setCheckOut(e.target.value)}
                    className="w-full bg-[#F5F5F0] rounded-lg px-3 py-2.5 text-sm text-[#1B2D4F] focus:outline-none focus:ring-1 focus:ring-[#C9A96E]" />
                </div>
                <button onClick={() => setShowDates(false)}
                  className="w-full bg-[#C9A96E] text-[#1B2D4F] text-sm font-bold py-2.5 rounded-lg
                             hover:bg-[#b8944f] transition-colors cursor-pointer">
                  Confirm
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="hidden md:block w-px bg-gray-100 my-3" />
        <div className="md:hidden h-px bg-gray-100 mx-5" />

        {/* Who */}
        <div
          className="relative flex-1 px-5 py-3 cursor-pointer min-w-0"
          onClick={() => { setShowTravelers(!showTravelers); setShowDest(false); setShowDates(false); }}
        >
          <p className={LABEL}>Who?</p>
          <p className={`text-sm font-medium truncate ${travelLabel ? 'text-[#1B2D4F]' : 'text-[#1B2D4F]/25'}`}>
            {travelLabel || 'Add travelers'}
          </p>
          {showTravelers && (
            <div className={`${PANEL} right-0 w-64 p-5`} onClick={e => e.stopPropagation()}>
              <p className="text-[#1B2D4F] text-sm font-bold mb-4">Travelers</p>
              <div className="space-y-4">
                {[
                  { label: 'Adults', sub: 'Ages 13+', val: adults, set: setAdults, min: 1 },
                  { label: 'Children', sub: 'Ages 2–12', val: children, set: setChildren, min: 0 },
                ].map(({ label, sub, val, set, min }) => (
                  <div key={label} className="flex items-center justify-between">
                    <div>
                      <p className="text-[#1B2D4F] text-sm font-semibold">{label}</p>
                      <p className="text-[#1B2D4F]/40 text-xs">{sub}</p>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <button onClick={() => set(Math.max(min, val - 1))} disabled={val <= min}
                        className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center
                                   text-[#1B2D4F]/50 hover:border-[#C9A96E] hover:text-[#C9A96E]
                                   disabled:opacity-25 disabled:cursor-not-allowed transition-all cursor-pointer">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-[#1B2D4F] font-bold text-sm w-4 text-center">{val}</span>
                      <button onClick={() => set(val + 1)}
                        className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center
                                   text-[#1B2D4F]/50 hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all cursor-pointer">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
                <div className="h-px bg-gray-100" />
                <button onClick={() => { setTravelersSet(true); setShowTravelers(false); }}
                  className="w-full bg-[#C9A96E] text-[#1B2D4F] text-sm font-bold py-2.5 rounded-lg
                             hover:bg-[#b8944f] transition-colors cursor-pointer">
                  Confirm
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Search button */}
        <div className="hidden md:flex items-center pr-3 pl-1">
          <button onClick={handleSearch} aria-label="Search"
            className="bg-[#C9A96E] hover:bg-[#b8944f] w-10 h-10 rounded-xl flex items-center justify-center
                       transition-colors duration-200 cursor-pointer flex-shrink-0">
            <Search className="w-4 h-4 text-white" strokeWidth={2.5} />
          </button>
        </div>
        <div className="md:hidden px-5 pb-4 pt-1">
          <button onClick={handleSearch}
            className="w-full bg-[#C9A96E] hover:bg-[#b8944f] text-[#1B2D4F] font-bold text-sm
                       py-3 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer">
            <Search className="w-4 h-4" strokeWidth={2.5} />
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

function fmt(d: string) {
  if (!d) return '';
  const [, month, day] = d.split('-');
  return `${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][parseInt(month)-1]} ${parseInt(day)}`;
}
