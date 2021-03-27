<script>
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  export let selected = false
  export let selectMode = false
  export let imageUrl = './images/recipe-book.jpg'
  let showCheckbox = false

  function toggleSelect() {
    selected = !selected
    dispatch('change', selected)
  }
</script>

<div
  class="w-full max-w-sm overflow-hidden bg-white border rounded shadow cursor-pointer"
  class:hover:bg-gray-100={selectMode}
  on:click={(e) => (selectMode ? toggleSelect() : dispatch('click', e.detail))}
  on:mouseenter={() => {
    showCheckbox = true
  }}
  on:mouseleave={() => {
    showCheckbox = false
  }}
>
  <div class="relative">
    <div class="h-48 bg-center bg-no-repeat bg-cover" style="background-image: url({imageUrl})" />
  </div>
  <div class="flex">
    <slot />
    <div
      class="flex items-center justify-center w-20 ml-auto hover:bg-gray-100"
      on:click|stopPropagation={toggleSelect}
    >
      <input
        type="checkbox"
        on:click|stopPropagation={toggleSelect}
        class="rounded"
        class:invisible={!showCheckbox && !selected}
        bind:checked={selected}
      />
    </div>
  </div>
</div>
