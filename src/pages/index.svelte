<script>
  import { User, Doc, Collection } from 'sveltefire'
  import Icon, { plus } from '@4mende2/svelte-heroicons'

  import FirebaseUI from '../components/firebase-ui.svelte'
  import RecipeTable from '../components/recipe-table.svelte'
  import Header from '../components/header.svelte'

  function addNewRecipe(recipes, ref, userId) {
    const currentDateTime = new Date().toISOString()
    const baseName = 'New recipe'
    const name = baseName + recipes.filter((r) => r.name.startsWith(baseName)).length

    ref.add({
      createdAt: currentDateTime,
      updatedAt: currentDateTime,
      roles: {
        [userId]: 'owner',
      },
      name,
      contents: {
        ops: [
          { insert: name },
          {
            attributes: {
              header: 1,
              align: 'center',
            },
            insert: '\n',
          },
        ],
      },
    })
  }
</script>

<!-- 2. 😀 Get the current user -->
<User persist={localStorage} let:user let:auth>
  <Doc path={`users/${user.uid}`} log on:ref={(e) => e.detail.ref.set({ displayName: user.displayName })} once />
  <Collection path="recipes" let:data={recipes} let:ref={recipesRef} log>
    <Header>
      <button on:click={addNewRecipe(recipes, recipesRef, user.uid)}><Icon icon={plus} class="icon" />New recipe</button
      >
    </Header>

    <RecipeTable {recipes} />
  </Collection>

  <div slot="signed-out"><FirebaseUI /></div>
</User>
