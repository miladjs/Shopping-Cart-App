/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: "#E33232",
      secondary: "#FBE0E0",
      blue: "#444CE7",
      green: "##12B76A",
      black: "#1D2939",
      gray: "#98A2B3",
      white: "#fff",
    },
    extend: {},
    container: {
      center: true,
    },
  },
  plugins: [],
};
