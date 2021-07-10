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

  @layer components {
    :global(.icon) {
      @apply mx-1 inline-block;
    }
  }

  :global(html, body, #routify-app) {
    @apply min-h-screen;
  }
</style>
