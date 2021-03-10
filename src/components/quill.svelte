<script>
  import Quill from 'quill'
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  export let options = {}
  export let initalData
  export let quill

  function quillAction(node) {
    quill = new Quill(node, {
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, false] }],
          [{ align: ['', 'center', 'right', 'justify'] }],
          ['bold', 'italic', 'underline', 'strike'],
          ['link', 'code-block'],
        ],
      },
      placeholder: 'Type something...',
      theme: 'bubble', // or 'bubble'
      ...options,
    })

    quill.setContents(initalData)
  }
</script>

<div use:quillAction />
