import { NextRequest } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { data, error } = await supabase
      .from('hotels')
      .select('*')
      .eq('id', params.id)
      .maybeSingle()

    if (error) throw error
    if (!data) return Response.json({ error: 'Hotel not found' }, { status: 404 })

    return Response.json({ data })
  } catch {
    return Response.json({ error: 'Failed to fetch hotel' }, { status: 500 })
  }
}
