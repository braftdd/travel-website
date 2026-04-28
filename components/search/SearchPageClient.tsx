'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import {
  ALL_RESULTS, MAX_PRICE,
  CITY_DESTINATION, DESTINATION_CITIES,
  stays as localStays, flights as localFlights, packages as localPackages,
  type Stay, type Flight, type TravelPackage,
  type SearchResult, type ResultType, type SortBy,
} from '@/lib/searchData';
import SearchBarCompact from './SearchBarCompact';
import FilterSidebar, { type FilterState } from './FilterSidebar';
import MobileFilterDrawer from './MobileFilterDrawer';
import StayCard from './StayCard';
import FlightCard from './FlightCard';
import PackageCard from './PackageCard';

const PAGE_SIZE = 6;

const DEFAULT_FILTERS: FilterState = {
  type: 'all',
  priceRange: [0, MAX_PRICE],
  ratings: [],
  amenities: [],
  flightClass: '',
  sortBy: 'recommended',
};

const TYPE_TABS: { key: ResultType; label: string }[] = [
  { key: 'all',     label: 'All' },
  { key: 'stay',    label: 'Stays' },
  { key: 'flight',  label: 'Flights' },
  { key: 'package', label: 'Packages' },
];

const SORT_OPTIONS: { value: SortBy; label: string }[] = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'price-asc',   label: 'Price: Low to High' },
  { value: 'price-desc',  label: 'Price: High to Low' },
  { value: 'rating',      label: 'Top Rated' },
];

// Parse "Phuket, Thailand" → { city: "Phuket", region: "Thailand" }
function parseDestination(dest: string): { city: string; region: string } {
  if (!dest) return { city: '', region: '' };

  if (dest.includes(',')) {
    const city = dest.split(',')[0].trim();
    const region = CITY_DESTINATION[city] ?? '';
    return { city, region };
  }

  // Bare region name e.g. "Thailand"
  if (DESTINATION_CITIES[dest]) return { city: '', region: dest };

  // Bare city name e.g. "Phuket"
  if (CITY_DESTINATION[dest]) return { city: dest, region: CITY_DESTINATION[dest] };

  return { city: '', region: '' };
}

export default function SearchPageClient() {
  const searchParams = useSearchParams();
  const router       = useRouter();

  const initialDestination = searchParams.get('destination') ?? '';
  const initialCheckin     = searchParams.get('checkin')     ?? '';
  const initialCheckout    = searchParams.get('checkout')    ?? '';
  const rawAdults = searchParams.get('adults');
  const initialAdults = rawAdults !== null ? Number(rawAdults) : undefined;
  const initialChildren    = Number(searchParams.get('children') ?? 0);

  const { city: searchCity, region: searchRegion } = useMemo(
    () => parseDestination(initialDestination),
    [initialDestination],
  );

  const [allResults, setAllResults] = useState<SearchResult[]>(ALL_RESULTS);
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [page, setPage]       = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch('/api/hotels').then(r => r.json()).catch(() => ({ data: null })),
      fetch('/api/flights').then(r => r.json()).catch(() => ({ data: null })),
      fetch('/api/packages').then(r => r.json()).catch(() => ({ data: null })),
    ]).then(([{ data: hotels }, { data: apiFlights }, { data: apiPkgs }]) => {
      if (!hotels && !apiFlights && !apiPkgs) return;

      const stayByName  = new Map(localStays.map(s => [s.name, s]));
      const flightByKey = new Map(localFlights.map(f => [`${f.airline}|${f.from}|${f.to}|${f.flightClass}`, f]));
      const pkgByName   = new Map(localPackages.map(p => [p.name, p]));

      const mappedStays: Stay[] = (hotels ?? []).map((h: Record<string, unknown>, i: number) => {
        const local = stayByName.get(h.name as string);
        return {
          id:          local?.id ?? i,
          type:        'stay',
          name:        h.name as string,
          city:        h.city as string,
          location:    local?.location ?? `${h.city}, ${h.country}`,
          destination: local?.destination ?? '',
          price:       h.price_per_night as number,
          rating:      h.rating as number,
          tag:         local?.tag ?? '',
          image:       (h.image_url as string) ?? local?.image ?? '',
          amenities:   (h.amenities as string[]) ?? local?.amenities ?? [],
        };
      });

      const mappedFlights: Flight[] = (apiFlights ?? []).map((f: Record<string, unknown>, i: number) => {
        const local = flightByKey.get(`${f.airline}|${f.origin}|${f.destination}|${f.class}`);
        return {
          id:          local?.id ?? 1000 + i,
          type:        'flight',
          from:        f.origin as string,
          to:          f.destination as string,
          fromCode:    local?.fromCode ?? '',
          toCode:      local?.toCode ?? '',
          duration:    f.duration as string,
          flightClass: f.class as 'Economy' | 'Business' | 'First',
          price:       f.price as number,
          airline:     f.airline as string,
          destination: local?.destination ?? '',
        };
      });

      const mappedPackages: TravelPackage[] = (apiPkgs ?? []).map((p: Record<string, unknown>, i: number) => {
        const local = pkgByName.get(p.name as string);
        return {
          id:          local?.id ?? 2000 + i,
          type:        'package',
          name:        p.name as string,
          hotel:       local?.hotel ?? '',
          route:       local?.route ?? '',
          nights:      p.nights as number,
          price:       p.total_price as number,
          image:       local?.image ?? '',
          destination: local?.destination ?? (p.destination as string) ?? '',
          includes:    local?.includes ?? [],
        };
      });

      setAllResults([...mappedStays, ...mappedFlights, ...mappedPackages]);
    });
  }, []);

  const updateFilter = useCallback(
    <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
      setFilters(prev => ({ ...prev, [key]: value }));
      setPage(1);
    },
    [],
  );

  const clearFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setPage(1);
  }, []);

  // Cities in the same region, excluding the currently searched city
  const nearbyCities = useMemo(() => {
    if (!searchRegion) return [];
    return (DESTINATION_CITIES[searchRegion] ?? []).filter(c => c.city !== searchCity);
  }, [searchCity, searchRegion]);

  const handleNearbyClick = useCallback((city: string, country: string) => {
    const p = new URLSearchParams(searchParams.toString());
    p.set('destination', `${city}, ${country}`);
    router.push(`/search?${p.toString()}`);
  }, [searchParams, router]);

  // Step 1: filter by destination from URL (city-first, region fallback)
  const destinationFiltered = useMemo(() => {
    if (!searchCity && !searchRegion) return allResults;

    return allResults.filter(result => {
      if (result.type === 'stay') {
        if (searchCity) return result.city === searchCity;
        return result.destination === searchRegion;
      }
      // Flights and packages: match by region
      return searchRegion ? result.destination === searchRegion : true;
    });
  }, [searchCity, searchRegion, allResults]);

  // Step 2: apply sidebar filters on top
  const filtered = useMemo(() => {
    return destinationFiltered.filter(result => {
      if (filters.type !== 'all' && result.type !== filters.type) return false;

      if (result.type !== 'package') {
        if (result.price < filters.priceRange[0] || result.price > filters.priceRange[1]) return false;
      }

      if (filters.ratings.length > 0 && result.type === 'stay') {
        if (!filters.ratings.includes(Math.floor(result.rating))) return false;
      }

      if (filters.amenities.length > 0 && result.type === 'stay') {
        if (!filters.amenities.every(a => result.amenities.includes(a))) return false;
      }

      if (filters.flightClass && result.type === 'flight') {
        if (result.flightClass !== filters.flightClass) return false;
      }

      return true;
    });
  }, [destinationFiltered, filters]);

  const sorted = useMemo(() => {
    const copy = [...filtered];
    switch (filters.sortBy) {
      case 'price-asc':  return copy.sort((a, b) => a.price - b.price);
      case 'price-desc': return copy.sort((a, b) => b.price - a.price);
      case 'rating':
        return copy.sort((a, b) => {
          const ra = a.type === 'stay' ? a.rating : 0;
          const rb = b.type === 'stay' ? b.rating : 0;
          return rb - ra;
        });
      default: return copy;
    }
  }, [filtered, filters.sortBy]);

  const visible = sorted.slice(0, page * PAGE_SIZE);
  const hasMore = visible.length < sorted.length;

  const activeFilterCount = [
    filters.ratings.length > 0,
    filters.amenities.length > 0,
    !!filters.flightClass,
    filters.priceRange[0] !== 0 || filters.priceRange[1] !== MAX_PRICE,
  ].filter(Boolean).length;

  const sidebarProps = {
    filters,
    onUpdate: updateFilter,
    onClear: clearFilters,
    searchCity,
    searchRegion,
    nearbyCities,
    onNearbyClick: handleNearbyClick,
  };

  return (
    <main className="min-h-screen bg-[#F5F5F0]">
      {/* Search bar strip */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 mt-16">
          <SearchBarCompact
            initialDestination={initialDestination}
            initialCheckin={initialCheckin}
            initialCheckout={initialCheckout}
            initialAdults={initialAdults}
            initialChildren={initialChildren}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Mobile filter button + sort */}
        <div className="flex items-center justify-between mb-6 md:hidden">
          <button
            onClick={() => setShowMobileFilters(true)}
            className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5
                       text-[#1B2D4F] text-sm font-semibold shadow-sm hover:border-[#C9A96E]
                       transition-colors cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="ml-0.5 bg-[#C9A96E] text-[#1B2D4F] text-[10px] font-bold
                               w-4 h-4 rounded-full flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          <select
            value={filters.sortBy}
            onChange={e => updateFilter('sortBy', e.target.value as SortBy)}
            className="bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-[#1B2D4F]
                       text-sm font-medium focus:outline-none focus:ring-1 focus:ring-[#C9A96E]
                       cursor-pointer shadow-sm"
          >
            {SORT_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-8">
          {/* Sidebar — desktop */}
          <aside className="hidden md:block w-72 flex-shrink-0">
            <FilterSidebar {...sidebarProps} />
          </aside>

          {/* Results column */}
          <div className="flex-1 min-w-0">
            {/* Type tabs + sort row */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
              <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1 shadow-sm w-fit">
                {TYPE_TABS.map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => updateFilter('type', tab.key)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150 cursor-pointer ${
                      filters.type === tab.key
                        ? 'bg-[#1B2D4F] text-white shadow-sm'
                        : 'text-[#1B2D4F]/60 hover:text-[#1B2D4F] hover:bg-[#F5F5F0]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="hidden md:flex items-center gap-2">
                <span className="text-[#1B2D4F]/40 text-xs font-medium uppercase tracking-widest">Sort</span>
                <select
                  value={filters.sortBy}
                  onChange={e => updateFilter('sortBy', e.target.value as SortBy)}
                  className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-[#1B2D4F]
                             text-sm font-medium focus:outline-none focus:ring-1 focus:ring-[#C9A96E]
                             cursor-pointer shadow-sm"
                >
                  {SORT_OPTIONS.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Result count */}
            <p className="text-[#1B2D4F]/50 text-sm mb-5">
              <span className="font-semibold text-[#1B2D4F]">{sorted.length}</span>{' '}
              result{sorted.length !== 1 ? 's' : ''} found
              {initialDestination && (
                <> for <span className="font-semibold text-[#1B2D4F]">{initialDestination}</span></>
              )}
            </p>

            {/* Cards grid */}
            {visible.length === 0 ? (
              <EmptyState onClear={clearFilters} />
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {visible.map(result => (
                    <ResultCard key={`${result.type}-${result.id}`} result={result} />
                  ))}
                </div>

                {hasMore && (
                  <div className="mt-10 flex justify-center">
                    <button
                      onClick={() => setPage(p => p + 1)}
                      className="bg-white border border-gray-200 hover:border-[#C9A96E]
                                 text-[#1B2D4F] font-semibold text-sm px-8 py-3.5
                                 rounded-xl shadow-sm hover:shadow-md
                                 transition-all duration-200 cursor-pointer"
                    >
                      Show more results
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {showMobileFilters && (
        <MobileFilterDrawer
          {...sidebarProps}
          onClose={() => setShowMobileFilters(false)}
        />
      )}
    </main>
  );
}

function ResultCard({ result }: { result: SearchResult }) {
  if (result.type === 'stay')    return <StayCard stay={result} />;
  if (result.type === 'flight')  return <FlightCard flight={result} />;
  if (result.type === 'package') return <PackageCard pkg={result} />;
  return null;
}

function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-16 h-16 rounded-2xl bg-white border border-gray-100 shadow-sm
                      flex items-center justify-center mb-5">
        <SlidersHorizontal className="w-6 h-6 text-[#1B2D4F]/30" />
      </div>
      <h3 className="text-[#1B2D4F] font-bold text-lg mb-2">No results found</h3>
      <p className="text-[#1B2D4F]/50 text-sm mb-6 max-w-xs">
        Try adjusting your filters or search for a different destination.
      </p>
      <button
        onClick={onClear}
        className="bg-[#C9A96E] hover:bg-[#b8944f] text-[#1B2D4F] font-bold text-sm
                   px-6 py-3 rounded-xl transition-colors duration-200 cursor-pointer"
      >
        Clear all filters
      </button>
    </div>
  );
}
