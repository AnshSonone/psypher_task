"use client"

import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { Crown, Loader2 } from 'lucide-react'

const tiers = ['free', 'silver', 'gold', 'platinum']

export default function TierUpgrade({ currentTier, onTierChange }) {
  const { user } = useUser()
  const [isUpgrading, setIsUpgrading] = useState(false)
  
  const handleUpgrade = async (newTier) => {
    if (!user || isUpgrading) return

    setIsUpgrading(true)
    try {
      await user.update({
        publicMetadata: {
          ...user.publicMetadata,
          tier: newTier,
        },
      })
      onTierChange(newTier)
    } catch (error) {
      console.error('Failed to upgrade tier:', error)
    } finally {
      setIsUpgrading(false)
    }
  }

  const getTierColor = (tier) => {
    switch (tier) {
      case 'free':
        return 'from-green-500 to-green-600'
      case 'silver':
        return 'from-slate-400 to-slate-500'
      case 'gold':
        return 'from-yellow-500 to-yellow-600'
      case 'platinum':
        return 'from-purple-500 to-purple-600'
    }
  }

  const getTierPrice = (tier) => {
    switch (tier) {
      case 'free':
        return '$0'
      case 'silver':
        return '$9'
      case 'gold':
        return '$19'
      case 'platinum':
        return '$39'
    }
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <Crown className="w-6 h-6 text-amber-500" />
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
          Upgrade Your Tier
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {tiers.map((tier) => {
          const isCurrentTier = tier === currentTier
          const canUpgrade = tiers.indexOf(tier) > tiers.indexOf(currentTier)

          return (
            <div
              key={tier}
              className={`relative p-4 rounded-lg border-2 transition-all duration-200 ${
                isCurrentTier
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                  : canUpgrade
                  ? 'border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 cursor-pointer'
                  : 'border-slate-200 dark:border-slate-600 opacity-50'
              }`}
              onClick={() => canUpgrade && !isUpgrading && handleUpgrade(tier)}
            >
              {isCurrentTier && (
                <div className="absolute -top-2 -right-2 bg-indigo-500 text-white text-xs px-2 py-1 rounded-full">
                  Current
                </div>
              )}

              <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${getTierColor(tier)} mb-3`}></div>
              
              <h3 className="font-semibold text-slate-900 dark:text-white capitalize mb-1">
                {tier}
              </h3>
              
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                {getTierPrice(tier)}/month
              </p>

              {canUpgrade && (
                <button
                  disabled={isUpgrading}
                  className="w-full py-2 px-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 disabled:opacity-50 text-white text-sm font-medium rounded transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {isUpgrading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    'Upgrade'
                  )}
                </button>
              )}
            </div>
          )
        })}
      </div>

      <p className="text-sm text-slate-500 dark:text-slate-400 mt-4 text-center">
        * This is a demo. Tier changes are temporary and for testing purposes only.
      </p>
    </div>
  )
}