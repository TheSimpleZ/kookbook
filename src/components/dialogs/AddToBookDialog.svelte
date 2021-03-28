<script>
  import Dialog from './Dialog.svelte'
  import { firebase } from '@/libs/firebase'

  export let visible
  export let user
  export let collections = []
  export let recipes
  let value = ''

  function closeDialog() {
    visible = false
    value = ''
  }

  function addRecipesToCollection() {
    recipes.forEach((r) => {
      r.ref.update({
        collections: firebase.firestore.FieldValue.arrayUnion(value),
      })
    })
    closeDialog()
  }
</script>

<Dialog title="Add to recipe book" bind:visible on:cancel={closeDialog} on:ok={addRecipesToCollection}>
  <div class="flex flex-col p-5">
    <label for="recipe_name" class="block text-sm font-medium text-gray-700"> Choose a new book name </label>
    <input
      id="recipe_name"
      type="text"
      placeholder="Search for or add a book.."
      bind:value
      class="mt-0 block w-60 px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
    />
    {#if collections.length > 0}
      <p class="block mt-5 text-sm font-medium text-gray-700">Or pick one from the list below</p>
      <ul class="p-5">
        {#each collections as collection}
          <li>{collection}</li>
        {/each}
      </ul>
    {/if}
  </div>
</Dialog>
