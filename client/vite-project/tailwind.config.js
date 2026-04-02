/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: "#7B1E2B",
        "maroon-light": "#9B3344",
        "maroon-dark": "#5A1520",
        cream: "#faf7f5",
      },
      fontFamily: {
        heading: ["Playfair Display", "serif"],
        body: ["Source Sans 3", "sans-serif"],
      },
    },
  },
  plugins: [],
}

