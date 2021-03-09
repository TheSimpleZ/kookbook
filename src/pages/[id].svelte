<script>
  import Quill from '../components/quill.svelte'
  import { Doc } from 'sveltefire'
  import Icon, { pencil } from '@4mende2/svelte-heroicons'
  import Header from '../components/header.svelte'
  import Dialog from '../components/dialog.svelte'
  import debounce from 'lodash.debounce'

  export let id
  let recipeRef
  let recipe
  let recipeNameInput
  let showRenameDialog = false
  let quill

  const saveRecipe = debounce(
    () => {
      recipeRef.update({
        contents: { ...quill.getContents() },
      })
    },
    2000,
    {
      maxWait: 5000,
    }
  )

  async function saveName() {
    await recipeRef.update({
      name: recipeNameInput,
    })
    closeDialog()
  }

  function closeDialog() {
    showRenameDialog = false
    recipeNameInput = ''
  }
</script>

<Doc
  path={`recipes/${id}`}
  on:data={(e) => {
    recipe = e.detail.data
  }}
  on:ref={(e) => {
    recipeRef = e.detail.ref
  }}
>
  <Header>
    <h1 class="mx-2 text-2xl font-semibold">{recipe.name}</h1>
    <button
      on:click={() => {
        showRenameDialog = !showRenameDialog
        recipeNameInput = recipe.name
      }}><Icon icon={pencil} class="w-4 h-4 m-1" /></button
    >
  </Header>

  <Dialog visible={showRenameDialog} inverted color="green" title="Rename recipe" closable={false}>
    <div class="flex flex-col h-40 p-5">
      <label for="recipe_name" class="block text-sm font-medium text-gray-700">Name</label>
      <input
        id="recipe_name"
        type="text"
        bind:value={recipeNameInput}
        class="mt-0 block w-60 px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
      />
      <div class="flex justify-end gap-4 mt-auto">
        <button class="border-red-500 dialogBtn" on:click={closeDialog}>Cancel</button>
        <button class="border-green-500 dialogBtn" on:click={saveName}>Save</button>
      </div>
    </div>
  </Dialog>

  <main class="flex flex-col items-center flex-1">
    <article class="flex-grow w-3/4 prose max-w-none">
      <Quill bind:quill initalData={recipe.contents} on:text-change={saveRecipe} />
    </article>
  </main>
</Doc>

<style lang="postcss">
  .dialogBtn {
    @apply px-2 py-1 border-4 rounded;
  }
</style>
