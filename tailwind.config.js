/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Plus Jakarta Sans"', 'Georgia', 'serif'],
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        // Zawadi Crafts & Harvest design system
        safari: {
          dark: '#164607',
          DEFAULT: '#2E5E1E',
          light: '#9ed587',
          pale: '#b9f2a0',
        },
        'savanna-honey': '#F59E0B',
        'savanna-honey-dim': '#855300',
        terracotta: '#C25E34',
        'cream': '#FCF9F8',
        'cream-low': '#f6f3f2',
        'cream-container': '#f0eded',
        'ink': '#1B1C1C',
        'ink-variant': '#42493d',
        'outline': '#72796c',
        'outline-variant': '#c2c9b9',
        'mpesa': '#00B04F',
        success: '#164607',
        error: '#ba1a1a',
      },
      boxShadow: {
        'card': '0 2px 8px rgba(46, 94, 30, 0.04)',
        'lift': '0 8px 24px rgba(38, 38, 38, 0.08)',
      },
      borderWidth: {
        '1.5': '1.5px',
      },
      borderRadius: {
        'sm': '0.25rem',
        'md': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
        'full': '9999px',
      },
      letterSpacing: {
        'tight': '-0.02em',
        'wider': '0.02em',
        'widest': '0.04em',
      },
      spacing: {
        'gutter': '1rem',
        'margin': '1rem',
        'space-xs': '0.25rem',
        'space-sm': '0.5rem',
        'space-md': '1rem',
        'space-lg': '1.5rem',
        'space-xl': '2.5rem',
        'section': 'clamp(76px, 10vw, 140px)',
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
