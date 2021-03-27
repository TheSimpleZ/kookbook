<script>
  import Dialog from './Dialog.svelte'
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  export let visible
  export let initialValue = null
  let value

  $: if (visible) {
    value = initialValue
  }

  function closeDialog() {
    visible = false
    value = ''
  }
</script>

<Dialog
  bind:visible
  on:ok={() => {
    dispatch('ok', value)
    closeDialog()
  }}
  on:cancel={closeDialog}
>
  <div class="flex flex-col p-5">
    <label for="recipe_name" class="block text-sm font-medium text-gray-700">Name</label>
    <input
      id="recipe_name"
      type="text"
      placeholder="A fancy recipe name..."
      bind:value
      class="mt-0 block w-60 px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
    />
  </div>
</Dialog>
