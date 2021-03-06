<script>
  import { FirebaseApp, User, Doc, Collection } from 'sveltefire'
</script>

<User let:user>
  <p>Howdy, {user.displayName}</p>
</User>
