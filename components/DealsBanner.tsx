import Image from 'next/image';
import Link from 'next/link';
import AnimateOnScroll from './AnimateOnScroll';

export default function DealsBanner() {
  return (
    <section className="relative h-[560px] flex items-center justify-center overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920&q=85"
        alt="Luxury resort pool"
        fill
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Dark tinted overlay with slight blue shift */}
      <div className="absolute inset-0 bg-[#0d1c35]/68" />
      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-radial-gradient" style={{
        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)'
      }} />

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <AnimateOnScroll>
          <p className="text-[#C9A96E] text-xs font-semibold tracking-[0.45em] uppercase mb-5">
            Limited Time Offer
          </p>
          <h2 className="font-serif text-4xl md:text-6xl font-bold text-white mb-5 tracking-tight leading-tight">
            Exclusive Summer<br />Collection
          </h2>
          <p className="text-white/65 text-lg md:text-xl mb-10 leading-relaxed max-w-xl mx-auto">
            Save up to 30% on curated packages to Thailand and Dubai
          </p>
          <Link
            href="#"
            className="inline-flex items-center gap-3 bg-[#C9A96E] text-[#1B2D4F] font-bold
                       px-10 py-4 rounded-full hover:bg-[#b8944f] transition-all duration-200
                       text-sm tracking-[0.12em] uppercase shadow-lg shadow-[#C9A96E]/25
                       hover:shadow-[#C9A96E]/40 hover:scale-105 cursor-pointer"
          >
            Explore Deals
          </Link>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
