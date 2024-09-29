/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js}",
    "./node_modules/flowbite-react",
    "./src/**/*.{js,ts,jsx,tsx}",
  
  ],
  theme: {
    extend: {},
  },
  plugins: [flowbite.plugin()], //require('flowbite/plugin') - use this if doesn't work
}