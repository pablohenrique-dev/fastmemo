/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fadeRight: {
          "0%": { transform: "translateX(-20px)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        fadeTop: {
          "0%": { transform: "translateY(0)", opacity: 1 },
          "80%": { transform: "translateY(0)", opacity: 1 },
          "95%": { opacity: 0.9 },
          "100%": { transform: "translateY(-100vh)", opacity: 0 },
        },
        rotate: {
          "0%": { transform: "rotateZ(0deg)" },
          "100%": { transform: "rotateZ(360deg)" },
        },
        wave: {
          "0%": { transform: "rotateZ(-20deg)" },
          "33%": { transform: "rotateZ(20deg)" },
          "66%": { transform: "rotateZ(-20deg)" },
          "100%": { transform: "rotateZ(20deg)" },
        },
      },
      fontFamily: {
        primary: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
