<script>
  import Quill from '../components/quill.svelte'
  import { FirebaseApp, User, Doc, Collection } from 'sveltefire'
  import { firebase } from '../config/firebase'
  import debounce from 'lodash.debounce'
  const fieldValue = firebase.firestore.FieldValue

  export let id
  export let recipeRef
  let quill

  const saveRecipe = debounce(
    () => {
      console.log(quill.getContents())
      recipeRef.update({
        contents: { ...quill.getContents() },
      })
    },
    2000,
    {
      maxWait: 5000,
    }
  )
</script>

<svelte:head>
  <link href="//cdn.quilljs.com/1.3.6/quill.bubble.css" rel="stylesheet" />
</svelte:head>

<Doc
  path={`recipes/${id}`}
  let:data
  on:ref={(e) => {
    recipeRef = e.detail.ref
  }}
  once
>
  <main class="flex flex-col items-center flex-1">
    <article class="flex-grow w-3/4 prose max-w-none">
      <Quill bind:quill initalData={data.contents} on:text-change={saveRecipe} />
    </article>
  </main>
</Doc>

<style>
  .flex-basis-100 {
    flex-basis: 75%;
  }
</style>
