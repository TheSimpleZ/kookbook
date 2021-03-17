<script>
  import { Plus, Trash, XCircle, SortAscending, SortDescending, Share } from 'svelte-hero-icons'
  import { createEventDispatcher } from 'svelte'
  import tippy from '../libs/tippySvelte'

  const dispatch = createEventDispatcher()

  export let orderBy
  export let selectMode = false
  export let sortBy

  let sortByCheckbox = false
  $: sortBy = sortByCheckbox ? 'desc' : 'asc'
</script>

<div class="flex items-stretch divide-x-2 shadow">
  <button class="toolbarItem toolbarButton" on:click={(e) => dispatch('newRecipeClick', e)}>
    <Plus size="20" solid class="icon" />New recipe
  </button>

  <div class="toolbarItem">
    <select bind:value={orderBy} name="orderBy" class="text-sm">
      <option value="createdAt" selected>Created at</option>
      <option value="name">Alphabetically</option>
    </select>
    <label for="sort" use:tippy={{ content: sortByCheckbox ? 'Descending' : 'Ascending' }}>
      {#if sortBy == 'asc'}
        <SortAscending size="20" solid class="icon" />
      {:else}
        <SortDescending size="20" solid class="icon" />
      {/if}
    </label>
    <input type="checkbox" name="sort" id="sort" class="hidden ml-1" bind:checked={sortByCheckbox} />
  </div>

  <span class="flex ml-auto divide-x-2" class:invisible={!selectMode}>
    <button
      class="toolbarItem toolbarButton"
      on:click={(e) => dispatch('shareClick', e)}
      use:tippy={{ content: 'Share' }}
    >
      <Share size="20" solid class="icon" />
    </button>
    <button class="toolbarItem toolbarButton" on:click={(e) => dispatch('deleteRecipeClick', e)}>
      <Trash size="20" solid class="icon" />Delete
    </button>

    <button class="toolbarItem toolbarButton" on:click={(e) => dispatch('unselectAll', e)}>
      Unselect all<XCircle size="20" solid class="icon" />
    </button>
  </span>
</div>

<style lang="postcss">
  .toolbarItem {
    @apply flex items-center justify-center px-4 py-2 disabled:opacity-50 focus:outline-none;
  }

  .toolbarButton {
    @apply text-gray-600 hover:text-black;
  }
</style>
