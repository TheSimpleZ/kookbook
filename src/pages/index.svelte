<script>
  import { User, Doc, Collection } from 'sveltefire'
  import GridList from '../components/grid-list.svelte'
  import Card from '../components/card.svelte'
  import Header from '../components/header.svelte'
  import timeAgo from '../libs/timeAgo'
  import tippy from 'tippy.js'
  import { goto } from '@roxi/routify'
  import Toolbar from '../components/toolbar.svelte'
  import ShareDialog from '../components/shareDialog.svelte'
  import { firebase } from '../libs/firebase'

  let orderBy = 'createdAt'
  let selectedRecipes = {}
  let sortBy
  let recipes
  let recipesRef
  let showShareDialog = false
  const roles = ['creator', 'readers', 'writers']
  $: selectMode = !isEmpty(selectedRecipes)

  function addNewRecipe(userId) {
    const currentDateTime = firebase.firestore.FieldValue.serverTimestamp()
    recipesRef.add({
      createdAt: currentDateTime,
      updatedAt: currentDateTime,
      creator: userId,
      name: 'Untitled recipe',
    })
  }

  function isEmpty(obj) {
    return obj && Object.keys(obj).length === 0 && obj.constructor === Object
  }
</script>

<Header />

<User persist={localStorage} let:user>
  <Toolbar
    bind:selectMode
    bind:sortBy
    bind:orderBy
    on:newRecipeClick={() => addNewRecipe(user.uid)}
    on:deleteRecipeClick={() => Object.values(selectedRecipes).forEach((r) => r.ref.delete())}
    on:unselectAll={() => {
      selectedRecipes = {}
    }}
    on:shareClick={() => {
      showShareDialog = true
    }}
  />
  <Collection
    path="recipes"
    query={(ref) => ref.where(`readers`, 'array-contains', user.uid)}
    let:data={readableRecipes}
  >
    <Collection
      path="recipes"
      query={(ref) => ref.where(`creator`, '==', user.uid).orderBy(orderBy, sortBy)}
      on:data={(e) => {
        recipes = [...e.detail.data, ...readableRecipes]
      }}
      on:ref={(e) => {
        recipesRef = e.detail.ref
      }}
    >
      <GridList items={recipes} let:item>
        <Card
          bind:selectMode
          on:change={({ detail: selected }) => {
            if (selected) {
              selectedRecipes[item.id] = item
            } else {
              const { [item.id]: _unselectedRecipe, ...rest } = selectedRecipes
              selectedRecipes = rest
            }
          }}
          on:click={() => $goto('/:id', { id: item.id })}
        >
          <div class="flex flex-col p-3">
            <h3 class="text-sm truncate-2nd">
              {item.name}
            </h3>
            <p class="text-xs text-gray-500 line-clamp-1">
              <Doc path={`users/${item.creator}`} let:data={owner}>
                {owner.displayName} •
                <span
                  use:tippy={{
                    content: item.updatedAt.toDate().toLocaleString(),
                    placement: 'bottom',
                  }}
                >
                  {timeAgo.format(item.updatedAt.toDate())}
                </span>
              </Doc>
            </p>
          </div>
        </Card>
      </GridList>

      <ShareDialog bind:visible={showShareDialog} recipes={Object.values(selectedRecipes)} />
    </Collection>
  </Collection>
</User>
