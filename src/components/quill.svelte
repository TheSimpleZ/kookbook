<script>
  import Quill from 'quill'
  import ImageUploader from 'quill-image-uploader/src/quill.imageUploader'
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  export let options = {}
  export let initalData
  export let quill

  function quillAction(node) {
    Quill.register('modules/imageUploader', ImageUploader)
    quill = new Quill(node, options)

    quill.setContents(initalData)

    quill.on('text-change', function (delta, oldDelta, source) {
      if (source === 'user') dispatch('text-change', { delta, oldDelta, source })
    })
  }
</script>

<div use:quillAction />
