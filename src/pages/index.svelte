<script>
  import { User, Doc, Collection } from 'sveltefire'
  import { Plus, Trash } from 'svelte-hero-icons'
  import FirebaseUI from '../components/firebase-ui.svelte'
  import RecipeGrid from '../components/recipe-grid.svelte'
  import Header from '../components/header.svelte'
  import Toolbar from '../components/toolbar/toolbar.svelte'
  import ToolbarButton from '../components/toolbar/button.svelte'
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

<Header />

<User persist={localStorage} let:user>
  <Doc path={`users/${user.uid}`} log on:ref={(e) => e.detail.ref.set({ displayName: user.displayName })} once />
  <Collection
    path="recipes"
    query={(ref) => ref.where(`creator`, '==', user.uid).orderBy('createdAt', 'desc')}
    let:data={recipes}
    let:ref={recipesRef}
    log
  >
    <Toolbar>
      <ToolbarButton on:click={addNewRecipe(recipes, recipesRef, user.uid)}>
        <Plus size="20" class="icon" />New recipe
      </ToolbarButton>
      <ToolbarButton
        tooltip="Select a recipe"
        disabled={selectedRecipes.length < 1}
        on:click={() => selectedRecipes.forEach((r) => r.ref.delete())}
      >
        <Trash size="20" class="icon" />Delete
      </ToolbarButton>
    </Toolbar>
    <RecipeGrid {recipes} bind:selectedRecipes />
  </Collection>

  <div slot="signed-out">
    <Header />
    <FirebaseUI />
  </div>
</User>
