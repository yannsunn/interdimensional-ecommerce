import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'portal-pulse': 'portal-pulse 4s ease-in-out infinite',
        'logo-glow': 'logo-glow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'shake': 'shake 0.5s ease-in-out infinite',
        'price-glow': 'price-glow 1s ease-in-out infinite',
        'shine': 'shine 3s ease-in-out infinite',
        'float-around': 'float-around 20s linear infinite',
        'rotate': 'rotate 20s linear infinite',
        'glitch-1': 'glitch 1s infinite',
        'glitch-2': 'glitch 1s infinite reverse',
        'gradient-shift': 'gradient-shift 15s ease infinite',
      },
      keyframes: {
        'portal-pulse': {
          '0%, 100%': { transform: 'translate(-50%, -50%) scale(1)', opacity: '0.3' },
          '50%': { transform: 'translate(-50%, -50%) scale(1.2)', opacity: '0.6' },
        },
        'logo-glow': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'shake': {
          '0%, 100%': { transform: 'rotate(15deg)' },
          '25%': { transform: 'rotate(20deg)' },
          '75%': { transform: 'rotate(10deg)' },
        },
        'price-glow': {
          '0%, 100%': { textShadow: '0 0 20px rgba(255,255,0,0.8)' },
          '50%': { textShadow: '0 0 40px rgba(255,255,0,1)' },
        },
        'shine': {
          '0%': { transform: 'translateX(-100%) translateY(-100%) rotate(45deg)' },
          '100%': { transform: 'translateX(100%) translateY(100%) rotate(45deg)' },
        },
        'float-around': {
          '0%': { transform: 'translateX(-100px) translateY(100vh) rotate(0deg)' },
          '100%': { transform: 'translateX(calc(100vw + 100px)) translateY(-100px) rotate(720deg)' },
        },
        'rotate': {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' },
        },
        'glitch': {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
    },
  },
  plugins: [],
}
export default config