<script>
  import { Doc, Collection } from 'sveltefire'
  import GridList from '@/components/GridList.svelte'
  import Card from '@/components/Card.svelte'
  import timeAgo from '@/libs/timeAgo'
  import tippy from 'tippy.js'
  import { goto } from '@roxi/routify'
  import Drawer from '@/components/Drawer.svelte'
  import { SpinLine } from 'svelte-loading-spinners'
  import orderBy from 'lodash.orderby'
  import { Plus, Filter, Trash, FolderAdd, Share } from 'svelte-hero-icons'
  import CreateNewRecipe from '@/components/drawerTabs/CreateNewRecipe.svelte'
  import DeleteRecipe from '@/components/drawerTabs/DeleteRecipe.svelte'
  import SortFilter from '@/components/drawerTabs/SortFilter.svelte'
  import AddToBook from '@/components/drawerTabs/AddToBook.svelte'
  import ShareRecipe from '@/components/drawerTabs/ShareRecipe.svelte'
  import { canRead } from '@/libs/firestoreQueries'

  const recipeSorters = {
    name: (r) => r.name?.toLowerCase(),
  }

  export let scoped
  $: ({ user } = scoped)

  let drawerIsOpen = false

  let orderByProperty = 'createdAt'
  let selectedRecipeIds = new Set()
  let sortOrder = 'desc'
  let unorderedRecipes = []
  let selectedBook
  $: orderedRecipes = orderBy(unorderedRecipes, [recipeSorters[orderByProperty] || orderByProperty], sortOrder)
  $: recipes = selectedBook
    ? orderedRecipes.filter(
        (r) =>
          (selectedBook === null && (!r.books || r.books.length === 0)) ||
          r.books?.map((b) => b.id)?.includes(selectedBook.ref.id)
      )
    : orderedRecipes
  $: books = recipes.filter((r) => r.books).flatMap((r) => r.books)
  $: selectedRecipes = recipes.filter((r) => selectedRecipeIds.has(r.id))
  $: selectMode = selectedRecipeIds.size > 0

  function gotoRecipe(id) {
    $goto('./:id', { id })
  }

  $: tabs = [
    {
      icon: Plus,
      component: CreateNewRecipe,
      tooltip: 'New recipe',
    },
    {
      icon: Filter,
      component: SortFilter,
      tooltip: 'Filter & sort',
      props: {
        books,
      },
    },
    {
      icon: Share,
      component: ShareRecipe,
      showIf: selectedRecipes.length > 0,
      tooltip: 'Share recipes',
      props: {
        selectedRecipes,
      },
    },
    {
      icon: FolderAdd,
      component: AddToBook,
      showIf: selectedRecipes.length > 0,
      tooltip: 'Add to collection',
      props: {
        selectedRecipes,
        books,
      },
    },
    {
      icon: Trash,
      component: DeleteRecipe,
      showIf: selectedRecipes.length > 0,
      tooltip: 'Delete',
      props: {
        selectedRecipes,
      },
    },
  ]
</script>

<Drawer {tabs} let:selectedTab bind:open={drawerIsOpen} let:closeDrawer>
  <svelte:component
    this={selectedTab?.component}
    bind:sortOrder
    bind:orderByProperty
    bind:selectedBook
    {...selectedTab?.props}
    onFinished={() => {
      closeDrawer()
    }}
  />
</Drawer>
<div class="ml-10">
  <Collection
    path="recipes"
    query={canRead(user)}
    on:data={(e) => {
      unorderedRecipes = e.detail.data
    }}
    let:ref
  >
    <GridList items={recipes} let:item>
      <Card
        bind:selectMode
        selected={selectedRecipeIds.has(item.id)}
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
            <Doc path={`users/${Object.keys(item.roles).find((key) => item.roles[key] === 'owner')}`} let:data={owner}>
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

    <div class="flex items-center justify-center flex-1" slot="loading">
      <SpinLine size="40" color="#4B5563" unit="rem" duration="6s" />
    </div>
  </Collection>
</div>
