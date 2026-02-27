/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Inter only — sister brand design, headings use font-bold
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        // Green rebranding — sister brand to universalsolar.com
        solar: {
          300: '#7ab87a',
          400: '#4a9a4a',
          500: '#2d7a2d', // primary forest green
          600: '#1a5a1a',
          700: '#0d3a0d',
        },
        amber: {
          500: '#fcb900', // accent yellow
          400: '#fdd033',
        },
        brand: {
          50:  '#f5faf5',
          100: '#e8f5e8',
          200: '#c8e8c8',
          500: '#1a3a1a', // dark green
          700: '#2d4a2d',
          900: '#0d1f0d',
          950: '#060e06',
        },
        muted: '#abb8c3',
      },
      animation: {
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      boxShadow: {
        natural: '6px 6px 9px rgba(0,0,0,0.2)',
        deep: '12px 12px 50px rgba(0,0,0,0.4)',
      },
    },
  },
  plugins: [],
}
