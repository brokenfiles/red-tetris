module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'sky': 'rgba(0,30,38,1)',
        'primary': 'var(--primary-color)',
        'secondary': 'var(--secondary-color)'
      }
    },
  },
  plugins: [],
}
