<script>
  import Icon, { BookOpen, Logout } from 'svelte-hero-icons'
  import { User } from 'sveltefire'
</script>

<header class="flex items-center justify-between w-full p-4 px-8 shadow-md justify-items-center dark:bg-gray-800">
  <a href="/" class="flex items-center text-xl">
    <Icon src={BookOpen} size="24" class="icon" />Kookbook
  </a>
  <slot />
  <User persist={localStorage} let:auth>
    <a href="/" on:click={() => auth.signOut()} class="flex items-center">
      Log out <Icon src={Logout} size="20" class="icon" />
    </a>
  </User>
</header>
