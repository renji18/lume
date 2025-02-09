/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#639091",
        theme: {
          blue: "#62b6c5",
          white: "#f1f1e8",
          black: "#233337",
        },
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
