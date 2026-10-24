/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Pretendard Variable', 'Pretendard', 'sans-serif'], display: ['Pretendard Variable', 'Pretendard', 'sans-serif'] },
      colors: { ink: '#111111', muted: '#111111', lilac: '#a184e8', canvas: '#ffffff', border: '#e8e8e8' },
      boxShadow: { soft: '0 16px 55px rgba(48,45,41,.045)' }
    }
  },
  plugins: []
};
