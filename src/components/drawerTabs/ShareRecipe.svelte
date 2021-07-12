<script>
  import { firebase } from '@/libs/firebase'
  import { Collection } from 'sveltefire'

  export let selectedRecipes
  export let onFinished

  let value = ''

  function addRecipesToCollection() {
    selectedRecipes.forEach((r) => {
      r.ref.update({
        collections: firebase.firestore.FieldValue.arrayUnion(value),
      })
    })
  }
</script>

<div class="flex flex-col justify-between w-full px-10 py-5">
  <div class="flex flex-col p-5">
    <label for="recipe_name" class="block text-sm font-medium text-gray-700">
      Email address to share recipe with
    </label>
    <input
      id="recipe_name"
      type="text"
      placeholder="User email address"
      bind:value
      class="mt-0 block w-60 px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
    />
  </div>
  <Collection path="users" query={(ref) => ref.where('email', '==', value)} let:data={users}>
    {#if users.length > 0}
      found user
    {:else}
      no user
    {/if}
  </Collection>
  <button
    class="btn text-indigo-500 mt-5 py-2 mx-10 hover:bg-gray-100"
    on:click={() => {
      onFinished()
    }}
  >
    Share
  </button>
</div>
