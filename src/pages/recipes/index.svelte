<script>
  import { Doc, Collection } from 'sveltefire'
  import GridList from '@/components/GridList.svelte'
  import Card from '@/components/Card.svelte'
  import timeAgo from '@/libs/timeAgo'
  import tippy from 'tippy.js'
  import { goto } from '@roxi/routify'
  // import Toolbar from '@/components/Toolbar.svelte'
  import Drawer from '@/components/Drawer.svelte'
  import ShareDialog from '@/components/dialogs/ShareDialog.svelte'
  import AddToBookDialog from '@/components/dialogs/AddToBookDialog.svelte'
  import { SpinLine } from 'svelte-loading-spinners'
  import orderBy from 'lodash.orderby'

  const recipeSorters = {
    name: (r) => r.name?.toLowerCase(),
  }

  export let scoped
  $: ({ user } = scoped)

  let showShareDialog = false
  let showAddToBookDialog = false
  let showNameDialog = false
  let orderByProperty = 'createdAt'
  let selectedRecipeIds = new Set()
  let sortOrder
  let unorderedRecipes
  let selectedCollection
  $: orderedRecipes = orderBy(unorderedRecipes, [recipeSorters[orderByProperty] || orderByProperty], sortOrder)
  $: recipes = selectedCollection
    ? orderedRecipes.filter((r) => r.collections?.includes(selectedCollection))
    : orderedRecipes
  $: collections = recipes.filter((r) => r.collections).flatMap((r) => r.collections)
  $: selectedRecipes = recipes.filter((r) => selectedRecipeIds.has(r.id))
  $: selectMode = selectedRecipeIds.size > 0

  function gotoRecipe(id) {
    $goto('./:id', { id })
  }
</script>

<!-- <Toolbar
    {selectMode}
    {user}
    {collections}
    multiSelect={Object.keys(selectedRecipes).length > 1}
    bind:sortOrder
    bind:orderByProperty
    bind:selectedCollection
    on:newRecipeClick={() => {
      showNameDialog = true
    }}
    on:deleteRecipeClick={() => Object.values(selectedRecipes).forEach((r) => r.ref.delete())}
    on:unselectAll={() => {
      selectedRecipes = {}
    }}
    on:shareClick={() => {
      showShareDialog = true
    }}
    on:addToBook={() => {
      showAddToBookDialog = true
    }}
  /> -->
<Drawer bind:orderByProperty />
<div class="ml-10">
  <Collection
    path="recipes"
    query={(ref) => ref.where(`readers`, 'array-contains', user.uid)}
    let:data={readableRecipes}
  >
    <Collection
      path="recipes"
      query={(ref) => ref.where(`createdBy`, '==', user.uid)}
      on:data={(e) => {
        unorderedRecipes = [...e.detail.data, ...readableRecipes]
      }}
      let:ref
    >
      <GridList items={recipes} let:item>
        <Card
          bind:selectMode
          on:change={({ detail: selected }) => {
            if (selected) {
              selectedRecipeIds.add(item.id)
            } else {
              selectedRecipeIds.delete(item.id)
            }
            selectedRecipeIds = selectedRecipeIds
          }}
          on:click={() => gotoRecipe(item.id)}
        >
          <div class="flex flex-col p-3">
            <h3 class="text-sm truncate-2nd">
              {item.name}
            </h3>
            <p class="text-xs text-gray-500 line-clamp-1">
              <Doc path={`users/${item.createdBy}`} let:data={owner}>
                {owner.displayName} •
                <span
                  use:tippy={{
                    content: item.updatedAt?.toDate().toLocaleString() || '',
                    placement: 'bottom',
                  }}
                >
                  {item.updatedAt && timeAgo.format(item.updatedAt.toDate())}
                </span>
              </Doc>
            </p>
          </div>
        </Card>
      </GridList>

      <ShareDialog bind:visible={showShareDialog} recipe={selectedRecipes[0]} />
      <AddToBookDialog bind:visible={showAddToBookDialog} {user} {collections} recipes={selectedRecipes} />

      <div class="flex items-center justify-center flex-1" slot="loading">
        <SpinLine size="40" color="#4B5563" unit="rem" duration="6s" />
      </div>
    </Collection>
  </Collection>
</div>
