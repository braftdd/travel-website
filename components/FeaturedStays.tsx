import Image from 'next/image';
import Link from 'next/link';
import AnimateOnScroll from './AnimateOnScroll';
import { supabase } from '@/lib/supabase';

const FALLBACK_STAYS = [
  {
    name: 'Amanpuri Resort',
    location: 'Phuket, Thailand',
    price: 'From $890/night',
    tag: 'Beachfront Villa',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=85',
  },
  {
    name: 'The Royal Palm',
    location: 'Dubai, UAE',
    price: 'From $1,200/night',
    tag: 'Sky Suite',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=85',
  },
  {
    name: 'Four Seasons',
    location: 'Koh Samui, Thailand',
    price: 'From $750/night',
    tag: 'Overwater Villa',
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=85',
  },
  {
    name: 'The Setai',
    location: 'Miami Beach, USA',
    price: 'From $680/night',
    tag: 'Penthouse Suite',
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=85',
  },
];

function deriveTag(amenities: string[]): string {
  if (amenities.includes('Beach')) return 'Beachfront Villa';
  if (amenities.includes('Pool'))  return 'Pool Villa';
  if (amenities.includes('Spa'))   return 'Spa Retreat';
  return 'Luxury Stay';
}

const Stars = () => (
  <div className="flex items-center gap-0.5 mb-3" aria-label="5 star rating">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} className="w-3 h-3 text-[#C9A96E]" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

export default async function FeaturedStays() {
  let stays = FALLBACK_STAYS;
  try {
    const { data } = await supabase
      .from('hotels')
      .select('name, city, country, price_per_night, image_url, amenities')
      .order('price_per_night', { ascending: false })
      .limit(4);
    if (data && data.length > 0) {
      stays = data.map(h => ({
        name:     h.name,
        location: `${h.city}, ${h.country}`,
        price:    `From $${Number(h.price_per_night).toLocaleString()}/night`,
        tag:      deriveTag(h.amenities ?? []),
        image:    h.image_url ?? FALLBACK_STAYS[0].image,
      }));
    }
  } catch {
    // use fallback
  }

  return (
    <section className="bg-white py-28 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <AnimateOnScroll>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <p className="text-[#C9A96E] text-xs font-semibold tracking-[0.45em] uppercase mb-4">
                Exclusive Properties
              </p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1B2D4F] mb-4 tracking-tight">
                Handpicked Stays
              </h2>
              <p className="text-[#1B2D4F]/50 text-lg max-w-md leading-relaxed">
                Every property personally selected for exceptional quality
              </p>
            </div>
            <Link
              href="#"
              className="mt-8 md:mt-0 inline-flex items-center gap-2 text-[#C9A96E] font-semibold text-sm group cursor-pointer"
            >
              <span className="border-b border-[#C9A96E]/50 pb-0.5 group-hover:border-[#C9A96E] transition-colors duration-200">
                View All Stays
              </span>
              <span className="group-hover:translate-x-1.5 transition-transform duration-200">→</span>
            </Link>
          </div>
        </AnimateOnScroll>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stays.map((stay: typeof FALLBACK_STAYS[0], i: number) => (
            <AnimateOnScroll key={stay.name} delay={i * 80}>
              <div className="group rounded-3xl overflow-hidden border border-[#1B2D4F]/6 bg-white
                              shadow-[0_2px_20px_rgba(0,0,0,0.06)]
                              hover:shadow-[0_8px_40px_rgba(27,45,79,0.15)]
                              transition-all duration-400 cursor-pointer">

                {/* Image */}
                <div className="relative h-60 overflow-hidden">
                  <Image
                    src={stay.image}
                    alt={stay.name}
                    fill
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-600 ease-out group-hover:scale-107"
                  />
                  {/* Subtle vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent
                                  opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                  {/* Tag badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/92 backdrop-blur-sm text-[#1B2D4F] text-xs font-bold
                                     px-3 py-1.5 rounded-full tracking-wide">
                      {stay.tag}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5 pt-4">
                  <Stars />
                  <h3 className="text-[#1B2D4F] font-bold text-base mb-1 leading-tight">{stay.name}</h3>
                  <p className="text-[#1B2D4F]/45 text-sm mb-4">{stay.location}</p>
                  <div className="flex items-center justify-between border-t border-[#1B2D4F]/6 pt-4">
                    <p className="text-[#1B2D4F] font-bold text-sm">{stay.price}</p>
                    <span className="text-[#C9A96E] text-xs font-bold
                                     group-hover:underline underline-offset-2 transition-all duration-200">
                      View →
                    </span>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
