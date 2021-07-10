<script>
  import tippy from '@/libs/tippySvelte'
  import Icon, { SortAscending, SortDescending } from 'svelte-hero-icons'
  import { send, receive } from '../../libs/crossfade'

  export let selectedCollection
  export let collections = []

  export let sortOrder
  export let orderByProperty

  let sortByCheckbox = false
  $: sortOrder = sortByCheckbox ? 'desc' : 'asc'
</script>

<div class="flex flex-col p-10 prose el" in:receive={{ key: 'tab' }} out:send={{ key: 'tab' }}>
  <h4>Sort By</h4>
  <div class="flex">
    <select
      bind:value={orderByProperty}
      name="orderByProperty"
      class="self-end flex-1 text-sm text-gray-600 border-t-0 border-b border-l-0 border-r-0 border-gray-400 focus:border-b focus:border-gray-400 "
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
  <h4>Filter By</h4>
  <div class="flex">
    <select
      bind:value={selectedCollection}
      name="bookFilter"
      class="self-end flex-1 text-sm text-gray-600 border-t-0 border-b border-l-0 border-r-0 border-gray-400 focus:border-b focus:border-gray-400 "
    >
      <option selected value> All books </option>
      {#each collections as collection}
        <option value={collection}>{collection}</option>
      {/each}
    </select>
  </div>
</div>

<style>
  .el {
    grid-column: 1/2;
    grid-row: 1/2;
  }
</style>
