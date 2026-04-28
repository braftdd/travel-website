'use client';

import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X, Images } from 'lucide-react';

interface Props {
  images: string[];
  name: string;
}

export default function HotelGallery({ images, name }: Props) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const open  = (i: number) => setLightbox(i);
  const close = useCallback(() => setLightbox(null), []);
  const prev  = useCallback(() => setLightbox(i => i !== null ? (i - 1 + images.length) % images.length : 0), [images.length]);
  const next  = useCallback(() => setLightbox(i => i !== null ? (i + 1) % images.length : 0), [images.length]);

  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]);

  useEffect(() => {
    if (lightbox === null) return;
    const handle = (e: KeyboardEvent) => {
      if (e.key === 'Escape')      close();
      if (e.key === 'ArrowRight')  next();
      if (e.key === 'ArrowLeft')   prev();
    };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [lightbox, close, next, prev]);

  return (
    <>
      {/* Hero image */}
      <div
        className="relative w-full h-[60vh] min-h-[360px] cursor-pointer overflow-hidden"
        onClick={() => open(0)}
      >
        <Image
          src={images[0]}
          alt={name}
          fill
          className="object-cover hover:scale-105 transition-transform duration-700"
          priority
          sizes="100vw"
        />
        {/* "All photos" pill */}
        <button
          onClick={e => { e.stopPropagation(); open(0); }}
          className="absolute bottom-5 right-5 flex items-center gap-2 bg-white/90 backdrop-blur-sm
                     text-[#1B2D4F] text-xs font-bold px-4 py-2.5 rounded-full
                     shadow-lg hover:bg-white transition-colors duration-200"
        >
          <Images className="w-4 h-4" />
          View all {images.length} photos
        </button>
      </div>

      {/* Thumbnails */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-3">
        <div className="grid grid-cols-4 gap-2">
          {images.slice(1, 5).map((src, i) => (
            <div
              key={i}
              className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer"
              onClick={() => open(i + 1)}
            >
              <Image
                src={src}
                alt={`${name} ${i + 2}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                sizes="(max-width:768px) 25vw, 20vw"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center">
          {/* Close */}
          <button
            onClick={close}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20
                       flex items-center justify-center text-white transition-colors duration-200 z-10"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Counter */}
          <span className="absolute top-6 left-1/2 -translate-x-1/2 text-white/50 text-sm">
            {lightbox + 1} / {images.length}
          </span>

          {/* Prev */}
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full
                       bg-white/10 hover:bg-white/20 flex items-center justify-center
                       text-white transition-colors duration-200"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Image */}
          <div className="relative w-full max-w-5xl h-[80vh] mx-16">
            <Image
              src={images[lightbox]}
              alt={`${name} ${lightbox + 1}`}
              fill
              className="object-contain"
              sizes="(max-width:1280px) 100vw, 1280px"
            />
          </div>

          {/* Next */}
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full
                       bg-white/10 hover:bg-white/20 flex items-center justify-center
                       text-white transition-colors duration-200"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Thumbnail strip */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((src, i) => (
              <button
                key={i}
                onClick={() => setLightbox(i)}
                className={`relative w-14 h-10 rounded-lg overflow-hidden border-2 transition-all duration-150
                  ${i === lightbox ? 'border-[#C9A96E] opacity-100' : 'border-transparent opacity-50 hover:opacity-80'}`}
              >
                <Image src={src} alt="" fill className="object-cover" sizes="56px" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
