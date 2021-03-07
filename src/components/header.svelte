<script>
  import { onMount } from 'svelte'
  import { goto } from '@roxi/routify'

  import { Auth } from '../config/firebase'
  import Heroicon from '@martinse/svelte-heroicons'
  import Icon, { bookOpen, logout } from '@4mende2/svelte-heroicons'

  const logoutUser = async () => {
    await Auth.signOut()
    $goto('/login')
  }

  const iconStyle = 'm-2 h-6 w-6 inline-block'
</script>

<header class="w-full flex justify-between p-4 px-8 justify-items-center shadow">
  <a href="/" class="text-xl">
    <Icon icon={bookOpen} class={iconStyle} />Kookbook
  </a>
  <a href="/" on:click={logoutUser} class="">
    Log out
    <Icon icon={logout} class={iconStyle} />
  </a>
</header>
