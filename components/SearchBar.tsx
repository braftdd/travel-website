'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Plus, Minus } from 'lucide-react';

const DESTINATIONS = [
  { city: 'Phuket',       country: 'Thailand',        flag: '🇹🇭' },
  { city: 'Koh Samui',    country: 'Thailand',        flag: '🇹🇭' },
  { city: 'Chiang Mai',   country: 'Thailand',        flag: '🇹🇭' },
  { city: 'Bangkok',      country: 'Thailand',        flag: '🇹🇭' },
  { city: 'Dubai',        country: 'UAE',             flag: '🇦🇪' },
  { city: 'Abu Dhabi',    country: 'UAE',             flag: '🇦🇪' },
  { city: 'Miami',        country: 'USA',             flag: '🇺🇸' },
  { city: 'New York',     country: 'USA',             flag: '🇺🇸' },
  { city: 'Los Angeles',  country: 'USA',             flag: '🇺🇸' },
  { city: 'Hawaii',       country: 'USA',             flag: '🇺🇸' },
  { city: 'Santorini',    country: 'Greece',          flag: '🇬🇷' },
  { city: 'Mallorca',     country: 'Spain',           flag: '🇪🇸' },
  { city: 'Amalfi Coast', country: 'Italy',           flag: '🇮🇹' },
  { city: 'Paris',        country: 'France',          flag: '🇫🇷' },
  { city: 'Maldives',     country: 'Maldives',        flag: '🇲🇻' },
  { city: 'Swiss Alps',   country: 'Switzerland',     flag: '🇨🇭' },
  { city: 'Barcelona',    country: 'Spain',           flag: '🇪🇸' },
  { city: 'London',       country: 'United Kingdom',  flag: '🇬🇧' },
  { city: 'Mykonos',      country: 'Greece',          flag: '🇬🇷' },
  { city: "Côte d'Azur",  country: 'France',          flag: '🇫🇷' },
];

const LABEL = 'block text-[10px] font-bold text-white/45 uppercase tracking-[0.2em] mb-1.5 select-none';

// Glass dark panel — used for all dropdowns
const PANEL = 'absolute z-[60] mt-3 rounded-2xl shadow-2xl glass-dark overflow-hidden';

function GlassCounter({
  label, sub, value, min = 0, onChange,
}: {
  label: string; sub: string; value: number; min?: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-white text-sm font-semibold">{label}</p>
        <p className="text-white/45 text-xs mt-0.5">{sub}</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          aria-label={`Decrease ${label}`}
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60
                     hover:border-[#C9A96E] hover:text-[#C9A96E] disabled:opacity-25 disabled:cursor-not-allowed
                     transition-all duration-200 cursor-pointer"
        >
          <Minus className="w-3 h-3" />
        </button>
        <span className="text-white font-semibold text-sm w-4 text-center select-none">{value}</span>
        <button
          aria-label={`Increase ${label}`}
          onClick={() => onChange(value + 1)}
          className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60
                     hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all duration-200 cursor-pointer"
        >
          <Plus className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

export default function SearchBar() {
  const router = useRouter();

  // ── Where ──────────────────────────────────────────────
  const [query,    setQuery]    = useState('');
  const [showDest, setShowDest] = useState(false);

  // ── When ───────────────────────────────────────────────
  const [showDates, setShowDates] = useState(false);
  const [checkIn,   setCheckIn]   = useState('');
  const [checkOut,  setCheckOut]  = useState('');

  // ── Who ────────────────────────────────────────────────
  const [showTravelers,      setShowTravelers]      = useState(false);
  const [travelersConfirmed, setTravelersConfirmed] = useState(false);
  const [adults,   setAdults]   = useState(2);
  const [children, setChildren] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = query.trim()
    ? DESTINATIONS.filter((d) =>
        `${d.city} ${d.country}`.toLowerCase().includes(query.toLowerCase())
      )
    : DESTINATIONS;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setShowDest(false);
        setShowDates(false);
        setShowTravelers(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const dateLabel =
    checkIn && checkOut
      ? `${fmt(checkIn)} – ${fmt(checkOut)}`
      : checkIn
      ? fmt(checkIn)
      : '';

  const travelersLabel = travelersConfirmed
    ? `${adults} Adult${adults !== 1 ? 's' : ''}${children > 0 ? `, ${children} Child${children !== 1 ? 'ren' : ''}` : ''}`
    : '';

  const closeAll = () => {
    setShowDest(false);
    setShowDates(false);
    setShowTravelers(false);
  };

  const handleSearch = () => {
    closeAll();
    const p = new URLSearchParams();
    if (query)   p.set('destination', query);
    if (checkIn) p.set('checkin', checkIn);
    if (checkOut) p.set('checkout', checkOut);
    if (travelersConfirmed) {
      p.set('adults', adults.toString());
      if (children > 0) p.set('children', children.toString());
    }
    router.push(`/search?${p.toString()}`);
  };

  // ── Divider ────────────────────────────────────────────
  const Divider = () => (
    <>
      <div className="hidden md:block w-px bg-white/12 my-5 flex-shrink-0" />
      <div className="md:hidden h-px bg-white/12 mx-6" />
    </>
  );

  return (
    <div ref={containerRef} className="relative w-full max-w-4xl mx-auto">
      {/* ── Bar shell ─────────────────────────────────── */}
      <div className="glass-dark rounded-2xl shadow-2xl flex flex-col md:flex-row items-stretch">

        {/* ── FIELD 1 · Where ──────────────────────────── */}
        <div className="relative flex-1 px-6 py-5 min-w-0">
          <label className={LABEL}>Where?</label>
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowDest(true);
              setShowDates(false);
              setShowTravelers(false);
            }}
            onFocus={() => {
              setShowDest(true);
              setShowDates(false);
              setShowTravelers(false);
            }}
            placeholder="Search destination"
            aria-label="Search destination"
            className="w-full text-white text-sm font-medium placeholder-white/35 bg-transparent focus:outline-none min-w-0"
          />

          {/* Autocomplete dropdown */}
          {showDest && (
            <div className={`${PANEL} left-0 right-0 max-h-72 overflow-y-auto`}>
              {filtered.length === 0 ? (
                <p className="px-5 py-4 text-sm text-white/50">
                  No destinations found — try &quot;Dubai&quot; or &quot;Phuket&quot;
                </p>
              ) : (
                filtered.map((dest) => (
                  <button
                    key={`${dest.city}-${dest.country}`}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      setQuery(`${dest.city}, ${dest.country}`);
                      setShowDest(false);
                    }}
                    className="w-full flex items-center gap-4 px-5 py-3.5 text-left
                               hover:bg-white/8 border-b border-white/6 last:border-0
                               transition-colors duration-150 cursor-pointer"
                  >
                    <span className="text-xl leading-none flex-shrink-0">{dest.flag}</span>
                    <div>
                      <p className="text-white text-sm font-semibold leading-tight">{dest.city}</p>
                      <p className="text-white/45 text-xs mt-0.5">{dest.country}</p>
                    </div>
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        <Divider />

        {/* ── FIELD 2 · When ───────────────────────────── */}
        <div
          className="relative flex-1 px-6 py-5 cursor-pointer min-w-0"
          onClick={() => {
            setShowDates(!showDates);
            setShowDest(false);
            setShowTravelers(false);
          }}
        >
          <p className={LABEL}>When?</p>
          <p className={`text-sm font-medium truncate ${dateLabel ? 'text-white' : 'text-white/35'}`}>
            {dateLabel || 'Add dates'}
          </p>

          {/* Date picker panel */}
          {showDates && (
            <div
              className={`${PANEL} left-0 w-72 p-6`}
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-white text-sm font-bold mb-5 tracking-wide">Select dates</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-white/45 uppercase tracking-widest mb-2">
                    Check-in
                  </label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="glass-input w-full rounded-xl px-4 py-3 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-white/45 uppercase tracking-widest mb-2">
                    Check-out
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    min={checkIn}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="glass-input w-full rounded-xl px-4 py-3 text-sm"
                  />
                </div>
                <button
                  onClick={() => setShowDates(false)}
                  className="w-full bg-[#C9A96E] text-[#1B2D4F] text-sm font-bold py-3 rounded-xl
                             hover:bg-[#b8944f] transition-colors duration-200 mt-1 cursor-pointer"
                >
                  Confirm Dates
                </button>
              </div>
            </div>
          )}
        </div>

        <Divider />

        {/* ── FIELD 3 · Who ────────────────────────────── */}
        <div
          className="relative flex-1 px-6 py-5 cursor-pointer min-w-0"
          onClick={() => {
            setShowTravelers(!showTravelers);
            setShowDest(false);
            setShowDates(false);
          }}
        >
          <p className={LABEL}>Who?</p>
          <p className={`text-sm font-medium truncate ${travelersLabel ? 'text-white' : 'text-white/35'}`}>
            {travelersLabel || 'Add travelers'}
          </p>

          {/* Travelers panel */}
          {showTravelers && (
            <div
              className={`${PANEL} right-0 w-72 p-6`}
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-white text-sm font-bold mb-5 tracking-wide">Travelers</p>
              <div className="space-y-5">
                <GlassCounter
                  label="Adults"
                  sub="Ages 13 or above"
                  value={adults}
                  min={1}
                  onChange={setAdults}
                />
                <div className="h-px bg-white/10" />
                <GlassCounter
                  label="Children"
                  sub="Ages 2–12"
                  value={children}
                  min={0}
                  onChange={setChildren}
                />
              </div>
              <button
                onClick={() => { setTravelersConfirmed(true); setShowTravelers(false); }}
                className="w-full bg-[#C9A96E] text-[#1B2D4F] text-sm font-bold py-3 rounded-xl
                           hover:bg-[#b8944f] transition-colors duration-200 mt-6 cursor-pointer"
              >
                Confirm
              </button>
            </div>
          )}
        </div>

        {/* ── Search button · Desktop circle ────────────── */}
        <div className="hidden md:flex items-center px-3 py-3 flex-shrink-0">
          <button
            onClick={handleSearch}
            aria-label="Search"
            className="bg-[#C9A96E] hover:bg-[#b8944f] w-14 h-14 rounded-full flex items-center justify-center
                       transition-all duration-200 shadow-lg shadow-[#C9A96E]/30
                       hover:shadow-[#C9A96E]/50 hover:scale-105 cursor-pointer"
          >
            <Search className="w-5 h-5 text-white" strokeWidth={2.5} />
          </button>
        </div>

        {/* ── Search button · Mobile full-width ─────────── */}
        <div className="md:hidden px-6 pb-5 pt-1">
          <button
            onClick={handleSearch}
            className="w-full bg-[#C9A96E] hover:bg-[#b8944f] text-[#1B2D4F] font-bold text-sm
                       py-3.5 rounded-xl flex items-center justify-center gap-2
                       transition-colors duration-200 cursor-pointer"
          >
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
  const [year, month, day] = d.split('-');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${months[parseInt(month) - 1]} ${parseInt(day)}, ${year}`;
}
