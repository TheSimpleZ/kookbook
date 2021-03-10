<script>
  import { User, Doc, Collection } from 'sveltefire'
  import Icon, { plus, trash } from '@4mende2/svelte-heroicons'
  import FirebaseUI from '../components/firebase-ui.svelte'
  import RecipeGrid from '../components/recipe-grid.svelte'
  import Header from '../components/header.svelte'
  import tippy from 'tippy.js'

  let selectedRecipes = []

  function addNewRecipe(recipes, ref, userId) {
    const currentDateTime = new Date().toISOString()
    const newRecipeRegex = /New recipe\d*/
    const newRecipes = recipes.filter((r) => newRecipeRegex.test(r.name)).length
    const name = 'New recipe' + (newRecipes || '')
    ref.add({
      createdAt: currentDateTime,
      updatedAt: currentDateTime,
      roles: {
        [userId]: 'owner',
      },
      name,
    })
  }
</script>

<!-- 2. 😀 Get the current user -->
<User persist={localStorage} let:user let:auth>
  <Doc path={`users/${user.uid}`} log on:ref={(e) => e.detail.ref.set({ displayName: user.displayName })} once />
  <Collection
    path="recipes"
    query={(ref) => ref.orderBy('createdAt', 'desc')}
    let:data={recipes}
    let:ref={recipesRef}
    log
  >
    <Header>
      <div class="flex items-center justify-center flex-1 gap-3 divide-x-2">
        <button class="toolbarBtn" on:click={addNewRecipe(recipes, recipesRef, user.uid)}>
          <Icon icon={plus} class="icon" />New
        </button>

        <span
          use:tippy={{
            content: 'Use ctrl+click to select a recipe',
            placement: 'bottom',
          }}
        >
          <button
            class="toolbarBtn"
            on:click={() => selectedRecipes.forEach((r) => r.ref.delete())}
            disabled={selectedRecipes.length < 1}
          >
            <Icon icon={trash} class="icon" />Delete
          </button>
        </span>
      </div>
    </Header>

    <RecipeGrid {recipes} bind:selectedRecipes />
  </Collection>

  <div slot="signed-out"><FirebaseUI /></div>
</User>

<style lang="postcss">
  .toolbarBtn {
    @apply pr-2 disabled:opacity-50;
  }
</style>
