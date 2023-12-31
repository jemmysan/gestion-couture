/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    colors: {
      'orange-300' : '#fdba74',
      'yellow-400':'#fbbf24',
      'yellow-300':'#fcd34d',
      'red-600': '#e11d48',
      'white': '#fafafa',
      'slate-100' : '#e2e8f0',
      'blue-200':'#bfdbfe',
      'blue-400': '#60a5fa',
      'blue-500':'#3b82f6',
      'blue-600' : '#0284c7',
      'blue-700': '#1d4ed8',
      'blue-800' : '#075985',
      'blue-950' : '#172554',
    },
    extend: {
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

