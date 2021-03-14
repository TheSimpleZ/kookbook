<script>
  import { BookOpen, Logout } from 'svelte-hero-icons'
  import { User } from 'sveltefire'
</script>

<header class="flex justify-between w-full p-4 px-8 shadow-md justify-items-center dark:bg-gray-800">
  <a href="/" class="text-xl">
    <BookOpen size="24" class="icon" />Kookbook
  </a>
  <slot />
  <User persist={localStorage} let:auth>
    <a href="/" on:click={() => auth.signOut()} class="">
      Log out <Logout size="20" class="icon" />
    </a>
  </User>
</header>
