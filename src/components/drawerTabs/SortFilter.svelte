<script>
  import tippy from '@/libs/tippySvelte'
  import Icon, { SortAscending, SortDescending } from 'svelte-hero-icons'
  import { Collection, User } from 'sveltefire'
  import { canRead } from '@/libs/firestoreQueries'

  export let selectedBook

  export let sortOrder
  export let orderByProperty

  let books = []

  let sortByCheckbox = false
  $: sortOrder = sortByCheckbox ? 'desc' : 'asc'
</script>

<div class="flex flex-col p-10 prose">
  <h4>Sort By</h4>
  <div class="flex">
    <select
      bind:value={orderByProperty}
      name="orderByProperty"
      class="self-end flex-1 text-sm text-gray-600 border-t-0 border-b border-l-0 border-r-0 border-gray-400 focus:border-b focus:border-gray-400"
    >
      <option value="createdAt" selected>Created at</option>
      <option value="name">Alphabetically</option>
    </select>
    <label
      class="self-end ml-2 cursor-pointer toolbarButton"
      for="sort"
      use:tippy={{ content: sortByCheckbox ? 'Descending' : 'Ascending' }}
    >
      <Icon src={sortOrder == 'asc' ? SortAscending : SortDescending} size="24" class="icon" />
    </label>
    <input type="checkbox" name="sort" id="sort" class="hidden" bind:checked={sortByCheckbox} />
  </div>
  <h4>Book</h4>
  <div class="flex">
    <User persist={localStorage} let:user>
      <Collection
        path="books"
        query={canRead(user)}
        on:data={(e) => {
          // let:data caused issues with the each block
          // hence this syntax
          books = e.detail.data || []
        }}
      >
        <select
          bind:value={selectedBook}
          name="bookFilter"
          class="self-end flex-1 text-sm text-gray-600 border-t-0 border-b border-l-0 border-r-0 border-gray-400 focus:border-b focus:border-gray-400"
        >
          <option selected value>All</option>
          <option selected value={null}>Recipes not in a book</option>
          {#each books as book}
            <option value={book}>{book.name}</option>
          {/each}
        </select>
      </Collection>
    </User>
  </div>
</div>
