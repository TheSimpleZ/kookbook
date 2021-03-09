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
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  @layer components {
    .icon {
      @apply m-2 h-6 w-6 inline-block;
    }
  }
</style>
