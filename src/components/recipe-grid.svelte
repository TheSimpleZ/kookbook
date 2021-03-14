<script>
  import Card from './recipe-card.svelte'
  export let recipes = []
  export let selectedRecipes

  $: selectedRecipes = recipes.filter((r) => r.selected)
</script>

<div class="grid w-screen gap-4 p-10 auto-fill-15">
  {#each recipes as recipe}
    <Card {recipe} bind:selected={recipe.selected} selectMode={selectedRecipes.length > 0} />
  {/each}
</div>

<style lang="postcss">
  .auto-fill-15 {
    grid-template-columns: repeat(auto-fill, minmax(min(15rem, 100%), 1fr));
  }
</style>
