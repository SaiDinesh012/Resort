import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#011D7E",
          dark: "#00114D",
          light: "#0D2F9E",
        },
        secondary: {
          DEFAULT: "#F1EDE2",
          dark: "#E2D9C4",
          light: "#F9F7F1",
        },
        accent: {
          DEFAULT: "#E4C950",
          dark: "#C5A51E",
          light: "#F3E17E",
        },
        background: "#F8F9FD",
        surface: "#FFFFFF",
        charcoal: "#0B132B",
        "warm-gray": "#5A6578",
        border: "#E2E6EE",
        success: "#1E8E5A",
        error: "#D13838",
        warning: "#D9822B",
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "112": "28rem",
        "128": "32rem",
      },
      boxShadow: {
        card: "0 1px 3px 0 rgba(31,41,51,0.08), 0 1px 2px -1px rgba(31,41,51,0.06)",
        "card-hover": "0 4px 12px 0 rgba(31,41,51,0.12), 0 2px 6px -2px rgba(31,41,51,0.08)",
        panel: "0 4px 24px 0 rgba(31,41,51,0.08)",
      },
      borderRadius: {
        xs: "2px",
        sm: "4px",
        DEFAULT: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-in": "slideIn 0.3s ease-out",
        "slide-up": "slideUp 0.3s ease-out",
        shimmer: "shimmer 1.5s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(-16px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
