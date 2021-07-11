module.exports = {
  darkMode: 'class',
  plugins: [
    require('windicss/plugin/typography'),
    require('windicss/plugin/line-clamp'),
    require('windicss/plugin/forms'),
    require('windicss/plugin/aspect-ratio'),
  ],
  theme: {},
  shortcuts: {
    'btn': 'rounded-lg flex items-center justify-center focus:outline-none py-2',
  }
}
