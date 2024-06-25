/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
    theme: {
      extend: {
        animation: {
          rotate: "rotate 10s linear infinite",
        },
        keyframes: {
          rotate: {
            "0%": { transform: "rotate(0deg) scale(10)" },
            "100%": { transform: "rotate(-360deg) scale(10)" },
          },
        },
      },
    },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.line-clamp-2': {
          display: '-webkit-box',
          '-webkit-line-clamp': '2',
          '-webkit-box-orient': 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
      });
    },
  ],
}

