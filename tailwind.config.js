/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: '#f5c518',
        gold2: '#e8a500',
        'dark-base': '#0d0d20',
        'dark-deep': '#0a0a1a',
        purple: {
          DEFAULT: '#6c3fc5',
          light: '#9b6dff',
        },
        danger: '#e63946',
        success: '#2dc653',
      },
      fontFamily: {
        title: ['"Black Han Sans"', 'sans-serif'],
        body: ['"Noto Sans"', 'sans-serif'],
      },
      animation: {
        'strip-flow': 'stripFlow 3s linear infinite',
        'float-cross': 'floatCross 3s ease-in-out infinite',
        'wave-dot': 'waveDot 1.4s ease-in-out infinite',
        'pop-in': 'popIn 0.35s cubic-bezier(0.34,1.56,0.64,1) both',
        'slide-in': 'slideIn 0.4s ease both',
        'cd-anim': 'cdAnim 0.9s ease-out infinite',
        'pulse-dot': 'pulseDot 1.5s ease infinite',
        'music-bar': 'musicBar 0.8s ease infinite alternate',
      },
      keyframes: {
        stripFlow: { '0%': { backgroundPosition: '0%' }, '100%': { backgroundPosition: '200%' } },
        floatCross: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        waveDot: { '0%,60%,100%': { transform: 'translateY(0)' }, '30%': { transform: 'translateY(-10px)' } },
        popIn: { from: { opacity: '0', transform: 'scale(0.7)' }, to: { opacity: '1', transform: 'scale(1)' } },
        slideIn: { from: { opacity: '0', transform: 'translateX(-20px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
        cdAnim: { '0%': { transform: 'scale(0.4)', opacity: '0' }, '55%': { transform: 'scale(1.08)', opacity: '1' }, '100%': { transform: 'scale(1)', opacity: '0.3' } },
        pulseDot: { '0%,100%': { transform: 'scale(1)', opacity: '1' }, '50%': { transform: 'scale(1.5)', opacity: '0.6' } },
        musicBar: { from: { height: '4px' }, to: { height: '14px' } },
      }
    },
  },
  plugins: [],
}

