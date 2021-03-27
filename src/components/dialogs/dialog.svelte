<script>
  import Dialog from './baseDialog.svelte'
  import { createEventDispatcher } from 'svelte'
  import DialogBtn from './dialogBtn.svelte'
  const dispatch = createEventDispatcher()
  export let visible
</script>

<Dialog bind:visible inverted {...$$props}>
  <div class="flex flex-col p-7">
    <slot />
    <div class="flex justify-end gap-2 mt-4">
      <slot name="footer" />
      <DialogBtn className="text-red-500 hover:text-red-400 p-2 px-3 min-w-15" on:click={() => dispatch('cancel')}
        >Cancel</DialogBtn
      >
      <slot name="ok_button">
        <DialogBtn className="text-indigo-500 hover:text-indigo-400 p-2 px-3 min-w-15" on:click={() => dispatch('ok')}>
          Ok
        </DialogBtn>
      </slot>
    </div>
  </div>
</Dialog>
