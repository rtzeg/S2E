/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"] ,
  theme: {
    screens: {
      'xs': '320px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        ink: "#0f172a",
        fog: "#f8fafc",
        accent: "#6d28d9",
        "accent-soft": "#ede9fe",
        "accent-dark": "#4c1d95"
      }
    }
  },
  plugins: []
};
