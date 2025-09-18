/**** tailwind.config.js ****/
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // 👇 mapăm clasa `font-sans` la variabila expusă de next/font
        sans: ["var(--font-nunito-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
