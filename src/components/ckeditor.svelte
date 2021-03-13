<script>
  import BalloonBlockEditor from 'ckeditor5-custom-build'
  import { onMount, createEventDispatcher } from 'svelte'
  import FirebaseStorageAdapter from '../libs/firebaseStorageAdapter'

  export let saveData
  export let initialData
  export let imageUploadPath = ''
  let editorElement
  const dispatch = createEventDispatcher()

  const config = {
    initialData,
    autosave: {
      save(editor) {
        return saveData(editor.getData())
      },
    },
    toolbar: {
      items: ['bold', 'italic', 'underline', 'link'],
    },
    language: 'en',
    blockToolbar: [
      'heading',
      '|',
      'alignment',
      'numberedList',
      'bulletedList',
      'blockQuote',
      'indent',
      'outdent',
      'imageUpload',
      'mediaEmbed',
      'insertTable',
    ],
    image: {
      toolbar: ['imageTextAlternative', 'imageStyle:full', 'imageStyle:side'],
    },
    table: {
      contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
    },
    licenseKey: '',
    imageRemoveEvent: {
      callback: (imagesSrc, nodeObjects) => {
        dispatch('imagesDeleted', imagesSrc)
      },
    },
  }

  onMount(async () => {
    const editor = await BalloonBlockEditor.create(editorElement, config)
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return new FirebaseStorageAdapter(loader, imageUploadPath)
    }
  })
</script>

<div bind:this={editorElement} class="w-full" />
