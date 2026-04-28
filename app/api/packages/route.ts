import { NextRequest } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const destination = searchParams.get('destination')

    let query = supabase.from('packages').select('*')

    if (destination) query = query.eq('destination', destination)

    const { data, error } = await query
    if (error) throw error

    return Response.json({ data })
  } catch {
    return Response.json({ error: 'Failed to fetch packages' }, { status: 500 })
  }
}
