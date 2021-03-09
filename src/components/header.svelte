<script>
  import Icon, { bookOpen, logout } from '@4mende2/svelte-heroicons'
  import { User } from 'sveltefire'
</script>

<header class="flex justify-between w-full p-4 px-8 shadow-md justify-items-center dark:bg-gray-800">
  <a href="/" class="text-xl">
    <Icon icon={bookOpen} class="icon" />Kookbook
  </a>
  <div class="flex items-center">
    <slot />
  </div>
  <User persist={localStorage} let:auth>
    <a href="/" on:click={() => auth.signOut()} class="">
      Log out
      <Icon icon={logout} class="icon" />
    </a>
  </User>
</header>
