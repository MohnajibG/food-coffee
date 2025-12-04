/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Couleurs extraites du branding FOOD COFFEE
        brand: {
          darkRed: "#4A1F29", // Bordeaux profond inspiré du fond
          darkGreen: "#0F2F28", // Vert foncé inspiré du fond
          gold: "#D8B56A", // Doré stylisé (texte FOOD)
          lightGold: "#EBD7A1", // Variante claire
          white: "#FFFFFF",
          black: "#1A1A1A",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "serif"], // Feeling raffiné (titre TRAITEUR)
        sans: ["Montserrat", "sans-serif"], // Propre, moderne
      },
      boxShadow: {
        soft: "0 4px 30px rgba(0,0,0,0.08)",
      },
      keyframes: {
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        shimmer: "shimmer 1.5s infinite",
      },
    },
  },
  plugins: [],
};
