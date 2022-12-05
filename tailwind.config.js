/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  presets: [require('@resir014/tailwind-preset-chungking')],
  theme: {
    extend: {
      gridTemplateRows: {
        'bottom-bar': '40px 24px',
        'scene-wrapper': '1fr 32px 64px',
      },
      gridTemplateColumns: {
        'bottom-bar': 'auto 320px',
        'pre-stream': '110px auto 562px',
      },
      transitionTimingFunction: {
        'in-out-alerts': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
