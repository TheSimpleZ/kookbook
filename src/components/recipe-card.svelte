<script>
  import { Doc } from 'sveltefire'
  import timeAgo from '../libs/timeAgo'
  import { goto } from '@roxi/routify'
  import tippy from 'tippy.js'

  export let recipe
  export let selected = false
</script>

<div
  class="w-full max-w-sm overflow-hidden bg-white border rounded shadow cursor-pointer"
  class:bg-gray-200={selected}
  on:click={(e) => {
    if (e.ctrlKey) selected = !selected
    else $goto('/:id', { id: recipe.id })
  }}
>
  <div class="relative">
    <div class="h-48 bg-center bg-no-repeat bg-cover" style="background-image: url(./images/recipe-book.jpg)" />
  </div>
  <div class="p-3">
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
</div>
