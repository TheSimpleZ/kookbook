<script>
  import { Router } from '@roxi/routify'
  import { routes } from '../.routify/routes'
  import { FirebaseApp } from 'sveltefire'
  import { firebase } from './libs/firebase'
</script>

<FirebaseApp {firebase}>
  <Router {routes} />
</FirebaseApp>

<style global lang="postcss">
  @import 'tippy.js/dist/tippy.css';

  :global(.icon) {
    @apply mx-1 inline-block;
  }

  :global(html, body, #routify-app) {
    width: 100%;
    height: 100%;
  }
</style>
