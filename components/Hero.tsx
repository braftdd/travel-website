import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import SearchBar from './SearchBar';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=90"
        alt="Luxury tropical beach"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Layered gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/30 to-black/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/15 via-transparent to-black/15" />

      {/* Main content — fixed top padding positions content in upper hero; flex-1 spacer below absorbs remaining height */}
      <div className="relative z-10 flex flex-col items-center px-6 pt-28 md:pt-36 w-full">
        <div className="w-full max-w-5xl mx-auto text-center">

          {/* Eyebrow */}
          <p className="inline-flex items-center gap-2 text-[#C9A96E] text-xs font-semibold tracking-[0.45em] uppercase mb-6">
            <span className="block w-6 h-px bg-[#C9A96E]/60" />
            Premium Travel Collection
            <span className="block w-6 h-px bg-[#C9A96E]/60" />
          </p>

          {/* Search bar */}
          <SearchBar />

          {/* Headline — Playfair Display for luxury serif feel */}
          <h1 className="font-serif text-[clamp(2.5rem,7vw,5.5rem)] font-bold text-white leading-[1.05] tracking-tight mt-10 mb-4">
            Travel Beyond<br />
            <span className="italic font-medium text-white/90">the Ordinary</span>
          </h1>

          {/* Subtitle */}
          <p className="text-white/65 text-lg md:text-xl max-w-lg mx-auto font-light leading-relaxed">
            Curated luxury experiences in the world&apos;s most extraordinary destinations
          </p>
        </div>
      </div>

      {/* Spacer — fills remaining height below content, ensuring search bar stays in upper portion */}
      <div className="flex-1" />

      {/* Scroll indicator — respects prefers-reduced-motion */}
      <div className="relative z-10 flex justify-center pb-8">
        <div className="motion-safe:animate-scroll flex flex-col items-center gap-1 cursor-default">
          <ChevronDown className="w-6 h-6 text-white/40" strokeWidth={1.5} />
        </div>
      </div>
    </section>
  );
}
