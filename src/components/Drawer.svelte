<script>
  import Icon, { Plus, Filter, X } from 'svelte-hero-icons'
  import tippy from '@/libs/tippySvelte'
  import { fade } from 'svelte/transition'

  let open = false
  let selectedTab = null
  let contentHeight = null
  let buttonsHeight = null

  function closeDrawer() {
    open = false
    setTimeout(() => {
      selectedTab = null
    }, 300)
  }

  export let tabs
  $: visibleTabs = tabs.filter((t) => t.showIf === undefined || t.showIf)

  $: isActive = (tab) => tab === selectedTab?.component
</script>

{#if open}
  <div
    on:click={closeDrawer}
    transition:fade={{ duration: 300 }}
    class="fixed top-0 left-0 z-10 w-screen h-screen bg-gray-900 opacity-30"
  />
{/if}

<div class="fixed z-10 flex top-40 rounded-r-md">
  <div
    class="grid overflow-hidden transition-all duration-300 bg-white border-t border-b w-90 -ml-90"
    class:!ml-0={open}
    bind:offsetHeight={contentHeight}
    class:rounded-br-md={contentHeight > buttonsHeight}
  >
    <slot {selectedTab} {closeDrawer} />
  </div>
  <div
    class="self-start overflow-hidden bg-white border divide-y rounded-r-md transition-all"
    class:shadow-md={!open}
    bind:offsetHeight={buttonsHeight}
  >
    {#each visibleTabs as tab}
      {#if isActive(tab.component)}
        <button
          use:tippy={{ content: 'Close', placement: 'right' }}
          class="flex items-center justify-center p-4 text-gray-600 focus:outline-none hover:text-black whitespace-nowrap hover:bg-indigo-50 bg-indigo-100"
          on:click={closeDrawer}
        >
          <Icon src={X} size="20" class="icon" />
        </button>
      {:else}
        <button
          use:tippy={{ content: tab.tooltip, placement: 'right' }}
          class="flex items-center justify-center p-4 text-gray-600 focus:outline-none hover:text-black whitespace-nowrap hover:bg-indigo-50"
          on:click={() => {
            open = true
            selectedTab = tab
          }}
        >
          <Icon src={tab.icon} size="20" class="icon" />
        </button>
      {/if}
    {/each}
  </div>
</div>
