/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      clipPath: {
        custom: "polygon(0 0, 60% 0, 40% 40%, 70% 100%, 0 100%)",
      },
    },
  },

  plugins: [
    require('@tailwindcss/typography'),
    require('tailwind-clip-path'),
  ],
}

