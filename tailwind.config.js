/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        beige: "#f5e6ca",
        blue: "#5a9bd5",
        profit: "#1FAA59",
        loss: "#D72638",
        dark_slate: "#2c2c2c",
        soft_white: "#fafaf8",
      },
      fontFamily: {
        gb: ["gb", "sans-serif"],
        gbi: ["gbi", "sans-serif"],
        geb: ["geb", "sans-serif"],
        gebi: ["gebi", "sans-serif"],
        gel: ["gel", "sans-serif"],
        geli: ["geli", "sans-serif"],
        gl: ["gl", "sans-serif"],
        gli: ["gli", "sans-serif"],
        gm: ["gm", "sans-serif"],
        gmi: ["gmi", "sans-serif"],
        gsb: ["gsb", "sans-serif"],
        gsbi: ["gsbi", "sans-serif"],
        gt: ["gt", "sans-serif"],
        gti: ["gti", "sans-serif"],
        gi: ["gi", "sans-serif"],
        g: ["g", "sans-serif"],
      },
    },
  },
  plugins: [],
}
