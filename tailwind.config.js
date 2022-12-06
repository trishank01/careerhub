/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        "base-white" : "FFFFFF",
        "brand-green" : "#2FBF8E",
        "brand-green-light" : "#EFFDF5",
        "brand-blue" : "#2B9BFF",
        "brand-black":  "#2B3940",
        "brand-black-light" : "#959CA0"
      }
    },
   
  },
    corePlugins: {
    preflight: false,
  },
  plugins: []
}