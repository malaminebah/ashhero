/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./hooks/**/*.{js,jsx,ts,tsx}",
    "./constants/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Violet / Royal theme (from mockup)
        brand: {
          bg: "#08000f",
          bg2: "#0f0020",
          surface: "rgba(255,255,255,0.03)",
          border: "rgba(168,85,247,0.15)",
          accent: "#a855f7",
          accentDark: "#7c3aed",
          accentDeep: "#4c1d95",
          gold: "#fbbf24",
          red: "#ef4444",
        },
      },
      backgroundColor: {
        surface: "rgba(255,255,255,0.03)",
      },
      borderColor: {
        accent: "rgba(168,85,247,0.15)",
        accentBright: "rgba(168,85,247,0.3)",
      },
      textColor: {
        muted: "rgba(243,232,255,0.4)",
        dim: "rgba(243,232,255,0.2)",
      },
    },
  },
  plugins: [],
}
