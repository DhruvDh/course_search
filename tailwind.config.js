/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,css,md,mdx,html,json,scss}',
  ],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['noto-sans-display', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
};
