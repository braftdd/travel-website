'use client';

import { AMENITIES, FLIGHT_CLASSES, MAX_PRICE } from '@/lib/searchData';
import type { ResultType, SortBy } from '@/lib/searchData';

export interface FilterState {
  type: ResultType;
  priceRange: [number, number];
  ratings: number[];
  amenities: string[];
  flightClass: string;
  sortBy: SortBy;
}

interface NearbyCity {
  city: string;
  country: string;
}

interface Props {
  filters: FilterState;
  onUpdate: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  onClear: () => void;
  searchCity?: string;
  searchRegion?: string;
  nearbyCities?: NearbyCity[];
  onNearbyClick?: (city: string, country: string) => void;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-bold text-[#1B2D4F]/40 uppercase tracking-[0.2em] mb-3">
      {children}
    </p>
  );
}

function Checkbox({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer group">
      <div
        onClick={onChange}
        className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-all duration-150 ${
          checked
            ? 'bg-[#1B2D4F] border-[#1B2D4F]'
            : 'border-gray-300 group-hover:border-[#1B2D4F]'
        }`}
      >
        {checked && (
          <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 12 12" fill="none">
            <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <span className="text-sm text-[#1B2D4F]/70 group-hover:text-[#1B2D4F] transition-colors">
        {label}
      </span>
    </label>
  );
}

function PriceSlider({ value, onChange }: { value: [number, number]; onChange: (v: [number, number]) => void }) {
  const [lo, hi] = value;

  return (
    <div>
      <div className="flex justify-between text-sm font-bold text-[#1B2D4F] mb-4">
        <span>${lo.toLocaleString()}</span>
        <span>${hi.toLocaleString()}{hi === MAX_PRICE ? '+' : ''}</span>
      </div>
      {/* Track */}
      <div className="relative h-1.5 bg-gray-200 rounded-full mb-4">
        <div
          className="absolute h-full bg-[#C9A96E] rounded-full"
          style={{
            left: `${(lo / MAX_PRICE) * 100}%`,
            right: `${(1 - hi / MAX_PRICE) * 100}%`,
          }}
        />
      </div>
      <input
        type="range" min={0} max={MAX_PRICE} step={100} value={lo}
        onChange={e => { const v = +e.target.value; if (v < hi) onChange([v, hi]); }}
        className="w-full accent-[#C9A96E] h-1 cursor-pointer mb-2 block"
      />
      <input
        type="range" min={0} max={MAX_PRICE} step={100} value={hi}
        onChange={e => { const v = +e.target.value; if (v > lo) onChange([lo, v]); }}
        className="w-full accent-[#C9A96E] h-1 cursor-pointer block"
      />
    </div>
  );
}

export default function FilterSidebar({
  filters, onUpdate, onClear,
  searchCity, searchRegion, nearbyCities = [], onNearbyClick,
}: Props) {
  const toggle = <T,>(arr: T[], val: T): T[] =>
    arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val];

  const showAmenities = filters.type === 'all' || filters.type === 'stay';

  return (
    <div className="bg-white rounded-2xl border border-[#1B2D4F]/6 shadow-sm p-6 space-y-7 sticky top-24">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-[#1B2D4F] font-bold text-base">Filters</h3>
        <button
          onClick={onClear}
          className="text-[#C9A96E] text-xs font-semibold hover:underline cursor-pointer"
        >
          Clear all
        </button>
      </div>

      {/* Nearby cities */}
      {nearbyCities.length > 0 && (
        <div>
          <SectionTitle>Also in {searchRegion}</SectionTitle>
          <div className="flex flex-wrap gap-2">
            {nearbyCities.map(({ city, country }) => (
              <button
                key={city}
                onClick={() => onNearbyClick?.(city, country)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all duration-150 cursor-pointer ${
                  searchCity === city
                    ? 'bg-[#1B2D4F] border-[#1B2D4F] text-white'
                    : 'border-gray-200 text-[#1B2D4F]/60 hover:border-[#C9A96E] hover:text-[#C9A96E]'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Price range */}
      <div>
        <SectionTitle>Price Range</SectionTitle>
        <PriceSlider
          value={filters.priceRange}
          onChange={v => onUpdate('priceRange', v)}
        />
      </div>

      {/* Star rating */}
      <div>
        <SectionTitle>Star Rating</SectionTitle>
        <div className="flex gap-2">
          {[3, 4, 5].map(r => (
            <button
              key={r}
              onClick={() => onUpdate('ratings', toggle(filters.ratings, r))}
              className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all duration-150 cursor-pointer ${
                filters.ratings.includes(r)
                  ? 'bg-[#C9A96E] border-[#C9A96E] text-white shadow-sm'
                  : 'bg-transparent border-gray-300 text-[#1B2D4F]/55 hover:border-[#C9A96E] hover:text-[#C9A96E]'
              }`}
            >
              {'★'.repeat(r)}
            </button>
          ))}
        </div>
      </div>

      {/* Amenities — only for Stays / All */}
      {showAmenities && (
        <div>
          <SectionTitle>Amenities</SectionTitle>
          <div className="space-y-2.5">
            {AMENITIES.map(a => (
              <Checkbox
                key={a}
                label={a}
                checked={filters.amenities.includes(a)}
                onChange={() => onUpdate('amenities', toggle(filters.amenities, a))}
              />
            ))}
          </div>
        </div>
      )}

      {/* Flight class */}
      <div>
        <SectionTitle>Flight Class</SectionTitle>
        <div className="space-y-2.5">
          {FLIGHT_CLASSES.map(c => (
            <label key={c} className="flex items-center gap-2.5 cursor-pointer group">
              <div
                onClick={() => onUpdate('flightClass', filters.flightClass === c ? '' : c)}
                className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-150 ${
                  filters.flightClass === c
                    ? 'border-[#1B2D4F]'
                    : 'border-gray-300 group-hover:border-[#1B2D4F]'
                }`}
              >
                {filters.flightClass === c && (
                  <div className="w-2 h-2 rounded-full bg-[#1B2D4F]" />
                )}
              </div>
              <span className="text-sm text-[#1B2D4F]/70 group-hover:text-[#1B2D4F] transition-colors">
                {c}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
