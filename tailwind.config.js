/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

export default {
  content: [
    "./index.html",
    "./src/components/Login.jsx",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {},
    colors: {
      ...colors,
      modalblue: "#334155"
    },
    tabitem: {
      styles: {
        default: {
          active: {
            off: "text-white"
          }
        }
      }
    }
  
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

