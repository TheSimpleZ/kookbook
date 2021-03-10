<!-- src/pages/_layout.svelte -->
<script>
  import { firebase } from '../config/firebase'
  import { FirebaseApp } from 'sveltefire'
</script>

<div class="w-full h-full text-gray-900 bg-white dark:bg-gray-900 dark:text-gray-300">
  <FirebaseApp {firebase}>
    <slot />
  </FirebaseApp>
</div>
