module.exports = {
  content: [
    "./layouts/**/*.html",
    "./content/**/*.md",
    // 他のコンテンツパスを追加
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
    require('@tailwindcss/typography'),
  ],
}