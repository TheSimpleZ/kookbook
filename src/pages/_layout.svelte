<!-- src/pages/_layout.svelte -->
<script>
  import { firebase } from '../libs/firebase'
  import { FirebaseApp, User, Doc } from 'sveltefire'

  import Login from './login.svelte'
</script>

<div class="w-full h-full text-gray-900 bg-white dark:bg-gray-900 dark:text-gray-300">
  <FirebaseApp {firebase}>
    <User persist={localStorage} let:user>
      <Doc
        path={`users/${user?.uid}`}
        on:ref={(e) => e.detail.ref.set({ displayName: user?.displayName, email: user?.email })}
        once
      />

      <slot />

      <div slot="signed-out">
        <Login />
      </div>
    </User>
  </FirebaseApp>
</div>
