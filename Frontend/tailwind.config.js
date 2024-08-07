/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "Arial", "sans-serif"],
        devnagri: ["Noto Sans Devanagari", "sans-serif"],
      },
      colors: {
        primary: "#F9C23C",
        secondary: "#637381",
        tertiary: "#212121",
      },
    },
  },
  plugins: [],
};
