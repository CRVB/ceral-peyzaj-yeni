/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2F5233', // Deep Forest Green
          light: '#4E7C54',
          dark: '#1A331D',
          50: '#F0F5F1',
          100: '#D9E7DB',
          200: '#B3CFB7',
          300: '#8DB793',
          400: '#679F6F',
          500: '#2F5233',
          600: '#264228',
          700: '#1D311E',
          800: '#142114',
          900: '#0B100A',
        },
        secondary: {
          DEFAULT: '#F9F9F9', // Off-white/Cream
          dark: '#E0E0E0',
          light: '#FEFEFE',
        },
        dark: {
          DEFAULT: '#121212', // Soft Black
          lighter: '#1E1E1E',
        },
        accent: {
          gold: '#D4AF37',
          sage: '#9CAF88',
          earth: '#8B7355',
        }
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        serif: ['DM Sans', 'serif'],
        display: ['Outfit', 'DM Sans', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
