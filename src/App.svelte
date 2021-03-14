<script>
  import { Router } from '@roxi/routify'
  import { routes } from '../.routify/routes'
  import { FirebaseApp } from 'sveltefire'
  import { firebase } from './config/firebase'
</script>

<FirebaseApp {firebase}>
  <Router {routes} />
</FirebaseApp>

<style global lang="postcss">
  @import '../node_modules/tippy.js/dist/tippy.css';
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  @layer components {
    .icon {
      @apply mx-2 inline-block;
    }
  }
</style>
