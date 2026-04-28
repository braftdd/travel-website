import { notFound } from 'next/navigation';
import { Plane, Clock, Luggage, Wifi, Utensils, MonitorPlay, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FlightBookingCard from '@/components/flights/FlightBookingCard';
import { flights } from '@/lib/searchData';
import { flightSlug } from '@/lib/utils';
import { getFlightDetail } from '@/lib/detailData';

export function generateStaticParams() {
  return flights.map(f => ({
    id: flightSlug(f.airline, f.fromCode, f.toCode, f.flightClass),
  }));
}

const classBadgeStyle: Record<string, string> = {
  Economy: 'bg-gray-100 text-gray-600',
  Business: 'bg-[#1B2D4F]/8 text-[#1B2D4F]',
  First:    'bg-[#C9A96E]/12 text-[#b8944f]',
};

export default function FlightDetailPage({ params }: { params: { id: string } }) {
  const flight = flights.find(
    f => flightSlug(f.airline, f.fromCode, f.toCode, f.flightClass) === params.id
  );
  if (!flight) notFound();

  const detail = getFlightDetail(flight);

  return (
    <>
      <Navbar />

      {/* Hero banner */}
      <div className="pt-16 bg-[#1B2D4F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${classBadgeStyle[flight.flightClass]}`}>
              {flight.flightClass}
            </span>
            <span className="text-white/40 text-sm">Direct Flight</span>
          </div>
          <h1 className="font-playfair text-3xl sm:text-4xl font-bold text-white mb-2">
            {flight.from} to {flight.to}
          </h1>
          <p className="text-white/50 text-sm">{flight.airline} · {flight.duration}</p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pb-24 lg:pb-16 mt-10">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* LEFT COLUMN */}
          <div className="flex-1 min-w-0">

            {/* Flight timeline */}
            <section className="bg-white rounded-2xl border border-[#1B2D4F]/8 shadow-[0_4px_24px_rgba(27,45,79,0.08)] p-6 mb-6">
              <h2 className="text-[#1B2D4F] font-bold text-lg mb-6">Flight Route</h2>
              <div className="flex items-center gap-4">
                {/* Departure */}
                <div className="flex flex-col items-center text-center min-w-[90px]">
                  <p className="text-[#1B2D4F] font-bold text-3xl leading-none">{detail.departureTime}</p>
                  <p className="text-[#1B2D4F] font-bold text-xl mt-1">{flight.fromCode}</p>
                  <p className="text-[#1B2D4F]/45 text-xs mt-1">{flight.from}</p>
                  <p className="text-[#1B2D4F]/35 text-[10px] mt-0.5">{detail.departureTerm}</p>
                </div>

                {/* Timeline line */}
                <div className="flex-1 flex flex-col items-center gap-1.5">
                  <p className="text-[#1B2D4F]/50 text-xs font-medium flex items-center gap-1.5">
                    <Clock className="w-3 h-3" />
                    {flight.duration}
                  </p>
                  <div className="w-full flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-[#C9A96E] flex-shrink-0" />
                    <div className="flex-1 h-px border-t-2 border-dashed border-[#C9A96E]/50" />
                    <Plane className="w-5 h-5 text-[#C9A96E] flex-shrink-0" fill="currentColor" strokeWidth={0} />
                    <div className="flex-1 h-px border-t-2 border-dashed border-[#C9A96E]/50" />
                    <div className="w-2 h-2 rounded-full bg-[#C9A96E] flex-shrink-0" />
                  </div>
                  <p className="text-[#1B2D4F]/30 text-[10px]">Direct · No stops</p>
                </div>

                {/* Arrival */}
                <div className="flex flex-col items-center text-center min-w-[90px]">
                  <p className="text-[#1B2D4F] font-bold text-3xl leading-none">{detail.arrivalTime}</p>
                  <p className="text-[#1B2D4F] font-bold text-xl mt-1">{flight.toCode}</p>
                  <p className="text-[#1B2D4F]/45 text-xs mt-1">{flight.to}</p>
                  <p className="text-[#1B2D4F]/35 text-[10px] mt-0.5">{detail.arrivalTerm}</p>
                </div>
              </div>
            </section>

            {/* Flight details */}
            <section className="bg-white rounded-2xl border border-[#1B2D4F]/8 shadow-[0_4px_24px_rgba(27,45,79,0.08)] p-6 mb-6">
              <h2 className="text-[#1B2D4F] font-bold text-lg mb-5">Flight Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DetailRow icon={<Plane className="w-4 h-4" />}     label="Aircraft"      value={detail.aircraft} />
                <DetailRow icon={<Clock className="w-4 h-4" />}     label="Duration"      value={flight.duration} />
                <DetailRow icon={<Luggage className="w-4 h-4" />}   label="Baggage"       value={detail.baggage} />
                <DetailRow icon={<MonitorPlay className="w-4 h-4" />} label="Seat"        value={detail.seatPitch} />
              </div>

              {/* In-flight amenities */}
              <div className="mt-5 pt-5 border-t border-[#1B2D4F]/6">
                <p className="text-[#1B2D4F]/50 text-xs font-bold uppercase tracking-[0.15em] mb-3">
                  In-flight amenities
                </p>
                <div className="flex flex-wrap gap-2">
                  {detail.amenities.map(a => (
                    <span key={a}
                      className="flex items-center gap-1.5 text-xs font-semibold text-[#1B2D4F]/65
                                 bg-[#F5F5F0] px-3 py-1.5 rounded-full">
                      {a.toLowerCase().includes('wi-fi') ? <Wifi className="w-3 h-3 text-[#C9A96E]" /> :
                       a.toLowerCase().includes('meal') || a.toLowerCase().includes('dining') ? <Utensils className="w-3 h-3 text-[#C9A96E]" /> :
                       <CheckCircle2 className="w-3 h-3 text-[#C9A96E]" />}
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* Fare rules */}
            <section className="bg-white rounded-2xl border border-[#1B2D4F]/8 shadow-[0_4px_24px_rgba(27,45,79,0.08)] p-6 mb-6">
              <h2 className="text-[#1B2D4F] font-bold text-lg mb-5">Fare Rules</h2>
              <div className="space-y-4">
                <FareRule
                  label="Cancellation"
                  value={detail.cancellation}
                  icon={detail.cancellation.toLowerCase().includes('non') ? 'bad' : 'good'}
                />
                <FareRule
                  label="Change Fee"
                  value={detail.changeFee}
                  icon={detail.changeFee.toLowerCase().includes('free') ? 'good' : 'warn'}
                />
                <FareRule
                  label="Refund Policy"
                  value={detail.refund}
                  icon={detail.refund.toLowerCase().includes('full') ? 'good' : detail.refund.toLowerCase().includes('credit') ? 'warn' : 'bad'}
                />
              </div>
            </section>

            {/* Hotel upsell */}
            <section className="rounded-2xl bg-gradient-to-br from-[#1B2D4F] to-[#2a4070] p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-[#C9A96E] text-xs font-bold uppercase tracking-[0.15em] mb-2">
                    Complete Your Trip
                  </p>
                  <h3 className="text-white font-bold text-xl mb-2">
                    Add a hotel in {flight.to}
                  </h3>
                  <p className="text-white/55 text-sm leading-relaxed mb-4">
                    Bundle your flight with a curated selection of luxury stays in {flight.to} and save up to 20%.
                  </p>
                  <a
                    href={`/search?destination=${encodeURIComponent(flight.to)}&type=stay`}
                    className="inline-block bg-[#C9A96E] hover:bg-[#b8944f] text-[#1B2D4F] font-bold
                               px-5 py-2.5 rounded-xl transition-colors duration-200 text-sm"
                  >
                    Browse Hotels →
                  </a>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN — sticky booking card */}
          <div className="lg:w-[360px] flex-shrink-0">
            <div className="lg:sticky lg:top-24">
              <FlightBookingCard
                price={flight.price}
                flightClass={flight.flightClass}
                from={flight.fromCode}
                to={flight.toCode}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Mobile fixed bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white border-t border-gray-100
                      shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-4 py-3 z-40">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[#1B2D4F] font-bold text-xl">${flight.price.toLocaleString()}</span>
            <span className="text-[#1B2D4F]/45 text-xs ml-1">/ person</span>
          </div>
          <button className="bg-[#C9A96E] hover:bg-[#b8944f] text-[#1B2D4F] font-bold
                             px-6 py-3 rounded-xl transition-colors duration-200 text-sm">
            Select Flight
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}

function DetailRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-[#C9A96E] mt-0.5 flex-shrink-0">{icon}</span>
      <div>
        <p className="text-[#1B2D4F]/45 text-[10px] font-bold uppercase tracking-[0.12em]">{label}</p>
        <p className="text-[#1B2D4F] text-sm font-medium mt-0.5">{value}</p>
      </div>
    </div>
  );
}

function FareRule({ label, value, icon }: { label: string; value: string; icon: 'good' | 'warn' | 'bad' }) {
  const cfg = {
    good: { color: 'text-emerald-600', bg: 'bg-emerald-50', Icon: CheckCircle2 },
    warn: { color: 'text-amber-600',   bg: 'bg-amber-50',   Icon: AlertCircle },
    bad:  { color: 'text-red-500',     bg: 'bg-red-50',     Icon: XCircle },
  }[icon];
  return (
    <div className="flex items-start gap-3">
      <span className={`${cfg.color} mt-0.5 flex-shrink-0`}>
        <cfg.Icon className="w-4 h-4" />
      </span>
      <div>
        <p className="text-[#1B2D4F]/45 text-[10px] font-bold uppercase tracking-[0.12em]">{label}</p>
        <p className="text-[#1B2D4F] text-sm font-medium mt-0.5">{value}</p>
      </div>
    </div>
  );
}
