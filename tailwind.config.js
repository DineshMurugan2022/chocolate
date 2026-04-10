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
        "burnt-orange": "var(--color-burnt-orange)",
        "gold-accent": "var(--color-gold-accent)",
        "gold-deep": "var(--color-gold-deep)",
        "cream-text": "var(--color-cream-text)",
        "chocolate-rich": "var(--color-chocolate-rich)",
        "chocolate-dark": "var(--color-chocolate-dark)",
        "ivory-bg": "var(--color-ivory-warm)",
        "ivory-panel": "rgba(255, 252, 247, 0.4)",
        "botanical-green": "var(--color-botanical-green)",
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
