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
</style>
