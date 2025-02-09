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
        gummy: ["Sour Gummy", "sans-serif"],
        italic: ["Sour Gummy Italic", "sans-serif"],
      },
    },
  },
  plugins: [],
}
