/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        agatai: {
          900: '#050B14', // Ультра-темный синий
          800: '#0A1628',
          primary: '#1E40AF',
          accent: '#38BDF8', // Светло-голубой для свечения
          surface: '#ffffff',
        }
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(10, 22, 40, 0.05)',
        'float': '0 20px 40px -10px rgba(30, 64, 175, 0.15)',
      }
    },
  },
  plugins: [],
}