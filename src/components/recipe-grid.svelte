<script>
  import Card from './recipe-card.svelte'
  export let recipes = []
</script>

<div class="grid w-screen gap-4 p-10 auto-fill-200">
  {#each recipes as recipe}
    <Card {recipe} bind:selected={recipe.selected} />
  {/each}
</div>

<style lang="postcss">
  .auto-fill-200 {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
</style>
