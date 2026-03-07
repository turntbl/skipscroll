/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors
        primary: '#6366f1', // Indigo
        secondary: '#ec4899', // Pink
        // Platform colors
        tiktok: '#00f2ea',
        twitter: '#1da1f2',
        instagram: '#e4405f',
        youtube: '#ff0000',
        reddit: '#ff4500',
        google: '#4285f4',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
    },
  },
  plugins: [],
};
