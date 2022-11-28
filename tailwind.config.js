/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  presets: [require('@resir014/tailwind-preset-chungking')],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
