import type { Config } from "tailwindcss";

const config: Config = {
  important: true,
  mode: "jit",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/shop/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/product/**/*.{js,ts,jsx,tsx,mdx}",
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
        primary: "#fbf4e5",
        secondary: "#e2c9ac",
        third: "#7f5335",
        accent: "#9c6946",
        text: "#3d3c36",
      },
      width: {
        "800": "50rem",
      },
    },
  },
  plugins: [],
};
export default config;
