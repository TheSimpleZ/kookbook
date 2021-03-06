<script>
  import SidebarItem from './item.svelte'
  import { Collection } from 'sveltefire'

  export const employeeId = null
</script>

<Collection path={'books'} let:data={books}>
  {#each books as book}
    <SidebarItem {book} />
  {/each}

  <div slot="loading">Loading...</div>

  <div slot="fallback">Unable to display comments...</div>
</Collection>
