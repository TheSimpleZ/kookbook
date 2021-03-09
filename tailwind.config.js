module.exports = {
  purge: {
    content: [
      './src/**/*.svelte',
      // may also want to include HTML files
      './public/index.html',
    ],
    // this is for extracting Svelte `class:` syntax but is not perfect yet, see below
    defaultExtractor: (content) => {
      const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []
      const broadMatchesWithoutTrailingSlash = broadMatches.map((match) => _.trimEnd(match, '\\'))
      const matches = broadMatches.concat(broadMatchesWithoutTrailingSlash)
      return matches
    },
    enabled: !process.env.ROLLUP_WATCH, // disable purge in dev
  },
  darkMode: 'class', // or 'media' or 'class',
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
}
