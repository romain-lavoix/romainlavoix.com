module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  plugins: [require('@tailwindcss/typography')],
  theme: {
    extend: {
      fontFamily: {
        merriweather: ['Merriweather'],
        lato: ['Lato'],
        roboto: ['Roboto'],
      },
    },
  },
}
