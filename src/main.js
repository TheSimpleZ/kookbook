import App from './App.svelte'
import './middleware/auth'

const app = new App({
  target: document.body,
})

export default app
