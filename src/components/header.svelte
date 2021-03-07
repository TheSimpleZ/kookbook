<script>
  import { onMount } from 'svelte'
  import { goto } from '@roxi/routify'
  import { currentUser } from '../stores/current_user'
  import { Auth } from '../config/firebase'
  import Icon, { bookOpen, logout } from '@4mende2/svelte-heroicons'

  const logoutUser = async () => {
    await Auth.signOut()
    $goto('/login')
  }

  $: is_logged_in = Boolean($currentUser)

  const iconStyle = 'm-2 h-6 w-6 inline-block'
</script>

<header class="w-full flex justify-between p-4 px-8 justify-items-center shadow-lg dark:bg-gray-800">
  <a href="/" class="text-xl">
    <Icon icon={bookOpen} class={iconStyle} />Kookbook
  </a>
  {#if is_logged_in}
    <a href="/" on:click={logoutUser} class="">
      Log out
      <Icon icon={logout} class={iconStyle} />
    </a>
  {/if}
</header>
