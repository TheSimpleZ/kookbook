<script>
  import Dialog from './dialog.svelte'
  import { Collection } from 'sveltefire'
  import Icon, { Plus } from 'svelte-hero-icons'
  import { firebase } from '@/libs/firebase'

  export let visible
  export let user
  let value = ''
  $: endOfSearchString = value.replace(/.$/, (c) => String.fromCharCode(c.charCodeAt(0) + 1))

  function closeDialog() {
    visible = false
  }

  function startsWithQuery(ref, field) {
    const query = ref.limit(10)

    return value ? query.where(field, '>=', value).where(field, '<', endOfSearchString) : query
  }
</script>

<Dialog title="Add to recipe book" bind:visible on:cancel={closeDialog} on:ok={closeDialog}>
  <div class="flex flex-col p-5">
    <label for="recipe_name" class="block text-sm font-medium text-gray-700">Book name</label>
    <input
      id="recipe_name"
      type="text"
      placeholder="Search for or add a book.."
      bind:value
      class="mt-0 block w-60 px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
    />
  </div>
  <ul class="p-5">
    <Collection
      path="books"
      query={(ref) => startsWithQuery(ref.where(`createdBy`, '==', user.uid), 'name')}
      let:data={books}
      let:ref
    >
      {#if books.length > 0}
        {#each books as book}
          <li>{book.id}</li>
        {/each}
      {:else}
        <li>
          <button
            class="flex items-center"
            on:click={() => {
              const currentDateTime = firebase.firestore.FieldValue.serverTimestamp()
              ref.add({
                createdAt: currentDateTime,
                updatedAt: currentDateTime,
                createdBy: user.uid,
                name: value,
              })
            }}
          >
            <Icon src={Plus} size="20" class="mr-3 icon" />Create new
          </button>
        </li>
      {/if}
    </Collection>
  </ul>
</Dialog>
