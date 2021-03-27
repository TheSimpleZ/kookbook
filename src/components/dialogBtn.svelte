<script>
  import tippy from '@/libs/tippySvelte'

  export let className
  export let tooltip = null
  const tooltipAction = (...params) => (tooltip ? tippy(...params) : null)
</script>

<button class="{className} dialogBtn" use:tooltipAction={tooltip} on:click {...$$props}><slot /></button>

<style lang="postcss">
  .dialogBtn {
    @apply rounded-lg hover:bg-gray-100 flex items-center justify-center;
  }
</style>
