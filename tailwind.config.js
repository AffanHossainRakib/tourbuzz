// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // This tells Tailwind to scan these files for class names
    './public/index.html',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // Adding 'Poppins' as the default font
      },
      keyframes: {
        slideInRight: {
          '0%': {
            transform: 'translateX(100%)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1',
          },
        },
        slideInLeft: {
          '0%': {
            transform: 'translateX(-100%)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1',
          },
        },
        glow: {
          '0%, 100%': {
            boxShadow: '0 0 8px rgba(0, 112, 244, 0.6)',
          },
          '50%': {
            boxShadow: '0 0 15px rgba(0, 112, 244, 0.8)',
          },
        },
      },
      animation: {
        'slide-in-right': 'slideInRight 0.5s forwards',
        'slide-in-left': 'slideInLeft 0.5s forwards',
        glow: 'glow 1s infinite alternate',
      },
    },
  },
  variants: {
    extend: {
      animation: ['hover', 'focus'], // Enable hover and focus states for animations
    },
  },
  plugins: [],
};
