/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',       
  ],
  theme: {
    extend: {
      colors: {
        tier: {
          free: '#22c55e',
          silver: '#94a3b8',
          gold: '#fbbf24',
          platinum: '#8b5cf6',
        }
      },
      animation: {
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}