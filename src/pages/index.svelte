<script>
  import { User, Doc, Collection } from 'sveltefire'
  import { Plus, Trash, XCircle } from 'svelte-hero-icons'
  import FirebaseUI from '../components/firebase-ui.svelte'
  import GridList from '../components/grid-list.svelte'
  import Card from '../components/card.svelte'
  import Header from '../components/header.svelte'
  import timeAgo from '../libs/timeAgo'
  import tippy from 'tippy.js'
  import { goto } from '@roxi/routify'

  let selectedRecipes = []
  let orderBy = 'createdAt'
  $: recipeIsSelected = selectedRecipes.some(Boolean)

  function addNewRecipe(recipes, ref, userId) {
    const currentDateTime = new Date().toISOString()
    const newRecipeRegex = /New recipe\d*/
    const newRecipes = recipes.filter((r) => newRecipeRegex.test(r.name)).length
    const name = 'New recipe' + (newRecipes || '')
    ref.add({
      createdAt: currentDateTime,
      updatedAt: currentDateTime,
      creator: userId,
      name,
    })
  }
</script>

<Header />

<User persist={localStorage} let:user>
  <Doc path={`users/${user.uid}`} on:ref={(e) => e.detail.ref.set({ displayName: user.displayName })} once />
  <Collection
    path="recipes"
    query={(ref) => ref.where(`creator`, '==', user.uid).orderBy(orderBy, 'desc')}
    let:data={recipes}
    let:ref={recipesRef}
    log
  >
    <div class="flex items-center divide-x-2 shadow">
      <button class="toolbarItem toolbarButton" on:click={addNewRecipe(recipes, recipesRef, user.uid)}>
        <Plus size="20" solid class="icon" />New recipe
      </button>

      <button
        class="toolbarItem toolbarButton"
        disabled={recipeIsSelected}
        on:click={() => selectedRecipes.forEach((r) => r.ref.delete())}
      >
        <Trash size="20" solid class="icon" />Delete
      </button>

      <select bind:value={orderBy} name="orderBy" class="toolbarItem">
        <option value="createdAt" selected>Created at</option>
        <option value="name">Alphabetically</option>
      </select>
      <input type="checkbox" name="sortAscending" class="toolbarItem" />

      <button
        class="ml-auto toolbarItem toolbarButton"
        on:click={() => {
          selectedRecipes = []
        }}
      >
        Unselect all<XCircle size="20" solid class="icon" />
      </button>
    </div>

    <GridList items={recipes} let:item let:index>
      <Card
        selectMode={recipeIsSelected}
        bind:selected={selectedRecipes[index]}
        on:click={() => $goto('/:id', { id: item.id })}
      >
        <div class="flex flex-col p-3">
          <h3 class="mr-10 text-sm truncate-2nd">
            {item.name}
          </h3>
          <p class="text-xs text-gray-500">
            <Doc path={`users/${item.creator}`} let:data={owner} once>
              {owner.displayName} •
              <span
                use:tippy={{
                  content: new Date(item.updatedAt).toLocaleString(),
                  placement: 'bottom',
                }}
              >
                {timeAgo.format(new Date(item.updatedAt))}
              </span>
            </Doc>
          </p>
        </div>
      </Card>
    </GridList>
  </Collection>

  <div slot="signed-out">
    <Header />
    <FirebaseUI />
  </div>
</User>

<style>
  .toolbarItem {
    @apply px-4 py-3 disabled:opacity-50 focus:outline-none;
  }

  .toolbarButton {
    @apply text-gray-600 hover:text-black;
  }
</style>
