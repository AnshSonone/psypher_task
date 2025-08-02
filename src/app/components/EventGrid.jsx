'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import EventCard from './EventCard'
import LoadingSpinner from './LoadingSpinner'
import TierUpgrade from './TierUpgrade'
import { AlertCircle, Calendar } from 'lucide-react'

export default function EventGrid() {
  const { user } = useUser()
  const [events, setEvents] = useState([])
  const [lockedEvents, setLockedEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [userTier, setUserTier] = useState('free')

  const fetchEvents = async (tier) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/events?tier=${tier}`)
      if (!response.ok) {
        throw new Error('Failed to fetch events')
      }
      
      const data = await response.json()
      setEvents(data.events)
      setLockedEvents(data.lockedEvents)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      const tier = (user.publicMetadata?.tier) || 'free'
      setUserTier(tier)
      fetchEvents(tier)
    }
  }, [user])

  const handleTierChange = (newTier) => {
    setUserTier(newTier)
    fetchEvents(newTier)
  }

  const handleUpgrade = () => {
    document.getElementById('tier-upgrade')?.scrollIntoView({ 
      behavior: 'smooth' 
    })
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="h-8 bg-slate-200 dark:bg-slate-700 skeleton w-48 mb-4"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-700 skeleton w-64"></div>
        </div>
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-8">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <p className="text-red-700 dark:text-red-400">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
          Your Events
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Discover events available for your <span className="font-semibold capitalize text-indigo-600 dark:text-indigo-400">{userTier}</span> tier membership
        </p>
      </div>

      {/* Tier Upgrade Section */}
      <div id="tier-upgrade">
        <TierUpgrade currentTier={userTier} onTierChange={handleTierChange} />
      </div>

      {/* Available Events */}
      {events.length > 0 ? (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">
            Available Events ({events.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-8 text-center mb-12">
          <Calendar className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
            No events available
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            There are currently no events available for your tier level.
          </p>
        </div>
      )}

      {/* Locked Events (Premium Teasers) */}
      {lockedEvents.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-2">
            Premium Events
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            Upgrade your tier to unlock these exclusive events
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lockedEvents.map((event) => (
              <EventCard 
                key={event.id} 
                event={event} 
                isLocked={true}
                onUpgrade={handleUpgrade}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}