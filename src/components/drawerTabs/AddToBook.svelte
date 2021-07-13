<script>
  import { firebase } from '@/libs/firebase'
  import { Collection, User } from 'sveltefire'
  import { canWrite } from '@/libs/firestoreQueries'

  export let books = []
  export let selectedRecipes
  export let onFinished

  let value = ''

  function addRecipesToBook() {
    selectedRecipes.forEach((r) => {
      r.ref.update({
        books: firebase.firestore.FieldValue.arrayUnion(value),
      })
    })
  }
</script>

<div class="flex flex-col justify-between w-full px-10 py-5">
  <div class="flex flex-col p-5">
    <label for="recipe_name" class="block text-sm font-medium text-gray-700">Choose a new book name</label>
    <input
      id="recipe_name"
      type="text"
      placeholder="Search for or add a book.."
      bind:value
      class="mt-0 block w-60 px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
    />
    {#if books.length > 0}
      <p class="block mt-5 text-sm font-medium text-gray-700">Or pick one from the list below</p>
      <ul class="p-5">
        {#each books as collection}
          <li>{collection}</li>
        {/each}
      </ul>
    {/if}
  </div>
  <User persist={localStorage} let:user>
    <button
      class="btn text-indigo-500 mt-5 py-2 mx-10 hover:bg-gray-100"
      on:click={() => {
        addRecipesToBook()
        onFinished()
      }}
    >
      Add
    </button>
    <Collection path="books" query={canWrite(user)} let:ref>
      <button
        class="btn text-indigo-500 mt-5 py-2 mx-10 hover:bg-gray-100"
        on:click={() => {
          addRecipesToBook()
          onFinished()
        }}
      >
        Add
      </button>
    </Collection>
  </User>
</div>
