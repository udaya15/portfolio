module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        green: {
          neon: '#39FF14',
          dim: '#2bc910',
          glow: 'rgba(57,255,20,0.15)',
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 5px #39FF14, 0 0 20px #39FF14' },
          '50%': { boxShadow: '0 0 20px #39FF14, 0 0 60px #39FF14' },
        },
      },
    },
  },
  plugins: [],
};