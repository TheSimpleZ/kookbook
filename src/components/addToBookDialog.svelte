<script>
  import Dialog from '@/components/dialog.svelte'

  export let visible

  function closeDialog() {
    visible = false
  }
</script>

<Dialog title="Add to recipe book" bind:visible on:cancel={closeDialog} on:ok={closeDialog}>
  Dialog under construction
</Dialog>
