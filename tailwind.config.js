/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "noir": {
          900: "#120A08",
          950: "#0C0706",
        },
        "burnt-orange": "#B3530F",
        "gold-accent": "#D4AF37",
        "gold-deep": "#967527",
        "cream-text": "#F5E6D3",
        "chocolate-rich": "#1A0F0D",
        "chocolate-dark": "#0C0706",
        "chocolate-nest": "#2A1B17",
        "primary": "#B3530F",
        "secondary": "#D4AF37",
        "ivory-bg": "var(--ivory-bg)",
        "ivory-panel": "var(--ivory-panel)",
        "umber-text": "var(--umber-text)",
        "taupe-muted": "var(--taupe-muted)",
        "cocoa-noir": "var(--cocoa-noir)",
      },
      fontFamily: {
        "display": ["Fraunces", "serif"],
        "body": ["Poppins", "sans-serif"],
        "poppins": ["Poppins", "sans-serif"],
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "2xl": "1.5rem",
        "full": "9999px"
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ],
}
