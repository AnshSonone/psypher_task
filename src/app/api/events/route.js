import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { supabase, tierHierarchy } from '@/app/lib/supabase'

export async function GET(request) {
  try {
    
    const {userId} = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }


    const { searchParams } = new URL(request.url)
    const userTier = (searchParams.get('tier')) || 'free'
    
    
    if (!tierHierarchy.hasOwnProperty(userTier)) {
      return NextResponse.json({ error: 'Invalid tier' }, { status: 400 })
    }
    
    
    const userTierLevel = tierHierarchy[userTier]
    

    const accessibleTiers = Object.entries(tierHierarchy)
      .filter(([_, level]) => level <= userTierLevel)
      .map(([tier, _]) => tier)

    const { data: events, error } = await supabase
      .from('events')
      .select('*')
      .in('tier', accessibleTiers)
      .order('event_date', { ascending: true })
    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch events', details: error.message }, 
        { status: 500 }
      )
    }

    console.log('Fetched events:', events?.length || 0)

    // Also fetch locked events (higher tier events)
    const lockedTiers = Object.entries(tierHierarchy)
      .filter(([_, level]) => level > userTierLevel)
      .map(([tier, _]) => tier)

    let lockedEvents = []
    if (lockedTiers.length > 0) {
      const { data: locked, error: lockedError } = await supabase
        .from('events')
        .select('*')
        .in('tier', lockedTiers)
        .order('event_date', { ascending: true })
        .limit(3) 

      if (!lockedError && locked) {
        lockedEvents = locked
      }
    }

    console.log('Locked events:', lockedEvents.length)

    return NextResponse.json({
      events: events || [],
      lockedEvents,
      userTier,
      debug: {
        userTierLevel,
        accessibleTiers,
        lockedTiers,
        totalEvents: (events?.length || 0) + lockedEvents.length
      }
    })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.stack : undefined) : undefined
      }, 
      { status: 500 }
    )
  }
}