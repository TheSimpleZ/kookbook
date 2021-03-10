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

  function openRenameDialog() {
    showRenameDialog = !showRenameDialog
    recipeNameInput = recipe.name
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
    <div class="flex items-center justify-center flex-1">
      <h1 class="mx-2 text-3xl font-bold">{recipe.name}</h1>
      <button on:click={openRenameDialog}><Icon icon={pencil} class="w-4 h-4 m-1" /></button>
    </div>
  </Header>

  <Dialog visible={showRenameDialog} inverted closable={false}>
    <div class="flex flex-col h-40 p-5">
      <label for="recipe_name" class="block text-sm font-medium text-gray-700">Name</label>
      <input
        id="recipe_name"
        type="text"
        bind:value={recipeNameInput}
        class="mt-0 block w-60 px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
      />
      <div class="flex justify-end gap-4 mt-auto">
        <button class="text-white bg-red-500 dialogBtn hover:bg-red-400" on:click={closeDialog}>Cancel</button>
        <button
          class="text-indigo-500 bg-transparent dialogBtn hover:bg-gray-100 hover:text-indigo-400"
          on:click={saveName}
        >
          Save
        </button>
      </div>
    </div>
  </Dialog>

  <main class="h-full">
    <article class="w-3/4 h-full mx-auto mt-2 prose">
      <Quill
        bind:quill
        initalData={recipe.contents}
        on:text-change={saveRecipe}
        placeholder="Write a fancy recipe here..."
      />
    </article>
  </main>
</Doc>

<style lang="postcss">
  .dialogBtn {
    @apply p-2 px-3 rounded-lg;
  }

  :global(.ql-container) {
    font-size: inherit !important;
  }
</style>
