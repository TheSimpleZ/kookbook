const svelte = require('@sveltejs/vite-plugin-svelte')
const { defineConfig } = require('vite')
const vitePluginWindicss = require('vite-plugin-windicss').default
const path = require('path');

module.exports = defineConfig(({ command, mode }) => {
  const isProduction = mode === 'production'
  return {
    plugins: [
      // uses enforce: pre
      svelte({}),
      vitePluginWindicss({
        transformCSS: 'pre',
      }),
    ],
    build: {
      minify: isProduction,
      commonjsOptions: {
        exclude: ['ckeditor/*'],
      },
      chunkSizeWarningLimit: 1000,
    },
    resolve: {
      alias: [
        { find: "@", replacement: path.resolve(__dirname, 'src') }
      ]
    },
    optimizeDeps: {
      include: ['svelte-hero-icons', 'ckeditor5-custom-build'],
      exclude: ['@roxi/routify'],
    },
  }
})
