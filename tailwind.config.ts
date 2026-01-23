import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'sans-serif'],
        serif: ['var(--font-dm-serif)', 'serif'],
      },
      colors: {
        cream: '#FAF9F6',
        'warm-black': '#2D2A26',
        'warm-gray': '#6B6560',
        muted: '#9B8F85',
        border: '#E8E4DF',
        background: '#FAF9F6',
        surface: '#F5F3EF',
        primary: '#FF9B71',
        'primary-hover': '#FF8A5C',
        secondary: '#F59E0B',
        accent: '#10B981',
        'accent-blue': '#5BC0EB',
        'accent-coral': '#FA7268',
        'accent-mint': '#95E1D3',
        'accent-yellow': '#F4D35E',
        'text-primary': '#112337',
        'text-secondary': '#585e6a',
        'text-muted': '#6B7280',
        'archetype-batisseur': '#94A3B8',
        'archetype-connecteur': '#FDBA74',
        'archetype-expert': '#C4B5FD',
        'archetype-opportuniste': '#FDE047',
        'archetype-createur': '#6EE7B7',
        'archetype-stratege': '#7DD3FC',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      }
    }
  },
  plugins: [],
};

export default config;
