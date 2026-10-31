/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primaria: '#25154D',
        secundaria: '#494864',
        fundo: '#0F172A',
        texto: '#F8FAFC',
        destaque: '#F59E0B',
      },
    },
  },
  plugins: [],
};
