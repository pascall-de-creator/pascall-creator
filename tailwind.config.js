module.exports = {
  content: [
    "./views/**/*.{ejs,js,scss}"
  ],
  theme: {
    colors: {
      'cyan-700': '#15ba88',
      'cyan-600': '#38d7a7',
    },
    extend: {
    },
  },
  plugins: [],
}

.truncate-overflow {
  --max-lines: 5;
  max-height: calc(var(--lh) * var(--max-lines));
  overflow: hidden;
}