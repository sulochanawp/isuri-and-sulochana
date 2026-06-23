/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        olive: {
          50:  '#F2F5EC',
          100: '#E4EAD5',
          200: '#C8D3AC',
          300: '#A3B578',
          400: '#7A8C4E',
          500: '#5C6B3A',
          600: '#4A5C2A',
          700: '#3A4920',
          800: '#2B3B18',
          900: '#1C2710',
        },
        pearl: {
          50:  '#FDFCF8',
          100: '#F5F2EA',
          200: '#EDE9DC',
          300: '#DDD8C8',
          400: '#C8C2AD',
        },
        earth: '#7A5C2A',
        ink:   '#1C2710',
        muted: '#6B7057',
        line:  '#D5D9C8',
      },
      fontFamily: {
        serif: ['"EB Garamond"', 'Georgia', 'serif'],
        sans:  ['Lato', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        // Subtle repeating diamond grid — Kandyan textile reference
        'kandyan': `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%234A5C2A' stroke-width='0.4' opacity='0.18'%3E%3Cpath d='M20 2 L38 20 L20 38 L2 20 Z'/%3E%3Ccircle cx='20' cy='20' r='2' fill='%234A5C2A'/%3E%3C/g%3E%3C/svg%3E")`,
        'kandyan-light': `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23F5F2EA' stroke-width='0.4' opacity='0.12'%3E%3Cpath d='M20 2 L38 20 L20 38 L2 20 Z'/%3E%3Ccircle cx='20' cy='20' r='2' fill='%23F5F2EA'/%3E%3C/g%3E%3C/svg%3E")`,
      },
      animation: {
        'fade-up':  'fadeUp 0.9s ease-out both',
        'fade-in':  'fadeIn 1.2s ease-out both',
        'float':    'float 5s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
}
