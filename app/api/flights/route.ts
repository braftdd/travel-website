import { NextRequest } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const origin      = searchParams.get('origin')
    const destination = searchParams.get('destination')
    const flightClass = searchParams.get('class')

    let query = supabase.from('flights').select('*')

    if (origin)      query = query.eq('origin', origin)
    if (destination) query = query.eq('destination', destination)
    if (flightClass) query = query.eq('class', flightClass)

    const { data, error } = await query
    if (error) throw error

    return Response.json({ data })
  } catch {
    return Response.json({ error: 'Failed to fetch flights' }, { status: 500 })
  }
}
