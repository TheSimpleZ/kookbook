<script>
  import Card from './recipe-card.svelte'
  export let recipes = []
</script>

<div class="w-screen p-10 grid auto-fill-200 gap-4">
  {#each recipes as recipe}
    <Card {recipe} />
  {/each}
</div>

<style lang="postcss">
  .auto-fill-200 {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
</style>
