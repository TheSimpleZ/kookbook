<script>
  import { Doc } from 'sveltefire'
  import timeAgo from '../libs/timeAgo'
  import { goto } from '@roxi/routify'

  export let recipe

  const ownerId = Object.keys(recipe.roles).find((key) => recipe.roles[key] === 'owner')
</script>

<div
  class="w-full max-w-sm overflow-hidden rounded border bg-white shadow"
  on:click={() => $goto('/:id', { id: recipe.id })}
>
  <div class="relative">
    <div class="h-48 bg-cover bg-no-repeat bg-center" style="background-image: url(./images/recipe-book.jpg)" />
  </div>
  <div class="p-3">
    <h3 class="mr-10 text-sm truncate-2nd">
      <a class="hover:text-blue-500" href="/huawwei-p20-pro-complete-set-with-box-a.7186128376">{recipe.name}</a>
    </h3>
    <div class="flex items-start justify-between">
      <p class="text-xs text-gray-500">Quezon City, Metro Manila</p>
      <button class="outline text-xs text-gray-500 hover:text-blue-500" title="Bookmark this ad"
        ><i class="far fa-bookmark" /></button
      >
    </div>
    <p class="text-xs text-gray-500">
      <Doc path={`users/${ownerId}`} let:data={owner} once>
        <a href="#" class="hover:underline hover:text-blue-500">{owner.displayName}</a> • {timeAgo.format(
          new Date(recipe.updatedAt)
        )}
      </Doc>
    </p>
  </div>
</div>
