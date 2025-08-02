import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const tierHierarchy = {
  free: 0,
  silver: 1,
  gold: 2,
  platinum: 3,
}

export const getTierColor = (tier) => {
  const colors = {
    free: 'bg-green-500',
    silver: 'bg-slate-400',
    gold: 'bg-yellow-500',
    platinum: 'bg-purple-500',
  }
  return colors[tier]
}

export const getTierTextColor = (tier) => {
  const colors = {
    free: 'text-green-500',
    silver: 'text-slate-400',
    gold: 'text-yellow-500',
    platinum: 'text-purple-500',
  }
  return colors[tier]
}