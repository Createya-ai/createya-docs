import starlightPlugin from '@astrojs/starlight-tailwind';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: 'hsl(189 95% 43%)',     // Createya cyan
          light: 'hsl(189 95% 60%)',
          dark: 'hsl(189 95% 30%)',
        },
        bg: {
          DEFAULT: 'hsl(220 20% 6%)',
          card: 'hsl(220 18% 10%)',
          sidebar: 'hsl(220 22% 5%)',
        },
      },
      borderRadius: {
        DEFAULT: '0.75rem',
        lg: '1rem',
      },
      fontFamily: {
        display: ['Bebas Neue', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [starlightPlugin()],
};
