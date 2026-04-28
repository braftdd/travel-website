import Image from 'next/image';
import Link from 'next/link';
import AnimateOnScroll from './AnimateOnScroll';

const destinations = [
  {
    name: 'Thailand',
    region: 'Southeast Asia',
    from: 'From $2,499',
    count: '48 curated properties',
    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1200&q=85',
  },
  {
    name: 'UAE',
    region: 'Middle East',
    from: 'From $3,199',
    count: '32 curated properties',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=85',
  },
  {
    name: 'America',
    region: 'United States',
    from: 'From $2,899',
    count: '64 curated properties',
    image: 'https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=1200&q=85',
  },
];

export default function DestinationsSection() {
  return (
    <section className="bg-[#F5F5F0] py-28 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <AnimateOnScroll className="text-center mb-16">
          <p className="text-[#C9A96E] text-xs font-semibold tracking-[0.45em] uppercase mb-4">
            Where to Go
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1B2D4F] mb-4 tracking-tight">
            Explore Our Destinations
          </h2>
          <p className="text-[#1B2D4F]/50 text-lg max-w-md mx-auto leading-relaxed">
            Handpicked luxury in three extraordinary regions
          </p>
        </AnimateOnScroll>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {destinations.map((dest, i) => (
            <AnimateOnScroll key={dest.name} delay={i * 100}>
              <Link
                href="#"
                className="group relative block overflow-hidden rounded-3xl aspect-[3/4] cursor-pointer"
              >
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />
                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/25 to-transparent
                                transition-opacity duration-500 group-hover:opacity-90" />

                {/* Border glow on hover */}
                <div className="absolute inset-0 rounded-3xl ring-1 ring-white/0 group-hover:ring-[#C9A96E]/30
                                transition-all duration-500" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="text-[#C9A96E] text-xs font-semibold tracking-[0.35em] uppercase mb-2">
                    {dest.region}
                  </p>
                  <h3 className="font-serif text-white text-4xl font-bold mb-3 leading-none">
                    {dest.name}
                  </h3>
                  <div className="flex items-center justify-between mb-0 group-hover:mb-5 transition-all duration-500 overflow-hidden">
                    <p className="text-white/55 text-sm">{dest.count}</p>
                    <p className="text-white font-semibold text-sm">{dest.from}</p>
                  </div>
                  {/* Hover CTA */}
                  <div className="h-0 group-hover:h-7 overflow-hidden transition-all duration-500 ease-out">
                    <span className="text-[#C9A96E] text-sm font-semibold tracking-wide">
                      Explore {dest.name} →
                    </span>
                  </div>
                </div>
              </Link>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
