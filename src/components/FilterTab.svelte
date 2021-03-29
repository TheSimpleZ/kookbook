<script>
  import Icon, { Plus, Filter } from 'svelte-hero-icons'
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  let open = false
</script>

<div class="flex flex-col divide-y">
  <button class="toolbarItem toolbarButton" on:click={(e) => dispatch('newRecipeClick', e)}>
    <Icon src={Plus} size="20" class="icon" />
  </button>
  <button class="toolbarItem toolbarButton" on:click>
    <Icon src={Filter} size="20" class="icon" />
  </button>
</div>
