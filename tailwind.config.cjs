module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {
      animation: {
        'fade-in-up': 'fadeInUp 300ms ease-out forwards',
        'fade-in': 'fadeIn 200ms ease-out forwards',
        'slide-fade-in': 'slideFadeIn 250ms ease-out forwards',
        shimmer: 'shimmer 1.5s linear infinite',
        'image-scale-hover': 'imageScaleHover 200ms ease-out forwards',
        'button-press': 'buttonPress 120ms ease-out forwards',
      },
      keyframes: {
        fadeInUp: { '0%': { opacity: '0', transform: 'translateY(10px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideFadeIn: { '0%': { opacity: '0', transform: 'translateY(5px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        imageScaleHover: { '0%': { transform: 'scale(1)' }, '100%': { transform: 'scale(1.03)' } },
        buttonPress: { '0%': { transform: 'scale(1)' }, '50%': { transform: 'scale(0.95)' }, '100%': { transform: 'scale(1)' } },
      },
    },
  },
  plugins: [],
};
