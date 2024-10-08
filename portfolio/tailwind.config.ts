import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-blue': 'var(--color-neon-blue)',
        'neon-pink': 'var(--color-neon-pink)',
        'neon-purple': 'var(--color-neon-purple)',
        'neon-green': 'var(--color-neon-green)',
      },
      fontFamily: {
        sans: ['Orbitron', 'Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
export default config;
