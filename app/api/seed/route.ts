import { supabase } from '@/lib/supabase'
import { stays, flights, packages } from '@/lib/searchData'
import { getHotelDescription, getPackageDetail } from '@/lib/detailData'

const toSlug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

export async function POST() {
  try {
    // Check each table independently so partial seeds can be completed
    const [{ count: hotelCount }, { count: flightCount }, { count: packageCount }] =
      await Promise.all([
        supabase.from('hotels').select('*', { count: 'exact', head: true }),
        supabase.from('flights').select('*', { count: 'exact', head: true }),
        supabase.from('packages').select('*', { count: 'exact', head: true }),
      ])

    const results: Record<string, number | string> = {}

    // ── Hotels ──────────────────────────────────────────────────────────────
    if (!hotelCount) {
      const hotelRows = stays.map(stay => {
        const parts = stay.location.split(', ')
        const rawCountry = parts[parts.length - 1]
        const country = rawCountry === 'Hawaii' ? 'USA' : rawCountry
        return {
          id:              toSlug(stay.name),
          name:            stay.name,
          city:            stay.city,
          country,
          price_per_night: stay.price,
          rating:          stay.rating,
          amenities:       stay.amenities,
          image_url:       stay.image,
          description:     getHotelDescription(stay),
        }
      })
      const { error } = await supabase.from('hotels').insert(hotelRows)
      if (error) throw error
      results.hotels = hotelRows.length
    } else {
      results.hotels = `skipped (${hotelCount} exist)`
    }

    // ── Flights ─────────────────────────────────────────────────────────────
    if (!flightCount) {
      const flightRows = flights.map(f => ({
        id:             toSlug(`${f.airline} ${f.fromCode} ${f.toCode} ${f.flightClass}`),
        origin:         f.from,
        destination:    f.to,
        airline:        f.airline,
        duration:       f.duration,
        class:          f.flightClass,
        price:          f.price,
        departure_date: null,
      }))
      const { error } = await supabase.from('flights').insert(flightRows)
      if (error) throw error
      results.flights = flightRows.length
    } else {
      results.flights = `skipped (${flightCount} exist)`
    }

    // ── Packages ─────────────────────────────────────────────────────────────
    if (!packageCount) {
      const stayByName = new Map(stays.map(s => [s.name, s]))
      const packageRows = packages.map(pkg => {
        const linkedStay = stayByName.get(pkg.hotel)
        const detail = getPackageDetail(pkg)
        return {
          id:          toSlug(pkg.name),
          name:        pkg.name,
          hotel_id:    linkedStay ? toSlug(linkedStay.name) : null,
          flight_id:   null,
          total_price: pkg.price,
          discount:    detail.discount,
          nights:      pkg.nights,
          destination: linkedStay?.city ?? pkg.destination,
        }
      })
      const { error } = await supabase.from('packages').insert(packageRows)
      if (error) throw error
      results.packages = packageRows.length
    } else {
      results.packages = `skipped (${packageCount} exist)`
    }

    return Response.json({ message: 'Seed complete', results })
  } catch (error) {
    console.error('Seed error:', error)
    const msg = error instanceof Error ? error.message : JSON.stringify(error)
    return Response.json({ error: 'Seed failed', details: msg }, { status: 500 })
  }
}
