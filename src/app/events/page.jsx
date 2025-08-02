"use client"

import { useUser, UserButton, } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import EventGrid from '@/app/components/EventGrid'
import { Calendar } from 'lucide-react'

export default  function EventsPage() {
  const { user } = useUser()
  
  if (!user?.id) {
    redirect('/sign-in')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-8 h-8 text-indigo-600" />
                <span className="text-xl font-bold text-slate-900 dark:text-white">
                  EventTier
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                <span>Welcome back!</span>
              </div>
              <UserButton 
                fallbackRedirectUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10"
                  }
                }}
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <EventGrid />
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-slate-600 dark:text-slate-400">
            <p>&copy; 2025 EventTier. Built for Psypher AI challenge.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}