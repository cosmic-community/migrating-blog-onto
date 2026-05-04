/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      },
      colors: {
        brand: {
          DEFAULT: '#1a1a1a',
          accent: '#dc2626',
        }
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}