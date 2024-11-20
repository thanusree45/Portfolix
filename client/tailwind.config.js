/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary":"#155e75",
        "secondary":"#84cc16",
        "teritiary":"#fde68a",
      },
    },
    screens: {
      'lg': {'max':'2023px'},
      'sm': {'max':'1000px'},
    },
  },
  plugins: [],
}
