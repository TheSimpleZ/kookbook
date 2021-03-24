const { preprocess: windicssPreprocess } = require('svelte-windicss-preprocess')

module.exports = {
  preprocess: [
    windicssPreprocess({
      compile: false,
    }),
  ],
}
