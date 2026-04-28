import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:  ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
      },
      colors: {
        navy: "#1B2D4F",
        gold:  "#C9A96E",
        "gold-hover": "#b8944f",
        cream: "#F5F5F0",
      },
      keyframes: {
        fadeInUp: {
          "0%":   { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)"    },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scrollPulse: {
          "0%, 100%": { opacity: "0.4", transform: "translateY(0)"   },
          "50%":      { opacity: "1",   transform: "translateY(6px)" },
        },
      },
      animation: {
        "fade-in-up": "fadeInUp 0.65s ease-out forwards",
        "fade-in":    "fadeIn 0.4s ease-out forwards",
        "scroll":     "scrollPulse 2.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
