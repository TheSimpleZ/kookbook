module.exports = {
  darkMode: 'class',
  plugins: [
    require('windicss/plugin/typography'),
    require('windicss/plugin/line-clamp'),
    require('windicss/plugin/forms'),
  ],
  theme: {},
  variants: {
    extend: {
      opacity: ['disabled'],
      borderStyle: ['focus'],
    },
  },
}
