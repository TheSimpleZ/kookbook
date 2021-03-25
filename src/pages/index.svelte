<script>
  import { Doc, Collection } from 'sveltefire'
  import GridList from '../components/grid-list.svelte'
  import Card from '../components/card.svelte'
  import Header from '../components/header.svelte'
  import timeAgo from '../libs/timeAgo'
  import tippy from 'tippy.js'
  import { goto } from '@roxi/routify'
  import Toolbar from '../components/toolbar.svelte'
  import ShareDialog from '../components/shareDialog.svelte'
  import { firebase } from '../libs/firebase'
  import ChooseNameDialog from '../components/chooseNameDialog.svelte'
  import orderBy from 'lodash.orderby'

  const recipeSorters = {
    name: (r) => r.name.toLowerCase(),
  }

  export let scoped
  $: ({ user } = scoped)

  let orderByProperty = 'createdAt'
  let selectedRecipeIds = new Set()
  let sortOrder
  let unorderedRecipes
  $: recipes = orderBy(unorderedRecipes, [recipeSorters[orderByProperty] || orderByProperty], sortOrder)
  $: selectedRecipes = recipes.filter((r) => selectedRecipeIds.has(r.id))

  let showShareDialog = false
  let showNameDialog = false
  // const roles = ['creator', 'readers', 'writers']
  $: selectMode = !isEmpty(selectedRecipes)

  function isEmpty(obj) {
    return obj && Object.keys(obj).length === 0 && obj.constructor === Object
  }
</script>

<Header />

<Toolbar
  {selectMode}
  multiSelect={Object.keys(selectedRecipes).length > 1}
  bind:sortOrder
  bind:orderByProperty
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
/>
<Collection path="recipes" query={(ref) => ref.where(`readers`, 'array-contains', user.uid)} let:data={readableRecipes}>
  <Collection
    path="recipes"
    query={(ref) => ref.where(`creator`, '==', user.uid)}
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
    <ChooseNameDialog
      on:ok={({ detail: name }) => {
        const currentDateTime = firebase.firestore.FieldValue.serverTimestamp()
        ref.add({
          createdAt: currentDateTime,
          updatedAt: currentDateTime,
          creator: user.uid,
          name,
        })
      }}
      bind:visible={showNameDialog}
    />

    <div slot="loading">Loading..</div>
  </Collection>
</Collection>
