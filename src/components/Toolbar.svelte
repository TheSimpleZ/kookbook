<script>
  import ToolbarButton from './ToolbarButton.svelte'

  import Icon, { Plus, Trash, SortAscending, SortDescending, Share, FolderAdd } from 'svelte-hero-icons'
  import { createEventDispatcher } from 'svelte'
  import tippy from '../libs/tippySvelte'

  const dispatch = createEventDispatcher()

  export let orderByProperty
  export let selectMode = false
  export let multiSelect = false
  export let sortOrder

  let sortByCheckbox = false
  $: sortOrder = sortByCheckbox ? 'desc' : 'asc'
</script>

<div class="flex items-stretch divide-x-2 shadow">
  <button class="toolbarItem toolbarButton" on:click={(e) => dispatch('newRecipeClick', e)}>
    <Icon src={Plus} size="20" class="mr-3 icon" />New
  </button>

  <div class="toolbarItem">
    <select
      bind:value={orderByProperty}
      name="orderByProperty"
      class="self-end text-sm border-t-0 border-b border-l-0 border-r-0 border-gray-400 focus:border-b focus:border-gray-400 "
    >
      <option value="createdAt" selected>Created at</option>
      <option value="name">Alphabetically</option>
    </select>
    <label
      class="self-end ml-2 cursor-pointer toolbarButton"
      for="sort"
      use:tippy={{ content: sortByCheckbox ? 'Descending' : 'Ascending' }}
    >
      {#if sortOrder == 'asc'}
        <Icon src={SortAscending} size="24" class="icon" />
      {:else}
        <Icon src={SortDescending} size="24" class="icon" />
      {/if}
    </label>
    <input type="checkbox" name="sort" id="sort" class="hidden" bind:checked={sortByCheckbox} />
  </div>

  <span class="flex ml-auto divide-x-2" class:invisible={!selectMode}>
    {#if !multiSelect}
      <button
        class="toolbarItem toolbarButton"
        on:click={(e) => dispatch('shareClick', e)}
        use:tippy={{ content: 'Share' }}
      >
        <Icon src={Share} size="20" class="mx-3 icon" />
      </button>
    {:else}
      <button
        class="toolbarItem toolbarButton"
        on:click={(e) => dispatch('addToBook', e)}
        use:tippy={{ content: 'Add to recipe book' }}
      >
        <Icon src={FolderAdd} size="20" class="mx-3 icon" />
      </button>
    {/if}

    <button class="toolbarItem toolbarButton" on:click={(e) => dispatch('deleteRecipeClick', e)}>
      <Icon src={Trash} solid size="20" class="mr-3 icon" />Delete
    </button>

    <ToolbarButton />
  </span>
</div>

<style lang="postcss">
  .toolbarItem {
    @apply flex items-center justify-center px-4 py-2 focus:outline-none;
  }

  .toolbarButton {
    @apply text-gray-600 hover:text-black whitespace-nowrap;
  }
</style>
