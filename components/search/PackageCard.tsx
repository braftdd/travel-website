import Image from 'next/image';
import Link from 'next/link';
import { Plane, Building2, Car } from 'lucide-react';
import { type TravelPackage } from '@/lib/searchData';
import { toSlug } from '@/lib/utils';
import HeartButton from './HeartButton';

const includeIcons: Record<string, React.ReactNode> = {
  Flight:   <Plane className="w-3 h-3" />,
  Hotel:    <Building2 className="w-3 h-3" />,
  Transfer: <Car className="w-3 h-3" />,
};

export default function PackageCard({ pkg }: { pkg: TravelPackage }) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-[#1B2D4F]/6
                    shadow-[0_2px_16px_rgba(0,0,0,0.06)]
                    hover:shadow-[0_8px_32px_rgba(27,45,79,0.13)]
                    transition-all duration-300 flex flex-col">
      {/* Image */}
      <div className="relative h-44 overflow-hidden flex-shrink-0">
        <Image
          src={pkg.image}
          alt={pkg.name}
          fill
          sizes="(max-width:768px) 100vw, (max-width:1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Includes badges */}
        <div className="absolute bottom-3 left-3 flex gap-1.5">
          {pkg.includes.map(inc => (
            <span key={inc}
              className="flex items-center gap-1 bg-black/50 backdrop-blur-sm
                         text-white text-[10px] font-semibold px-2 py-1 rounded-full">
              {includeIcons[inc]}
              {inc}
            </span>
          ))}
        </div>

        {/* Nights badge */}
        <span className="absolute top-3 left-3 bg-[#C9A96E] text-[#1B2D4F] text-xs font-bold
                         px-3 py-1 rounded-full">
          {pkg.nights} nights
        </span>
        <HeartButton type="package" referenceId={toSlug(pkg.name)} />
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-[#1B2D4F] font-bold text-base mb-1 leading-tight">{pkg.name}</h3>

        <div className="flex flex-col gap-1 mb-4">
          <p className="text-[#1B2D4F]/50 text-xs flex items-center gap-1.5">
            <Building2 className="w-3 h-3 text-[#C9A96E]" />
            {pkg.hotel}
          </p>
          <p className="text-[#1B2D4F]/50 text-xs flex items-center gap-1.5">
            <Plane className="w-3 h-3 text-[#C9A96E]" />
            {pkg.route}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-[#1B2D4F]/6 pt-4">
          <div>
            <span className="text-[#1B2D4F] font-bold text-base">
              ${pkg.price.toLocaleString()}
            </span>
            <span className="text-[#1B2D4F]/40 text-xs"> total</span>
          </div>
          <Link
            href={`/packages/${toSlug(pkg.name)}`}
            className="bg-[#C9A96E] hover:bg-[#b8944f] text-[#1B2D4F] text-xs font-bold
                       px-4 py-2 rounded-xl transition-colors duration-200 cursor-pointer"
          >
            View Package
          </Link>
        </div>
      </div>
    </div>
  );
}
