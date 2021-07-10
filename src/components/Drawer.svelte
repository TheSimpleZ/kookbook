<script>
  import Icon, { Plus, Filter, X } from 'svelte-hero-icons'
  import tippy from '@/libs/tippySvelte'
  import CreateNewRecipe from './drawerTabs/CreateNewRecipe.svelte'
  import DefaultTab from './drawerTabs/DefaultTab.svelte'
  import SortFilter from './drawerTabs/SortFilter.svelte'
  import { fade } from 'svelte/transition'

  let overlay = true
  let open = false

  let selectedTab = null

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

  $: isActive = (tab) => tab === selectedTab
</script>

{#if open && overlay}
  <div
    on:click={() => {
      open = false
    }}
    transition:fade={{ duration: 300 }}
    class="fixed top-0 left-0 z-10 w-screen h-screen bg-gray-900 opacity-30"
  />
{/if}

<div class="fixed z-10 flex transition-all top-40 rounded-r-md">
  <div
    class="grid overflow-hidden transition-all bg-white border-t border-b max-w-0 rounded-br-md"
    class:max-w-full={open}
  >
    <svelte:component this={selectedTab} bind:visible={open} />
  </div>
  <div class="self-start overflow-hidden bg-white border divide-y rounded-r-md" class:shadow-md={!open}>
    {#each tabs as { component: currentTab, icon, tooltip }}
      <button
        use:tippy={{ content: open && isActive(currentTab) ? 'Close' : tooltip, placement: 'right' }}
        class="flex items-center justify-center p-4 text-gray-600 focus:outline-none hover:text-black whitespace-nowrap hover:bg-indigo-50"
        class:bg-indigo-100={isActive(currentTab) && open}
        on:click={() => {
          if (isActive(currentTab) || !open) {
            open = !open
          }

          selectedTab = currentTab
        }}
      >
        <Icon src={open && isActive(currentTab) ? X : icon} size="20" class="icon" />
      </button>
    {/each}
  </div>
</div>
