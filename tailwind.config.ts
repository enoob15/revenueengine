import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#f8fafc",
        slateNight: "#06111f",
        slateDeep: "#0e1a2b",
        slatePanel: "#112238",
        brand: {
          DEFAULT: "#3b82f6",
          soft: "#60a5fa",
          strong: "#1d4ed8"
        }
      },
      boxShadow: {
        panel: "0 18px 50px rgba(2, 6, 23, 0.45)"
      }
    }
  },
  plugins: []
};

export default config;
