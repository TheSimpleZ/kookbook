<script>
  import Dialog from '../components/baseDialog.svelte'
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()
  export let visible
</script>

<Dialog bind:visible inverted {...$$props}>
  <div class="flex flex-col p-7">
    <slot />
    <div class="flex justify-end gap-4 mt-10">
      <button class="text-red-500 dialogBtn hover:text-red-400 hover:bg-gray-100" on:click={() => dispatch('cancel')}
        >Cancel</button
      >
      <slot name="ok_button">
        <button
          class="text-indigo-500 bg-transparent dialogBtn hover:bg-gray-100 hover:text-indigo-400"
          on:click={() => dispatch('ok')}
        >
          Ok
        </button>
      </slot>
    </div>
  </div>
</Dialog>

<style lang="postcss">
  .dialogBtn {
    @apply p-2 px-3 rounded-lg;
  }
</style>
