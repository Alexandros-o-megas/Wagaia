/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blush: "#FEE3E2",
        rose: "#F9C7C7",
        ink: "#000000",
        paper: "#FFFFFF",
      },
      fontFamily: {
        display: ["Poppins", "sans-serif"],
        ui: ["Nunito", "sans-serif"],
        editorial: ["Sarabun", "serif"],
      },
      boxShadow: {
        stamp: "6px 6px 0 #000",
        stampSm: "3px 3px 0 #000",
      },
    },
  },
  plugins: [],
};
