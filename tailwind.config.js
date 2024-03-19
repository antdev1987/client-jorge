/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          50: "#FCFBFC",
          300: "#E7E7E7",
          400: "#C7C7C7"
        }
      }
    },
  },
  plugins: [],
}