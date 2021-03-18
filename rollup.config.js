import svelte from 'rollup-plugin-svelte-hot'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import livereload from 'rollup-plugin-livereload'
import { terser } from 'rollup-plugin-terser'
import css from 'rollup-plugin-css-only'
import sveltePreprocess from 'svelte-preprocess'
import json from '@rollup/plugin-json'
import replace from 'rollup-plugin-replace'
import Hmr from 'rollup-plugin-hot'
const createPreprocessors = require('./svelte.config').createPreprocessors

const isNollup = !!process.env.NOLLUP
const production = !process.env.ROLLUP_WATCH

export default {
  input: 'src/main.js',
  output: {
    sourcemap: true,
    format: 'esm',
    name: 'app',
    dir: 'public/build',
    chunkFileNames: `[name]${(production && '-[hash]') || ''}.js`,
  },
  plugins: [
    svelte({
      compilerOptions: {
        // enable run-time checks when not in production
        dev: !production,
        css: false,
      },
      preprocess: createPreprocessors(production),
      emitCss: true,
      hot: isNollup,
    }),
    json(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    css({ output: 'public/build/bundle.css' }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration —
    // consult the documentation for details:
    // https://github.com/rollup/rollup-plugin-commonjs
    resolve({
      browser: true,
      dedupe: (importee) => !!importee.match(/svelte(\/|$)/),
    }),
    commonjs(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && !isNollup && livereload('public'),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),
    !production && isNollup && Hmr({ inMemory: true, public: 'public' }), // refresh only updated code
    {
      // provide node environment on the client
      transform: (code) => ({
        code: code.replace('process.env.NODE_ENV', `"${process.env.NODE_ENV}"`),
        map: { mappings: '' },
      }),
    },
  ],
  watch: {
    clearScreen: false,
  },
}
