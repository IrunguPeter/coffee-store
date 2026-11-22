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
        // E-shop design system (RGB values for opacity modifier support)
        safari: {
          dark: 'rgb(22 70 7)',
          DEFAULT: 'rgb(46 94 30)',
          light: 'rgb(158 213 135)',
          pale: 'rgb(185 242 160)',
        },
        'savanna-honey': 'rgb(245 158 11)',
        'savanna-honey-dim': 'rgb(133 83 0)',
        terracotta: 'rgb(194 94 52)',
        'cream': 'rgb(252 249 248)',
        'cream-low': 'rgb(246 243 242)',
        'cream-container': 'rgb(240 237 237)',
        'ink': 'rgb(27 28 28)',
        'ink-variant': 'rgb(66 73 61)',
        'soft': 'rgb(66 73 61)',
        'outline': 'rgb(114 121 108)',
        'outline-variant': 'rgb(194 201 185)',
        'line': 'rgb(194 201 185)',
        'mpesa': 'rgb(0 176 79)',
        success: 'rgb(22 70 7)',
        error: 'rgb(186 26 26)',
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
