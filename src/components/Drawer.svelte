<script>
  import Icon, { Plus, Filter, X } from 'svelte-hero-icons'
  import tippy from '@/libs/tippySvelte'
  import CreateNewRecipe from './drawerTabs/CreateNewRecipe.svelte'
  import DefaultTab from './drawerTabs/DefaultTab.svelte'
  import SortFilter from './drawerTabs/SortFilter.svelte'
  import { fade } from 'svelte/transition'

  let overlay = true
  let open = false
  let isClosed = false

  let selectedTabIndex = -1

  const tabs = [
    {
      icon: Plus,
      component: CreateNewRecipe,
      tooltip: 'New recipe',
    },
    {
      icon: Filter,
      component: SortFilter,
      tooltip: 'Filter & sort',
    },
  ]

  $: currentTabComponent = tabs[selectedTabIndex]?.component ?? DefaultTab
</script>

{#if open && overlay}
  <div
    on:click={() => {
      open = false
    }}
    transition:fade={{ duration: 300 }}
    class="absolute top-0 left-0 z-10 w-screen h-screen bg-gray-900 opacity-30"
  />
{/if}

<div class="fixed z-10 flex transition-all top-40 rounded-r-md">
  <div
    class="grid overflow-hidden transition-all bg-white border-t border-b max-w-0 rounded-br-md"
    class:max-w-full={open}
  >
    <svelte:component this={currentTabComponent} bind:visible={open} />
  </div>
  <div class="self-start overflow-hidden bg-white border divide-y rounded-r-md">
    {#each tabs as { icon, tooltip }, tabIndex}
      <button
        use:tippy={{ content: open && selectedTabIndex === tabIndex ? 'Close' : tooltip, placement: 'right' }}
        class="flex items-center justify-center p-4 text-gray-600 focus:outline-none hover:text-black whitespace-nowrap hover:bg-indigo-50"
        class:bg-indigo-100={selectedTabIndex === tabIndex && open}
        on:click={() => {
          if (selectedTabIndex === tabIndex || !open) {
            open = !open
          }

          selectedTabIndex = tabIndex
        }}
      >
        <Icon src={open && selectedTabIndex === tabIndex ? X : icon} size="20" class="icon" />
      </button>
    {/each}
  </div>
</div>
