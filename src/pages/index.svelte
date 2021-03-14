<script>
  import { User, Doc, Collection } from 'sveltefire'
  import { Plus, Trash } from 'svelte-hero-icons'
  import FirebaseUI from '../components/firebase-ui.svelte'
  import RecipeGrid from '../components/recipe-grid.svelte'
  import Header from '../components/header.svelte'
  import Toolbar from '../components/toolbar.svelte'
  let selectedRecipes = []

  function addNewRecipe(recipes, ref, userId) {
    const currentDateTime = new Date().toISOString()
    const newRecipeRegex = /New recipe\d*/
    const newRecipes = recipes.filter((r) => newRecipeRegex.test(r.name)).length
    const name = 'New recipe' + (newRecipes || '')
    ref.add({
      createdAt: currentDateTime,
      updatedAt: currentDateTime,
      creator: userId,
      name,
    })
  }
</script>

<!-- 2. 😀 Get the current user -->
<User persist={localStorage} let:user let:auth>
  <Doc path={`users/${user.uid}`} log on:ref={(e) => e.detail.ref.set({ displayName: user.displayName })} once />
  <Collection
    path="recipes"
    query={(ref) => ref.where(`creator`, '==', user.uid).orderBy('createdAt', 'desc')}
    let:data={recipes}
    let:ref={recipesRef}
    log
  >
    <Header>
      <div class="flex items-center justify-center flex-1 gap-3 divide-x-2">
        <button class="toolbarBtn" on:click={addNewRecipe(recipes, recipesRef, user.uid)}>
          <Plus size="20" class="icon" />New
        </button>
        <button
          class="toolbarBtn"
          on:click={() => selectedRecipes.forEach((r) => r.ref.delete())}
          disabled={selectedRecipes.length < 1}
        >
          <Trash size="20" class="icon" />Deleteeee
        </button>
      </div>
    </Header>
    <Toolbar />
    <RecipeGrid {recipes} bind:selectedRecipes />
  </Collection>

  <div slot="signed-out">
    <Header />
    <FirebaseUI />
  </div>
</User>

<style lang="postcss">
  .toolbarBtn {
    @apply pr-2 disabled:opacity-50;
  }
</style>
