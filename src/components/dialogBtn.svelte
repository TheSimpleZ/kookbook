<script>
  export let className
</script>

<button class="{className} dialogBtn" on:click {...$$props}><slot /></button>

<style lang="postcss">
  .dialogBtn {
    @apply rounded-lg hover:bg-gray-100 flex items-center justify-center;
  }
</style>
