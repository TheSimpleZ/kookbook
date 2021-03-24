// import HMR from '@roxi/routify/hmr'
// import App from './App.svelte'
// import './middleware/auth'

// const app = HMR(App, { target: document.body }, 'routify-app')

// export default app
// eslint-disable-next-line node/no-missing-import
import 'windi.css'
import App from './App.svelte'

const app = new App({
  target: document.body,
})

export default app
