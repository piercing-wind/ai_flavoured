import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      "xs": "480px",
      "sm": "640px",
      "md": "768px",
      "md2": "800px",
      "lg": "1024px",
      "xl": "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors:{
         'warm-white': '#fff4f4',
         'aiflavoured': '#ff0786',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      height: {
         inherit: 'inherit',
       },
       boxShadow: {
         'eqshadow' : '0 0 0 1px rgba(0, 0, 0, 0.05)',
       },
    },
  },
  plugins: [],
};
export default config;