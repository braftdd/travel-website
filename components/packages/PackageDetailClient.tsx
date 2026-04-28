'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Plane, Building2, Car, ChevronDown, ChevronUp,
  CheckCircle2, Clock, Users, MapPin,
} from 'lucide-react';
import { toSlug } from '@/lib/utils';
import type { TravelPackage } from '@/lib/searchData';
import type { PackageDetail } from '@/lib/detailData';

interface Props {
  pkg: TravelPackage;
  detail: PackageDetail;
  grandTotal: number;
  related: TravelPackage[];
}

export default function PackageDetailClient({ pkg, detail, grandTotal, related }: Props) {
  return (
    <>
      {/* 3-card breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <BreakdownCard
          icon={<Plane className="w-5 h-5" />}
          title="Your Flight"
          lines={[detail.flightRoute, detail.flightAirline, detail.flightClass, detail.flightDuration]}
        />
        <BreakdownCard
          icon={<Building2 className="w-5 h-5" />}
          title="Your Stay"
          lines={[pkg.hotel, detail.hotelNights, detail.hotelRoom]}
        />
        <BreakdownCard
          icon={<Car className="w-5 h-5" />}
          title="Your Transfer"
          lines={[detail.transferVehicle, detail.transferRoute, detail.transferTime]}
        />
      </div>

      {/* Accordion + Booking layout */}
      <div className="flex flex-col lg:flex-row gap-10">
        {/* LEFT — Accordions */}
        <div className="flex-1 min-w-0 space-y-3">
          <AccordionSection title="Your Flight" defaultOpen>
            <div className="space-y-2 text-sm text-[#1B2D4F]/65">
              <div className="flex items-center gap-8">
                <div>
                  <p className="text-[#1B2D4F] font-bold text-2xl">{detail.departureTime}</p>
                  <p className="text-[#1B2D4F]/50 text-xs mt-0.5">{detail.flightRoute.split(' → ')[0]}</p>
                </div>
                <div className="flex-1 flex flex-col items-center">
                  <p className="text-[#1B2D4F]/40 text-xs mb-1">{detail.flightDuration}</p>
                  <div className="w-full h-px bg-[#C9A96E]/40" />
                </div>
                <div>
                  <p className="text-[#1B2D4F] font-bold text-2xl">{detail.arrivalTime}</p>
                  <p className="text-[#1B2D4F]/50 text-xs mt-0.5">{detail.flightRoute.split(' → ')[1]}</p>
                </div>
              </div>
              <p className="mt-3">{detail.flightAirline} · {detail.flightClass} · Direct</p>
            </div>
          </AccordionSection>

          <AccordionSection title="Your Stay">
            <div className="text-sm text-[#1B2D4F]/65 space-y-1.5">
              <p><span className="font-semibold text-[#1B2D4F]">Hotel:</span> {pkg.hotel}</p>
              <p><span className="font-semibold text-[#1B2D4F]">Room type:</span> {detail.hotelRoom}</p>
              <p><span className="font-semibold text-[#1B2D4F]">Duration:</span> {detail.hotelNights}</p>
            </div>
          </AccordionSection>

          <AccordionSection title="Your Transfer">
            <div className="text-sm text-[#1B2D4F]/65 space-y-1.5">
              <p><span className="font-semibold text-[#1B2D4F]">Vehicle:</span> {detail.transferVehicle}</p>
              <p><span className="font-semibold text-[#1B2D4F]">Route:</span> {detail.transferRoute}</p>
              <p><span className="font-semibold text-[#1B2D4F]">Journey time:</span> {detail.transferTime}</p>
            </div>
          </AccordionSection>

          <AccordionSection title="What's Included">
            <ul className="space-y-2">
              {detail.included.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-[#1B2D4F]/65">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </AccordionSection>
        </div>

        {/* RIGHT — Sticky booking card */}
        <div className="lg:w-[380px] flex-shrink-0">
          <div className="lg:sticky lg:top-24">
            <PackageBookingCard detail={detail} grandTotal={grandTotal} />
          </div>
        </div>
      </div>

      {/* More packages */}
      {related.length > 0 && (
        <section className="mt-16 pt-10 border-t border-[#1B2D4F]/8">
          <h2 className="font-playfair text-2xl font-bold text-[#1B2D4F] mb-6">More Packages</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {related.map(p => (
              <Link
                key={p.id}
                href={`/packages/${toSlug(p.name)}`}
                className="group bg-white rounded-2xl overflow-hidden border border-[#1B2D4F]/6
                           shadow-[0_2px_16px_rgba(0,0,0,0.06)]
                           hover:shadow-[0_8px_32px_rgba(27,45,79,0.13)]
                           transition-all duration-300 flex flex-col"
              >
                <div className="relative h-40 overflow-hidden flex-shrink-0">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className="absolute top-3 right-3 bg-[#C9A96E] text-[#1B2D4F] text-xs font-bold px-3 py-1 rounded-full">
                    {p.nights} nights
                  </span>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <p className="text-[#1B2D4F] font-bold text-sm leading-tight mb-1">{p.name}</p>
                  <p className="text-[#1B2D4F]/45 text-xs mb-3 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />{p.route}
                  </p>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-[#1B2D4F] font-bold text-sm">
                      ${p.price.toLocaleString()}<span className="text-[#1B2D4F]/40 font-normal text-xs"> total</span>
                    </span>
                    <span className="text-[#C9A96E] text-xs font-bold">View →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

// ─── Shared sub-components ────────────────────────────────────────────────────

function BreakdownCard({ icon, title, lines }: { icon: React.ReactNode; title: string; lines: string[] }) {
  return (
    <div className="bg-white rounded-2xl border border-[#1B2D4F]/8 shadow-[0_2px_12px_rgba(27,45,79,0.06)] p-5">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[#C9A96E]">{icon}</span>
        <p className="text-[#1B2D4F] font-bold text-sm">{title}</p>
      </div>
      <div className="space-y-1">
        {lines.map((l, i) => (
          <p key={i} className={`text-xs ${i === 0 ? 'text-[#1B2D4F] font-semibold' : 'text-[#1B2D4F]/50'}`}>
            {l}
          </p>
        ))}
      </div>
    </div>
  );
}

function AccordionSection({ title, children, defaultOpen = false }: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white rounded-2xl border border-[#1B2D4F]/8 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer
                   hover:bg-[#F5F5F0]/50 transition-colors duration-150"
      >
        <span className="text-[#1B2D4F] font-semibold text-sm">{title}</span>
        {open
          ? <ChevronUp className="w-4 h-4 text-[#1B2D4F]/40" />
          : <ChevronDown className="w-4 h-4 text-[#1B2D4F]/40" />}
      </button>
      {open && (
        <div className="px-5 pb-5 border-t border-[#1B2D4F]/6 pt-4">
          {children}
        </div>
      )}
    </div>
  );
}

function PackageBookingCard({ detail, grandTotal }: {
  detail: PackageDetail;
  grandTotal: number;
}) {
  const [travellers, setTravellers] = useState(2);

  return (
    <div className="bg-white rounded-2xl border border-[#1B2D4F]/8 shadow-[0_4px_32px_rgba(27,45,79,0.12)] p-6">
      <div className="mb-5">
        <span className="text-[#1B2D4F] font-bold text-3xl">${grandTotal.toLocaleString()}</span>
        <span className="text-[#1B2D4F]/45 text-sm ml-1.5">total package</span>
      </div>

      {/* Itemised breakdown */}
      <div className="bg-[#F5F5F0] rounded-xl px-4 py-3 mb-4 space-y-2.5">
        <LineItem label={`Flights (${detail.flightClass})`} value={detail.flightCost} />
        <LineItem label={`Hotel (${detail.hotelNights})`}   value={detail.hotelCost} />
        <LineItem label="Private Transfer"                  value={detail.transferCost} />
        {detail.discount > 0 && (
          <LineItem label="Package Saving" value={-detail.discount} isDiscount />
        )}
        <div className="border-t border-[#1B2D4F]/10 pt-2.5 flex items-center justify-between">
          <span className="text-[#1B2D4F] font-bold text-sm">Total</span>
          <span className="text-[#1B2D4F] font-bold text-base">${grandTotal.toLocaleString()}</span>
        </div>
      </div>

      {/* Traveller counter */}
      <div className="bg-[#F5F5F0] rounded-xl px-4 py-3 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#C9A96E]" />
            <p className="text-[#1B2D4F] text-sm font-semibold">Travellers</p>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setTravellers(Math.max(1, travellers - 1))}
              disabled={travellers <= 1}
              className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center
                         text-[#1B2D4F]/50 hover:border-[#C9A96E] hover:text-[#C9A96E]
                         disabled:opacity-25 disabled:cursor-not-allowed transition-all cursor-pointer text-sm font-bold"
            >
              −
            </button>
            <span className="text-[#1B2D4F] font-bold text-sm w-4 text-center">{travellers}</span>
            <button
              onClick={() => setTravellers(Math.min(8, travellers + 1))}
              disabled={travellers >= 8}
              className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center
                         text-[#1B2D4F]/50 hover:border-[#C9A96E] hover:text-[#C9A96E]
                         disabled:opacity-25 disabled:cursor-not-allowed transition-all cursor-pointer text-sm font-bold"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <button className="w-full bg-[#C9A96E] hover:bg-[#b8944f] text-[#1B2D4F] font-bold
                         py-3.5 rounded-xl transition-colors duration-200 cursor-pointer text-sm tracking-wide">
        Book Package — ${(grandTotal * travellers).toLocaleString()}
      </button>

      <div className="flex items-center gap-1.5 mt-3 justify-center">
        <Clock className="w-3.5 h-3.5 text-[#1B2D4F]/30" />
        <p className="text-center text-[#1B2D4F]/35 text-xs">
          Free cancellation up to 72h before departure
        </p>
      </div>
    </div>
  );
}

function LineItem({ label, value, isDiscount = false }: {
  label: string;
  value: number;
  isDiscount?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[#1B2D4F]/55 text-xs">{label}</span>
      <span className={`text-xs font-semibold ${isDiscount ? 'text-emerald-600' : 'text-[#1B2D4F]'}`}>
        {isDiscount ? `−$${Math.abs(value).toLocaleString()}` : `$${value.toLocaleString()}`}
      </span>
    </div>
  );
}
