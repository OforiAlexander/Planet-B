/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",],
  theme: {
    extend: {
      backgroundImage: {
        solar_bg: "url('./src/assets/img/nasa_solar_bg.jpg')"
      }
    },
  },
  plugins: [],
}

