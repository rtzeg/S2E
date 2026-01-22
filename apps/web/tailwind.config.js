/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"] ,
  theme: {
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
