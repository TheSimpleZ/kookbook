<script>
  import { Navigate } from 'svelte-router-spa'

  export let book = {}
</script>

<li class="sidebar-item">
  <Navigate to={book.id}>
    {book.name}
    <i class="material-icons left">book</i>
  </Navigate>
</li>
