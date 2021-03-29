<!-- src/pages/_layout.svelte -->
<script>
  import { firebase } from '../libs/firebase'
  import { FirebaseApp, User, Doc } from 'sveltefire'
  import { url, layout, isActive } from '@roxi/routify'
  import Icon, { Logout } from 'svelte-hero-icons'

  import Login from './_login.svelte'
</script>

<div class="flex flex-col h-screen text-gray-900 bg-white dark:bg-gray-900 dark:text-gray-300">
  <FirebaseApp {firebase}>
    <User persist={localStorage} let:user let:auth>
      <Doc
        path={`users/${user?.uid}`}
        on:ref={(e) => e.detail.ref.set({ displayName: user?.displayName, email: user?.email })}
        once
      />

      <header class="flex items-center w-full p-2 px-8 bg-white shadow-md dark:bg-gray-800">
        <nav class="flex items-center gap-4 divide-x">
          <a href="/" class="flex items-center text-xl">
            <object class="mr-2" data="images/chef.svg" width="30" height="30" title="logo" />Kookbook
          </a>
          {#each $layout.children as { path, title }}
            <a
              href={$url(path)}
              class="pl-4 capitalize"
              class:underline={$isActive(path)}
              class:text-gray-500={!$isActive(path)}>{title}</a
            >
          {/each}
        </nav>
        <a href="/" on:click={() => auth.signOut()} class="flex items-center ml-auto">
          Log out <Icon src={Logout} size="20" class="ml-2 icon" />
        </a>
      </header>

      <slot scoped={{ user }} />

      <div slot="signed-out">
        <Login />
      </div>
    </User>
  </FirebaseApp>
</div>
