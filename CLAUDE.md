# Orbis — Travel Website

## Project Overview
Luxury travel platform for wealthy German travelers. Built with Next.js 14, Tailwind CSS, TypeScript.

## Brand
- Name: Orbis
- Tagline: "Travel Beyond the Ordinary"
- Colors: Gold #C9A96E, Navy #1B2D4F, White/Off-white backgrounds
- Design: Airbnb layout + Apple minimalism, luxury feel

## Pages Built
- / → Homepage (hero, search bar, destinations, stays, why orbis, deals, footer)
- /search → Search results (filters, hotel/flight/package cards)
- /stays/[id] → Hotel detail page
- /flights/[id] → Flight detail page
- /packages/[id] → Package detail page

## Key Files
- lib/data.ts → All fake data (hotels, flights, packages)
- components/Navbar.tsx → Shared navbar
- components/Footer.tsx → Shared footer
- components/SearchBar.tsx → 3-field search with autocomplete
- components/search/SearchPageClient.tsx → Search results + filters
- app/stays/[id]/page.tsx → Hotel detail
- app/flights/[id]/page.tsx → Flight detail
- app/packages/[id]/page.tsx → Package detail

## Rules
- NEVER break existing pages when adding new ones
- All data comes from lib/data.ts — never duplicate data
- Always use gold #C9A96E for CTAs and navy #1B2D4F for primary text
- All pages must include Navbar and Footer
- Mobile responsive always
- Do NOT rewrite files that don't need changes

## Current Status
Phase 5 complete. Next: Phase 6 (SEO + Performance).

## Phase 4 — Completed
- Supabase project connected (lib/supabase.ts, .env.local)
- Database schema created (lib/schema.sql): hotels, flights, packages, users, bookings, saved_items
- API routes built: GET /api/hotels, /api/flights, /api/packages (with filters) + /[id] variants
- Seed route: POST /api/seed — all 54 hotels, 17 flights, 10 packages live in Supabase
- Frontend connected: SearchPageClient fetches from API, stays/[id] reads live price/rating, FeaturedStays fetches top 4 hotels

## Phase 5 — Completed
- Auth: login, signup, signout pages (Supabase Auth via @supabase/ssr)
- lib/supabase-server.ts: server-side Supabase client using cookies
- Navbar: shows user email + Dashboard link + Sign Out when logged in
- Checkout flow: app/checkout/[type]/[id]/page.tsx — auth-gated, booking summary, fake payment form, inserts into bookings table
- Booking confirmed: app/booking-confirmed/page.tsx — success page with booking reference
- Dashboard: app/dashboard/page.tsx — My Bookings tab + My Wishlist tab, data from Supabase
- Heart/save button: on search result cards (StayCard, FlightCard, PackageCard) and stays detail page — saves to saved_items table
- Supabase RLS enabled on bookings and saved_items tables

## Phase 6 — Completed
- app/layout.tsx: updated title, description, Open Graph tags, Twitter card
- app/search/page.tsx: added description to metadata
- app/stays/[id]/page.tsx: added generateMetadata() for dynamic "[Hotel Name] — Orbis Luxury Stays" title; replaced <img> with Next.js <Image fill> in "You May Also Like" section
- app/auth/login/layout.tsx: created server layout exporting "Sign In — Orbis" metadata (page is 'use client')
- app/dashboard/layout.tsx: created server layout exporting "My Dashboard — Orbis" metadata
- app/sitemap.ts: static routes (/, /search, /auth/login, /auth/signup) + dynamic /stays/[id] from Supabase with local fallback
- app/robots.ts: allow all, disallow /dashboard /checkout /auth, sitemap URL included
- app/search/loading.tsx: 6-card skeleton grid
- app/stays/[id]/loading.tsx: hero + content skeleton matching detail page layout

## Phase 7 — Next: Deploy to Vercel
