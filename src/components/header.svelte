<script>
  import Icon, { bookOpen, logout, plus } from '@4mende2/svelte-heroicons'
  import { User, Collection } from 'sveltefire'

  const iconStyle = 'm-2 h-6 w-6 inline-block'

  function addNewRecipe(ref, userId) {
    const currentDateTime = new Date().toISOString()
    ref.add({
      createdAt: currentDateTime,
      updatedAt: currentDateTime,
      roles: {
        [userId]: 'owner',
      },
      name: 'New recipe',
      contents: {
        ops: [
          { insert: 'New recipe' },
          {
            attributes: {
              header: 1,
              align: 'center',
            },
            insert: '\n',
          },
        ],
      },
    })
  }
</script>

<header class="flex justify-between w-full p-4 px-8 shadow-md justify-items-center dark:bg-gray-800">
  <a href="/" class="text-xl">
    <Icon icon={bookOpen} class={iconStyle} />Kookbook
  </a>
  <User persist={localStorage} let:user let:auth>
    <Collection path="recipes" let:ref={recipesRef}>
      <button on:click={addNewRecipe(recipesRef, user.uid)}><Icon icon={plus} class={iconStyle} />New recipe</button>
    </Collection>
    <a href="/" on:click={() => auth.signOut()} class="">
      Log out
      <Icon icon={logout} class={iconStyle} />
    </a>
  </User>
</header>
