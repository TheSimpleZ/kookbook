<script>
  import { fade } from 'svelte/transition'
  export let items = []
</script>

<div class="grid w-screen gap-4 p-10 auto-fill-15">
  {#each items as item, index}
    <span in:fade={{ delay: index * 30 }}>
      <slot {item} {index} />
    </span>
  {/each}
</div>

<style lang="postcss">
  .auto-fill-15 {
    grid-template-columns: repeat(auto-fill, minmax(min(15rem, 100%), 1fr));
  }
</style>
