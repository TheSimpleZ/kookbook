<script>
  import Icon, { XCircle } from 'svelte-hero-icons'
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  export let orderByProperty
  export let selectMode = false
  export let multiSelect = false
  export let sortOrder

  let sortByCheckbox = false
  $: sortOrder = sortByCheckbox ? 'desc' : 'asc'
</script>

<button class="toolbarItem toolbarButton" on:click={(e) => dispatch('unselectAll', e)}>
  Unselect all<Icon src={XCircle} solid size="20" class="ml-3 icon" />
</button>

<style lang="postcss">
  .toolbarItem {
    @apply flex items-center justify-center px-4 py-2 focus:outline-none;
  }

  .toolbarButton {
    @apply text-gray-600 hover:text-black whitespace-nowrap;
  }
</style>
