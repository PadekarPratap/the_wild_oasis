/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        colorBrand50: "#eef2ff",
        colorBrand100: "#e0e7ff",
        colorBrand200: "#c7d2fe",
        colorBrand500: "#6366f1",
        colorBrand600: "#4f46e5",
        colorBrand700: "#4338ca",
        colorBrand800: "#3730a3",
        colorBrand900: "#312e81",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
    screens: {
      xs: "480px",
      sm: "620px",
      md: "768px",
      lg: "1060px",
      xl: "1200px",
      xxl: "1700px",
    },
  },
  plugins: [],
  darkMode: "class",
};
