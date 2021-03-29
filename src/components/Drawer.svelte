<script>
  import Icon, { Plus, Filter } from 'svelte-hero-icons'
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  let open = false
</script>

<aside class="fixed z-10 flex justify-center bg-white border shadow-md top-20">
  <div
    class="flex flex-col h-0 p-10 overflow-hidden transition-all duration-1000 border-r"
    class:w-full={open}
    class:w-0={!open}
  >
    Enter a name
    <input type="text" />
    Enter a name
    <input type="text" />Enter a name
    <input type="text" />Enter a name
    <input type="text" />Enter a name
    <input type="text" />Enter a name
    <input type="text" />Enter a name
    <input type="text" />Enter a name
    <input type="text" />Enter a name
    <input type="text" />Enter a name
  </div>

  <div class="flex flex-col divide-y">
    <button class="toolbarItem toolbarButton" on:click={(e) => dispatch('newRecipeClick', e)}>
      <Icon src={Plus} size="20" class="icon" />
    </button>
    <button
      class="toolbarItem toolbarButton"
      on:click={(e) => {
        open = !open
      }}
    >
      <Icon src={Filter} size="20" class="icon" />
    </button>
  </div>
</aside>

<style lang="postcss">
  .toolbarItem {
    @apply flex items-center justify-center p-4 focus:outline-none;
  }

  .toolbarButton {
    @apply text-gray-600 hover:text-black whitespace-nowrap flex items-center justify-center;
  }

  .panel {
    transition: width 2s, height 2s;
  }

  .panel:hover {
    width: 100%;
    height: 100%;
  }
</style>
