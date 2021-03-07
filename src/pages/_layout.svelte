<!-- src/pages/_layout.svelte -->
<script>
  import { goto } from '@roxi/routify'
  import { currentUser } from '../stores/current_user'
  import Header from '../components/header.svelte'

  /** show if the current page is "/login" **/

  $: is_logged_in = Boolean($currentUser)

  /** else only show if user is authorized. Otherwise, redirect to login. **/
  $: if (!is_logged_in) {
    $goto('/login')
  }
</script>

<div class="dark bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-300 min-h-screen">
  <Header />
  <main>
    <slot />
  </main>
</div>
