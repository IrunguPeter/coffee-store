/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
        display: ['"IM Fell English SC"', 'Georgia', 'serif'],
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        coffee: {
          dark: '#2b1810',
          DEFAULT: '#5d4037',
          light: '#8d6e63',
          pale: '#d7ccc8',
        },
        cream: '#fffbf5',
        'cream-soft': '#f5ebe0',
        'cream-paper': '#f1e8d9',
        amber: '#f59e0b',
        'amber-dark': '#b45309',
        ink: '#1a1a1a',
        soft: '#6b7280',
        line: '#e7d5c5',
        success: '#16a34a',
        error: '#b91c1c',
      },
      boxShadow: {
        'fold': '0 18px 36px -24px rgba(43, 24, 16, 0.30)',
        'lift': '0 28px 54px -28px rgba(43, 24, 16, 0.35)',
        'sm': '0 8px 16px -12px rgba(43, 24, 16, 0.25)',
      },
      borderRadius: {
        'sm': '8px',
        'md': '14px',
        'lg': '22px',
        'pill': '999px',
      },
      spacing: {
        'section': 'clamp(76px, 10vw, 140px)',
        'gutter': '24px',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
