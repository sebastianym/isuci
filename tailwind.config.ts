import type { Config } from "tailwindcss";

const config: Config = {
  darkMode:"class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        // Primary background color

        "bg-dark-primary": "#1f2125",
        "bg-white-primary": "#eaeaec",

        // Secondary background color
        "bg-dark-secondary": "#161819",
        "bg-white-secondary": "#f5f7f9",
        "bg-green-secondary": "#577B8D",

        // Text color

        white: "#DBE2EF",
        black: "#161819",
        "gray-dark": "#000000",
        "gray-white": "#868893",

        "bg-dark-hover": "#313234",
        "bg-white-hover": "#d9d9d9",
        "bg-input-error": "#8d3c3c",

        // Login
        "primary-blue":"#F9F7F7",
        "secondary-blue":"#DBE2EF",
        "primary-yellow":"#3F72AF",
        "secundary-yellow":"#A8D8EA",
        "palid-pink":"#3F72AF",

        // registro

        "background": "#F9F7F7",
        "back-back": "#3F72AF",

        // dashboard
        "dash-back": "#3F72AF",
        "dash-perfil": "#F2F0F0",
        //Boton eliminar tema claro
        "Theme-Delete": "#A91D3A",
        //Boton predeterminado tema claro
        "Button-pred":"#3F72AF"
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
export default config;
