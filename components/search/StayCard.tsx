import Image from 'next/image';
import Link from 'next/link';
import { type Stay } from '@/lib/searchData';
import { toSlug } from '@/lib/utils';
import HeartButton from './HeartButton';

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} star rating`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-3 h-3 text-[#C9A96E]" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function StayCard({ stay }: { stay: Stay }) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-[#1B2D4F]/6
                    shadow-[0_2px_16px_rgba(0,0,0,0.06)]
                    hover:shadow-[0_8px_32px_rgba(27,45,79,0.13)]
                    transition-all duration-300 flex flex-col">
      {/* Image */}
      <div className="relative h-52 overflow-hidden flex-shrink-0">
        <Image
          src={stay.image}
          alt={stay.name}
          fill
          sizes="(max-width:768px) 100vw, (max-width:1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="absolute top-3 left-3 bg-white/92 backdrop-blur-sm text-[#1B2D4F]
                         text-xs font-bold px-3 py-1 rounded-full">
          {stay.tag}
        </span>
        <HeartButton type="stay" referenceId={toSlug(stay.name)} />
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <Stars count={stay.rating} />
        <h3 className="text-[#1B2D4F] font-bold text-base mt-2 mb-0.5 leading-tight">{stay.name}</h3>
        <p className="text-[#1B2D4F]/45 text-sm mb-4">{stay.location}</p>

        {/* Amenities */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {stay.amenities.slice(0, 3).map(a => (
            <span key={a} className="text-[10px] font-semibold text-[#1B2D4F]/50 bg-[#F5F5F0]
                                     px-2 py-0.5 rounded-full">
              {a}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-[#1B2D4F]/6 pt-4">
          <div>
            <span className="text-[#1B2D4F] font-bold text-base">
              ${stay.price.toLocaleString()}
            </span>
            <span className="text-[#1B2D4F]/40 text-xs">/night</span>
          </div>
          <Link
            href={`/stays/${toSlug(stay.name)}`}
            className="bg-[#1B2D4F] hover:bg-[#C9A96E] text-white text-xs font-bold
                       px-4 py-2 rounded-xl transition-colors duration-200 cursor-pointer"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
