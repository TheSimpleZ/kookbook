<script>
  import { FirebaseApp, User, Doc, Collection } from 'sveltefire'
  import FirebaseUI from '../components/firebase-ui.svelte'
  import RecipeTable from '../components/recipe-table.svelte'
</script>

<!-- 2. 😀 Get the current user -->
<User persist={localStorage} let:user let:auth>
  <Doc path={`users/${user.uid}`} log on:ref={(e) => e.detail.ref.set({ displayName: user.displayName })} once />
  <Collection path="recipes" let:data={recipes} let:ref={recipesRef} log>
    <RecipeTable {recipes} />
  </Collection>

  <div slot="signed-out"><FirebaseUI /></div>
</User>
