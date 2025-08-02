import { NextResponse } from 'next/server'
import { supabase } from '@/app/lib/supabase'

export async function GET() {
  try {
    console.log('Testing Supabase connection...')
    
    
    const { data, error } = await supabase
      .from('events')
      .select('*')

    if (error) {
      console.error('Supabase connection error:', error)
      return NextResponse.json({
        success: false,
        error: error.message,
        hint: error.hint,
        details: error.details,
        code: error.code
      })
    }

    
    const tierCounts = data?.reduce((acc, event) => {
      acc[event.tier] = (acc[event.tier] || 0) + 1
      return acc
    }, {}) || {}

    return NextResponse.json({
      success: true,
      message: 'Supabase connection working',
      totalEvents: data?.length || 0,
      eventsByTier: tierCounts,
      sampleEvents: data?.slice(0, 2) || [],
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Missing',
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Missing',
      tableExists: data !== null,
      needsData: (data?.length || 0) === 0
    })
  } catch (error) {
    console.error('Test API error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    })
  }
}