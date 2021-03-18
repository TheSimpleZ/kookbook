<script>
  import RenameDialog from '../components/chooseNameDialog.svelte'

  import CkEditor from '../components/ckeditor.svelte'
  import { Doc } from 'sveltefire'
  import { Pencil } from 'svelte-hero-icons'
  import Header from '../components/header.svelte'
  import { Storage, firebase } from '../libs/firebase'
  import tippy from 'tippy.js'

  export let id
  let showRenameDialog = false

  const documentPath = `recipes/${id}`

  const saveRecipe = (ref) => (data) => {
    return ref.update({
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      contents: data,
    })
  }
  function openRenameDialog() {
    showRenameDialog = !showRenameDialog
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
      <div class="flex items-center justify-center flex-1">
        <h1 class="mx-2 text-3xl font-bold">{recipe.name}</h1>
        <button
          on:click={openRenameDialog}
          use:tippy={{
            content: 'Rename',
            placement: 'bottom',
          }}
        >
          <Pencil size="20" class="icon" />
        </button>
      </div>
    </Header>

    <article class="flex items-stretch flex-grow w-3/4 mx-auto mt-2 prose lg:prose-lg">
      <CkEditor
        saveData={saveRecipe(ref)}
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
