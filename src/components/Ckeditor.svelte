<script>
  import BalloonBlockEditor from 'ckeditor5-custom-build'
  import { onMount, createEventDispatcher } from 'svelte'
  import FirebaseStorageAdapter from '../libs/firebaseStorageAdapter'

  export let saveData
  export let isReadOnly = true
  export let initialData
  export let imageUploadPath = ''
  export let placeholder = ''
  let editorElement
  let editor
  $: setReadOnly = (readOnly) => {
    if (editor) {
      editor.isReadOnly = readOnly
    }
  }
  $: setReadOnly(isReadOnly)
  const dispatch = createEventDispatcher()

  const config = {
    initialData,
    placeholder,
    autosave: {
      save(editor) {
        if (!isReadOnly) {
          return saveData(editor.getData())
        }
      },
      waitingTime: 2000,
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
      callback: (imagesSrc) => {
        dispatch('imagesDeleted', imagesSrc)
      },
    },
  }

  onMount(async () => {
    editor = await BalloonBlockEditor.create(editorElement, config)
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return new FirebaseStorageAdapter(loader, imageUploadPath)
    }
  })
</script>

<div bind:this={editorElement} class="w-full" />
