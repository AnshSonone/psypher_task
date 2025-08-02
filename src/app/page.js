"use client"

import { SignInButton, SignUpButton, useAuth} from '@clerk/nextjs'
import { redirect, useRouter } from 'next/navigation'
import { Calendar, Users, Star, Crown } from 'lucide-react'
import { useEffect } from 'react'

export default function HomePage() {

  const { userId } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (userId) {
      router.push('/events')
    }
  }, [userId, router])

  return (
    <div className="min-h-screen flex flex-col bg-violet-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        <div className="absolute inset-0 opacity-90 bg-black"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
            Exclusive Events,
            <span className="bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent"> Your Tier</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto">
            Discover premium events tailored to your membership level — from community meetups to executive summits.
          </p>
          {!userId && <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <SignUpButton mode="modal">
              <button className="px-8 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition">
                Get Started
              </button>
            </SignUpButton>
            <SignInButton mode="modal" fallbackRedirectUrl='/events'>
              <button className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition">
                Sign In
              </button>
            </SignInButton>
          </div>}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              Membership Tiers
            </h2>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
              Each tier unlocks access to more exclusive events
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Tier Card Template */}
            {[
              {
                icon: <Users className="w-6 h-6 text-white" />,
                color: 'green',
                title: 'Free',
                subtitle: 'Community Events',
                desc: 'Access to basic workshops and community meetups',
              },
              {
                icon: <Calendar className="w-6 h-6 text-white" />,
                color: 'slate',
                title: 'Silver',
                subtitle: 'Tech Talks',
                desc: 'All Free events plus advanced workshops and tech talks',
              },
              {
                icon: <Star className="w-6 h-6 text-white" />,
                color: 'yellow',
                title: 'Gold',
                subtitle: 'VIP Access',
                desc: 'All previous events plus exclusive networking and masterclasses',
              },
              {
                icon: <Crown className="w-6 h-6 text-white" />,
                color: 'purple',
                title: 'Platinum',
                subtitle: 'Elite Access',
                desc: 'Everything included plus executive summits and innovation conferences',
              },
            ].map(({ icon, color, title, subtitle, desc }, idx) => (
              <div key={idx} className={`text-center p-6 rounded-2xl border shadow-sm dark:shadow-none  dark:bg-${color}-900/20 border-${color}-200 dark:border-${color}-800 transition-transform hover:scale-[1.02]`}>
                <div className={`inline-flex items-center justify-center w-12 h-12 bg-${color}-500 rounded-full mb-4`}>
                  {icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
                <p className={`text-slate-600 dark:text-slate-400 font-medium mb-2`}>{subtitle}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50 dark:bg-slate-800">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to discover your events?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Join thousands of professionals accessing tier-based exclusive events.
          </p>
          <SignUpButton mode="modal">
            <button className="px-8 py-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition">
              Start Your Journey
            </button>
          </SignUpButton>
        </div>
      </section>
    </div>
  )
}
