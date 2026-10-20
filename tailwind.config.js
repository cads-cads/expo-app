
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primaria: "#6366F1",
        secundaria: "#14B8A6",
        fundo: "#0F172A",
        texto: "#F8FAFC",
        destaque: "#F59E0B",
      },
    },
  },
  plugins: [],
};

