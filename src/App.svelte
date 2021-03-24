<script>
  import { Router } from '@roxi/routify'
  import { routes } from '../.routify/routes'
  import { FirebaseApp } from 'sveltefire'
  import { firebase } from './libs/firebase'
</script>

<FirebaseApp {firebase}>
  <Router {routes} />
</FirebaseApp>

<style global>
  @import 'tippy.js/dist/tippy.css';

  @layer components {
    .icon {
      @apply mx-1 inline-block;
    }
  }
</style>
