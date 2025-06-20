/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./lib/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./styles/**/*.{js,jsx,ts,tsx}",

  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "Arial", "sans-serif"],
      },
    },
  },

  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
  ],
};
