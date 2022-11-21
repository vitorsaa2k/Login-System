/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.tsx"
  ],
  theme: {
    extend: {
      fontSize: {
        'my-xs': '0.9rem',
        'my-sm': '1rem',
        'my-lg': '1.2rem',
        'my-4xl': '3.45rem',
      },
      colors: {
        'my-gray': {
          '300' : '#808080',
          '300-2' : '#8D8D8D',
          '0' : '#F6F6F6',
        },
        'my-blue': {
          400: '#4285F4',
          500: '#0089ED',
        }
      },
      fontFamily: {
        sans: 'Poppins, sans-serif'
      }
    },
  },
  plugins: [],
}
