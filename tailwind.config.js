/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",],
  theme: {
    extend: {
      backgroundImage: {
        solar_bg: "url('/img/nasa_solar_bg.jpg')",
        earth: "url('/img/solar_gen_all.jpg')"
      }
    },
  },
  plugins: [],
}

