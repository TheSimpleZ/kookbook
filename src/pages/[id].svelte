<script>
  import CkEditor from '../components/ckeditor.svelte'
  import { Doc } from 'sveltefire'
  import { Pencil } from 'svelte-hero-icons'
  import Header from '../components/header.svelte'
  import Dialog from '../components/dialog.svelte'
  import { Storage } from '../config/firebase'
  import tippy from 'tippy.js'

  export let id
  let recipeRef
  let recipe
  let recipeNameInput
  let showRenameDialog = false

  const documentPath = `recipes/${id}`

  const saveRecipe = (data) => {
    return recipeRef.update({
      contents: data,
    })
  }

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

  function removeDeletedImages({ detail: urls }) {
    for (const url of urls) {
      Storage.refFromURL(url).delete()
    }
  }
</script>

<Doc
  path={documentPath}
  on:data={(e) => {
    recipe = e.detail.data
  }}
  on:ref={(e) => {
    recipeRef = e.detail.ref
  }}
>
  <main class="flex flex-col min-h-screen">
    <Header>
      <div class="flex items-center justify-center flex-1">
        <h1 class="mx-2 text-3xl font-bold">{recipe.name}</h1>
        <button
          on:click={openRenameDialog}
          use:tippy={{
            content: 'Rename',
            placement: 'bottom',
          }}
        >
          <Pencil size="20" class="icon" />
        </button>
      </div>
    </Header>

    <article class="flex items-stretch flex-grow w-3/4 mx-auto mt-2 prose lg:prose-lg">
      <CkEditor
        saveData={saveRecipe}
        initialData={recipe.contents}
        imageUploadPath={documentPath + '/'}
        placeholder="Enter your recipe here..."
        on:imagesDeleted={removeDeletedImages}
      />
    </article>
  </main>
</Doc>

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

<style lang="postcss">
  .dialogBtn {
    @apply p-2 px-3 rounded-lg;
  }

  :global(.ql-container) {
    font-size: inherit !important;
    height: inherit !important;
    @apply flex-1;
  }
</style>
