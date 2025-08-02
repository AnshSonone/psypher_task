import Image from 'next/image'
import { Calendar, MapPin, Lock } from 'lucide-react'
import { Event } from '@/app/lib/supabase'
import TierBadge from './TierBadge'

export default function EventCard({ event, isLocked = false, onUpgrade }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return {
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      time: date.toLocaleDateString('en-US', { hour: '2-digit', minute: '2-digit' })
    }
  }

  const { day, date, time } = formatDate(event.event_date)

  return (
    <div className={`bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden card-hover ${isLocked ? 'opacity-75' : ''}`}>
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600">
        {event.image_url ? (
          <Image
            src={event.image_url}
            alt={event.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <Calendar className="w-12 h-12 text-slate-400" />
          </div>
        )}
        
        {/* Lock overlay for locked events */}
        {isLocked && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
              <Lock className="w-6 h-6 text-slate-600" />
            </div>
          </div>
        )}

        <div className="absolute top-3 right-3">
          <TierBadge tier={event.tier} />
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-3">
          <Calendar className="w-4 h-4" />
          <span>{day}, {date} • {time}</span>
        </div>

        <h3 className={`text-xl font-semibold mb-3 ${isLocked ? 'text-slate-500' : 'text-slate-900 dark:text-white'}`}>
          {event.title}
        </h3>
        <p className={`text-sm leading-relaxed mb-4 ${isLocked ? 'text-slate-400' : 'text-slate-600 dark:text-slate-300'}`}>
          {event.description}
        </p>

        {isLocked ? (
          <div className="space-y-3">
            <p className="text-sm text-amber-600 dark:text-amber-400 font-medium">
              🔒 Upgrade to {event.tier} to access this event
            </p>
            <button
              onClick={onUpgrade}
              className="w-full py-2 px-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-medium rounded-lg transition-all duration-200"
            >
              Upgrade Now
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-200">
              Learn More
            </button>
            <div className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
              <MapPin className="w-4 h-4" />
              <span>Virtual</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}