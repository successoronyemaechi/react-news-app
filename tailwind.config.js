
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  darkMode: 'media',
  theme: {
    extend: {},
  },
  plugins: [require("tw-elements/dist/plugin.cjs")]
}

