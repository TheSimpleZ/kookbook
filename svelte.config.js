// svelte.config.js
const sveltePreprocess = require('svelte-preprocess')

// using sourceMap as an example, but could be anything you need dynamically
function createPreprocessors(production) {
  return sveltePreprocess({
    sourceMap: !production,
    postcss: true,
    defaults: {
      style: 'postcss',
    },
  })
}

module.exports = {
  preprocess: createPreprocessors(false),
  createPreprocessors,
}
