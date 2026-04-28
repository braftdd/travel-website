import { NextRequest } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const city     = searchParams.get('city')
    const country  = searchParams.get('country')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const rating   = searchParams.get('rating')

    let query = supabase.from('hotels').select('*')

    if (city)     query = query.eq('city', city)
    if (country)  query = query.eq('country', country)
    if (minPrice) query = query.gte('price_per_night', Number(minPrice))
    if (maxPrice) query = query.lte('price_per_night', Number(maxPrice))
    if (rating)   query = query.eq('rating', Number(rating))

    const { data, error } = await query
    if (error) throw error

    return Response.json({ data })
  } catch {
    return Response.json({ error: 'Failed to fetch hotels' }, { status: 500 })
  }
}
