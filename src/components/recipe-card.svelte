<script>
  import { Doc } from 'sveltefire'
  import timeAgo from '../libs/timeAgo'
  import { goto } from '@roxi/routify'
  import tippy from 'tippy.js'

  export let recipe
  export let selected = false
  export let selectMode = false
  let showCheckbox = false

  function toggleSelect() {
    selected = !selected
  }
</script>

<div
  class="w-full max-w-sm overflow-hidden bg-white border rounded shadow cursor-pointer"
  class:hover:bg-gray-100={selectMode || selected}
  on:click={() => (selectMode ? toggleSelect() : $goto('/:id', { id: recipe.id }))}
  on:mouseenter={() => {
    showCheckbox = true
  }}
  on:mouseleave={() => {
    showCheckbox = false
  }}
>
  <div class="relative">
    <div class="h-48 bg-center bg-no-repeat bg-cover" style="background-image: url(./images/recipe-book.jpg)" />
  </div>
  <div class="flex justify-between">
    <div class="flex flex-col p-3">
      <h3 class="mr-10 text-sm truncate-2nd">
        {recipe.name}
      </h3>
      <p class="text-xs text-gray-500">
        <Doc path={`users/${recipe.creator}`} let:data={owner} once>
          {owner.displayName} •
          <span
            use:tippy={{
              content: new Date(recipe.updatedAt).toLocaleString(),
              placement: 'bottom',
            }}
          >
            {timeAgo.format(new Date(recipe.updatedAt))}
          </span>
        </Doc>
      </p>
    </div>
    <div class="flex items-center justify-center w-20 hover:bg-gray-100" on:click|stopPropagation={toggleSelect}>
      <input
        type="checkbox"
        on:click|stopPropagation
        class="rounded-full"
        class:invisible={!showCheckbox && !selected}
        bind:checked={selected}
      />
    </div>
  </div>
</div>
