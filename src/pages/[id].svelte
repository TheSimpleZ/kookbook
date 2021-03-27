<script>
  import RenameDialog from '../components/dialogs/ChooseNameDialog.svelte'

  import CkEditor from '../components/Ckeditor.svelte'
  import { Doc } from 'sveltefire'
  import Icon, { Pencil } from 'svelte-hero-icons'
  import Header from '../components/Header.svelte'
  import { Storage, firebase } from '../libs/firebase'
  import tippy from 'tippy.js'

  export let id
  export let scoped
  $: ({ user } = scoped)

  let showRenameDialog = false

  const documentPath = `recipes/${id}`
  let editMode = false

  const saveRecipe = (ref) => (data) =>
    ref.update({
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      contents: data,
    })

  function toggleEditMode(recipe) {
    if (recipe.writers?.includes(user.uid) || recipe.createdBy === user.uid) editMode = !editMode
  }

  function removeDeletedImages({ detail: urls }) {
    for (const url of urls) {
      Storage.refFromURL(url).delete()
    }
  }
</script>

<Doc path={documentPath} let:data={recipe} let:ref>
  <main class="flex flex-col min-h-screen">
    <Header>
      <div class="flex items-baseline justify-center flex-1">
        <h1 class="mx-2 text-3xl font-bold">{recipe.name}</h1>
        <button
          class="flex items-center justify-center rounded focus:outline-none ring-black py-0.5"
          class:ring-2={editMode}
          on:click={() => toggleEditMode(recipe)}
          use:tippy={{
            content: 'Edit recipe',
            placement: 'bottom',
          }}
        >
          <Icon src={Pencil} size="20" class="icon" />
        </button>
      </div>
    </Header>

    <article class="flex items-stretch flex-grow w-3/4 mx-auto mt-2 prose lg:prose-lg">
      <CkEditor
        isReadOnly={!editMode}
        saveData={saveRecipe(ref, recipe)}
        initialData={recipe.contents}
        imageUploadPath={documentPath + '/'}
        placeholder="Enter your recipe here..."
        on:imagesDeleted={removeDeletedImages}
      />
    </article>
  </main>
  <RenameDialog
    on:ok={({ detail: name }) => ref.update({ updatedAt: firebase.firestore.FieldValue.serverTimestamp(), name })}
    bind:visible={showRenameDialog}
    initialValue={recipe.name}
  />
</Doc>
