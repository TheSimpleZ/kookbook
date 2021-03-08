<!-- src/pages/_layout.svelte -->
<script>
  import { goto } from '@roxi/routify'
  import { current_user } from '../stores/current_user'
  import Header from '../components/header.svelte'
  import { firebase } from '../config/firebase'
  import { FirebaseApp } from 'sveltefire'
</script>

<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-300 min-h-screen">
  <FirebaseApp {firebase}>
    <Header />
    <main>
      <slot />
    </main>
  </FirebaseApp>
</div>
