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
          card: "#150826",
          track: "#1d0b2b",
          muted: "#8b7aa8",
          locked: "#5b4a75",
          surface: "rgba(255,255,255,0.03)",
          border: "rgba(168,85,247,0.15)",
          accent: "#a855f7",
          accentDark: "#7c3aed",
          accentDeep: "#4c1d95",
          gold: "#fbbf24",
          red: "#ef4444",
          blue: "#3b82f6",
          success: "#22c55e",
        },
        flow: {
          bg: "#FFFFFF",
          breathe: "#E5DDF5",
          brand: "#9B87F5",
          cta: "#7C3AED",
          "cta-loading": "#C4B5FD",
          mascot: "#C8EDD6",
          text: "#171717",
          muted: "#64748B",
          faint: "#94A3B8",
          border: "#E5E7EB",
          secondary: "#F3EEFF",
          gold: "#F5C518",
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
      fontFamily: {
        sans: ["Nunito"],
        mono: ["M5x7"],
        flow: ["Nunito"],
        pixel: ["M5x7"],
      },
    },
  },
  plugins: [],
}
