/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        gloock: ["Gloock", "serif"], // Fonte do título da pergunta
      },
      colors: {
        background: "#D5D1B9",
        textPrimary: "#121212",
        textSecondary: "#4F4F4F",
        highlight: "#FFA805", // Cor da borda do radio button selecionado
      },
    },
  },
  plugins: [],
};