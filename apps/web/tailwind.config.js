/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"] ,
  theme: {
    extend: {
      colors: {
        ink: "#0f172a",
        slate: "#334155",
        fog: "#f8fafc",
        accent: "#2563eb"
      }
    }
  },
  plugins: []
};
