<!-- src/pages/_layout.svelte -->
<script>
  import { firebase } from '../config/firebase'
  import { FirebaseApp } from 'sveltefire'
</script>

<div class="flex flex-col min-h-screen text-gray-900 bg-white dark:bg-gray-900 dark:text-gray-300">
  <FirebaseApp {firebase}>
    <slot />
  </FirebaseApp>
</div>
