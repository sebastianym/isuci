import type { Config } from "tailwindcss";

const config: Config = {
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

        white: "#ffffff",
        black: "#000000",
        "gray-dark": "#bababa",
        "gray-white": "#868893",

        "bg-dark-hover": "#313234",
        "bg-white-hover": "#d9d9d9",
        "bg-input-error": "#8d3c3c",
      },
    },
  },
  plugins: [],
};
export default config;
