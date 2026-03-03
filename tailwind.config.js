/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        terracotta: {
          DEFAULT: '#C4704B',
          light: '#D4896A',
          dark: '#A85A38',
        },
        salie: {
          DEFAULT: '#7A9E7E',
          light: '#95B598',
          dark: '#5F8263',
        },
        goud: {
          DEFAULT: '#D4A843',
          light: '#E0BE6A',
          dark: '#B8902E',
        },
        oceaan: {
          DEFAULT: '#5B8FA8',
          light: '#7AAABE',
          dark: '#467A93',
        },
        zand: {
          DEFAULT: '#E8DDD3',
          light: '#F2EBE4',
          dark: '#D6C8BA',
        },
        warmwit: '#FBF9F6',
        nachtblauw: '#1B2838',
        leisteen: '#2A3444',
      },
      fontFamily: {
        sans: ['Inter_400Regular'],
        medium: ['Inter_500Medium'],
        semibold: ['Inter_600SemiBold'],
        bold: ['Inter_700Bold'],
      },
    },
  },
  plugins: [],
};
