'use client';

import { X } from 'lucide-react';
import FilterSidebar, { type FilterState } from './FilterSidebar';

interface NearbyCity { city: string; country: string }

interface Props {
  filters: FilterState;
  onUpdate: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  onClear: () => void;
  onClose: () => void;
  searchCity?: string;
  searchRegion?: string;
  nearbyCities?: NearbyCity[];
  onNearbyClick?: (city: string, country: string) => void;
}

export default function MobileFilterDrawer({
  filters, onUpdate, onClear, onClose,
  searchCity, searchRegion, nearbyCities, onNearbyClick,
}: Props) {
  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Slide-in panel */}
      <div className="w-80 max-w-[85vw] bg-white h-full overflow-y-auto flex flex-col shadow-2xl">
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 flex-shrink-0">
          <h2 className="text-[#1B2D4F] font-bold text-lg">Filters</h2>
          <button
            onClick={onClose}
            aria-label="Close filters"
            className="w-8 h-8 flex items-center justify-center text-[#1B2D4F]/40
                       hover:text-[#1B2D4F] transition-colors cursor-pointer rounded-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-7">
          <FilterSidebar
            filters={filters}
            onUpdate={onUpdate}
            onClear={onClear}
            searchCity={searchCity}
            searchRegion={searchRegion}
            nearbyCities={nearbyCities}
            onNearbyClick={onNearbyClick}
          />
        </div>

        <div className="px-6 py-4 border-t border-gray-100 flex-shrink-0">
          <button
            onClick={onClose}
            className="w-full bg-[#1B2D4F] text-white font-bold py-3.5 rounded-xl
                       hover:bg-[#C9A96E] hover:text-[#1B2D4F] transition-colors duration-200 cursor-pointer"
          >
            Apply Filters
          </button>
        </div>
      </div>

      {/* Backdrop */}
      <div
        className="flex-1 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
    </div>
  );
}
