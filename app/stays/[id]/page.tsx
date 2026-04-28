import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Star } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HotelGallery from '@/components/stays/HotelGallery';
import HotelBookingCard from '@/components/stays/HotelBookingCard';
import HeartButton from '@/components/search/HeartButton';
import { stays } from '@/lib/searchData';
import { toSlug } from '@/lib/utils';
import { supabase } from '@/lib/supabase';
import {
  getGallery,
  getHotelDescription,
  getHotelTags,
  getFullAmenities,
  getReviews,
} from '@/lib/detailData';
import {
  Waves, Sparkles, Umbrella, UtensilsCrossed,
  Dumbbell, Bell, Wifi, Car, Wine,
} from 'lucide-react';

const AMENITY_ICONS: Record<string, React.ReactNode> = {
  Waves:            <Waves className="w-5 h-5" />,
  Sparkles:         <Sparkles className="w-5 h-5" />,
  Umbrella:         <Umbrella className="w-5 h-5" />,
  UtensilsCrossed:  <UtensilsCrossed className="w-5 h-5" />,
  Dumbbell:         <Dumbbell className="w-5 h-5" />,
  Bell:             <Bell className="w-5 h-5" />,
  Wifi:             <Wifi className="w-5 h-5" />,
  Car:              <Car className="w-5 h-5" />,
  Wine:             <Wine className="w-5 h-5" />,
  Star:             <Star className="w-5 h-5" />,
};

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const stay = stays.find(s => toSlug(s.name) === params.id);
  return {
    title: stay ? `${stay.name} — Orbis Luxury Stays` : 'Luxury Stay — Orbis',
    description: stay
      ? `Book ${stay.name} in ${stay.location}. Curated luxury stays with Orbis.`
      : 'Curated luxury stays with Orbis.',
  };
}

export function generateStaticParams() {
  return stays.map(s => ({ id: toSlug(s.name) }));
}

export default async function StayDetailPage({ params }: { params: { id: string } }) {
  const { data: dbHotel } = await supabase
    .from('hotels')
    .select('price_per_night, rating')
    .eq('id', params.id)
    .maybeSingle();

  const localStay = stays.find(s => toSlug(s.name) === params.id);
  const stay = localStay
    ? { ...localStay, price: dbHotel?.price_per_night ?? localStay.price, rating: dbHotel?.rating ?? localStay.rating }
    : null;
  if (!stay) notFound();

  const images      = getGallery(stay);
  const description = getHotelDescription(stay);
  const tags        = getHotelTags(stay);
  const amenities   = getFullAmenities(stay);
  const reviews     = getReviews(stay.id);
  const related     = stays
    .filter(s => s.destination === stay.destination && s.id !== stay.id)
    .slice(0, 3);

  return (
    <>
      <Navbar />

      {/* Gallery */}
      <div className="pt-16">
        <HotelGallery images={images} name={stay.name} />
      </div>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pb-20 lg:pb-16">
        <div className="flex flex-col lg:flex-row gap-10 mt-10">

          {/* LEFT COLUMN */}
          <div className="flex-1 min-w-0">

            {/* Header */}
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {tags.map(tag => (
                  <span key={tag} className="text-[10px] font-bold uppercase tracking-[0.15em]
                                              text-[#C9A96E] bg-[#C9A96E]/10 px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-start justify-between gap-4 mb-2">
                <h1 className="font-playfair text-3xl sm:text-4xl font-bold text-[#1B2D4F] leading-tight">
                  {stay.name}
                </h1>
                <div className="relative w-12 h-12 flex-shrink-0 mt-1">
                  <HeartButton type="stay" referenceId={params.id} />
                </div>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1">
                  {Array.from({ length: stay.rating }).map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-[#C9A96E]" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <div className="flex items-center gap-1.5 text-[#1B2D4F]/50 text-sm">
                  <MapPin className="w-4 h-4 text-[#C9A96E]" />
                  {stay.location}
                </div>
              </div>
            </div>

            {/* About */}
            <section className="mb-10">
              <h2 className="text-[#1B2D4F] font-bold text-xl mb-4">About this property</h2>
              <p className="text-[#1B2D4F]/65 leading-relaxed text-[15px]">{description}</p>
            </section>

            {/* Amenities grid */}
            <section className="mb-10">
              <h2 className="text-[#1B2D4F] font-bold text-xl mb-5">Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {amenities.map(item => (
                  <div
                    key={item.label}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 border transition-all ${
                      item.available
                        ? 'bg-white border-[#1B2D4F]/8 text-[#1B2D4F]'
                        : 'bg-[#F5F5F0] border-transparent text-[#1B2D4F]/25 line-through'
                    }`}
                  >
                    <span className={item.available ? 'text-[#C9A96E]' : 'text-[#1B2D4F]/20'}>
                      {AMENITY_ICONS[item.icon] ?? <Star className="w-5 h-5" />}
                    </span>
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Reviews */}
            <section className="mb-10">
              <h2 className="text-[#1B2D4F] font-bold text-xl mb-5">Guest Reviews</h2>
              <div className="space-y-4">
                {reviews.map((r, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-[#1B2D4F]/8 p-5
                                          shadow-[0_2px_12px_rgba(27,45,79,0.06)]">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="text-[#1B2D4F] font-semibold text-sm">{r.name}</p>
                        <p className="text-[#1B2D4F]/40 text-xs mt-0.5">{r.date}</p>
                      </div>
                      <div className="flex gap-0.5">
                        {Array.from({ length: r.rating }).map((_, j) => (
                          <svg key={j} className="w-3.5 h-3.5 text-[#C9A96E]" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-[#1B2D4F]/65 text-sm leading-relaxed">{r.text}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN — sticky booking card */}
          <div className="lg:w-[380px] flex-shrink-0">
            <div className="lg:sticky lg:top-24">
              <HotelBookingCard price={stay.price} id={params.id} />
            </div>
          </div>
        </div>

        {/* You May Also Like */}
        {related.length > 0 && (
          <section className="mt-16 pt-10 border-t border-[#1B2D4F]/8">
            <h2 className="font-playfair text-2xl font-bold text-[#1B2D4F] mb-6">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map(s => (
                <Link
                  key={s.id}
                  href={`/stays/${toSlug(s.name)}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-[#1B2D4F]/6
                             shadow-[0_2px_16px_rgba(0,0,0,0.06)]
                             hover:shadow-[0_8px_32px_rgba(27,45,79,0.13)]
                             transition-all duration-300 flex flex-col"
                >
                  <div className="relative h-44 overflow-hidden flex-shrink-0">
                    <Image
                      src={s.image}
                      alt={s.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 bg-white/92 backdrop-blur-sm text-[#1B2D4F]
                                     text-xs font-bold px-3 py-1 rounded-full">
                      {s.tag}
                    </span>
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <p className="text-[#1B2D4F] font-bold text-sm leading-tight mb-1">{s.name}</p>
                    <p className="text-[#1B2D4F]/45 text-xs mb-3">{s.location}</p>
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-[#1B2D4F] font-bold text-sm">
                        ${s.price.toLocaleString()}<span className="text-[#1B2D4F]/40 font-normal text-xs">/night</span>
                      </span>
                      <span className="text-[#C9A96E] text-xs font-bold">View →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Mobile fixed bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white border-t border-gray-100
                      shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-4 py-3 z-40">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[#1B2D4F] font-bold text-xl">${stay.price.toLocaleString()}</span>
            <span className="text-[#1B2D4F]/45 text-xs ml-1">/ night</span>
          </div>
          <a
            href="#booking"
            className="bg-[#C9A96E] hover:bg-[#b8944f] text-[#1B2D4F] font-bold
                       px-6 py-3 rounded-xl transition-colors duration-200 text-sm"
          >
            Book Now
          </a>
        </div>
      </div>

      <Footer />
    </>
  );
}
