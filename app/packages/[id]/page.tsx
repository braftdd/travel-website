import { notFound } from 'next/navigation';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PackageDetailClient from '@/components/packages/PackageDetailClient';
import { packages } from '@/lib/searchData';
import { toSlug } from '@/lib/utils';
import { getPackageDetail } from '@/lib/detailData';

export function generateStaticParams() {
  return packages.map(p => ({ id: toSlug(p.name) }));
}

export default function PackageDetailPage({ params }: { params: { id: string } }) {
  const pkg = packages.find(p => toSlug(p.name) === params.id);
  if (!pkg) notFound();

  const detail     = getPackageDetail(pkg);
  const grandTotal = detail.flightCost + detail.hotelCost + detail.transferCost - detail.discount;
  const related    = packages.filter(p => p.id !== pkg.id).slice(0, 3);

  return (
    <>
      <Navbar />

      {/* Hero */}
      <div className="pt-16 relative h-[50vh] min-h-[320px] overflow-hidden">
        <Image
          src={pkg.image}
          alt={pkg.name}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1B2D4F]/80 via-[#1B2D4F]/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="bg-[#C9A96E] text-[#1B2D4F] text-xs font-bold px-3 py-1 rounded-full">
              {pkg.nights} nights
            </span>
            {pkg.includes.map(inc => (
              <span key={inc} className="bg-white/15 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
                {inc}
              </span>
            ))}
          </div>
          <h1 className="font-playfair text-3xl sm:text-4xl font-bold text-white mb-1">
            {pkg.name}
          </h1>
          <p className="text-white/60 text-sm flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            {pkg.route} · {pkg.hotel}
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pb-24 lg:pb-16 mt-10">
        <PackageDetailClient
          pkg={pkg}
          detail={detail}
          grandTotal={grandTotal}
          related={related}
        />
      </main>

      {/* Mobile fixed bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white border-t border-gray-100
                      shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-4 py-3 z-40">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[#1B2D4F] font-bold text-xl">${grandTotal.toLocaleString()}</span>
            <span className="text-[#1B2D4F]/45 text-xs ml-1">total</span>
          </div>
          <button className="bg-[#C9A96E] hover:bg-[#b8944f] text-[#1B2D4F] font-bold
                             px-6 py-3 rounded-xl transition-colors duration-200 text-sm">
            Book Package
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}
