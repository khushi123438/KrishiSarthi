/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#176B45',      // Primary Forest Green
          deep: '#104B32',         // Deep Forest Green
          dark: '#0D3D28',
          light: '#238959',
        },
        sage: {
          soft: '#F0F7F0',         // Soft Green Background
          DEFAULT: '#E3F0E5',      // Sage Green Background sections
          border: '#C8E1CC',
          dark: '#B0D3B6',
        },
        charcoal: {
          DEFAULT: '#1F2937',
          dark: '#111827',
          light: '#4B5563',
          muted: '#6B7280',
        },
        krishiGold: {
          DEFAULT: '#D97706',
          light: '#FEF3C7',
          dark: '#B45309',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', '"Noto Sans Devanagari"', 'sans-serif'],
        hindi: ['"Noto Sans Devanagari"', 'sans-serif'],
      },
      boxShadow: {
        subtle: '0 2px 8px rgba(16, 75, 50, 0.04)',
        card: '0 4px 20px rgba(16, 75, 50, 0.06)',
        elevated: '0 12px 32px rgba(16, 75, 50, 0.12)',
      }
    },
  },
  plugins: [],
}
