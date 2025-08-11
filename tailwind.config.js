module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
      // Custom breakpoints for better mobile support
      'mobile': {'max': '767px'},
      'tablet': {'min': '768px', 'max': '1023px'},
      'desktop': {'min': '1024px'},
      // Height-based breakpoints for better vertical responsiveness
      'short': {'raw': '(max-height: 600px)'},
      'tall': {'raw': '(min-height: 800px)'},
    },
    extend: {
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
      },
      fontSize: {
        'xxs': '0.625rem',
        '2xs': '0.6875rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      minHeight: {
        'screen-75': '75vh',
        'screen-50': '50vh',
      },
      aspectRatio: {
        '4/3': '4 / 3',
        '3/2': '3 / 2',
        '2/3': '2 / 3',
        '9/16': '9 / 16',
      },
      animation: {
        'slide-in-left': 'slide-in-left 0.3s ease-out',
        'slide-out-left': 'slide-out-left 0.3s ease-out',
        'fade-in-scale': 'fade-in-scale 0.2s ease-out',
      },
      keyframes: {
        'slide-in-left': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'slide-out-left': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'fade-in-scale': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('tailwind-scrollbar'),
  ],
  extend: {
    animation: {
      'fade-in': 'fadeIn 0.3s ease-out',
    },
    borderRadius: {
      'lg': '0.5rem',
      'md': '0.375rem',
      'full': '9999px',
    },
    keyframes: {
      fadeIn: {
        '0%': { opacity: 0, transform: 'scale(0.95)' },
        '100%': { opacity: 1, transform: 'scale(1)' },
      },
    },
  }
};