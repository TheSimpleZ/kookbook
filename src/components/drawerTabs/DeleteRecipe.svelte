<script>
  import DialogBtn from '@/components/dialogs/DialogBtn.svelte'
  import { Collection, User } from 'sveltefire'
  import { firebase } from '@/libs/firebase'
  import { send, receive } from '../../libs/crossfade'

  export let selectedRecipes
  export let onFinished
</script>

<div class="flex flex-col w-full px-10 py-5" in:receive={{ key: 'tab' }} out:send={{ key: 'tab' }}>
  <p>Are you sure you would like to delete this recipe?</p>
  <User persist={localStorage} let:user let:auth>
    <Collection path="recipes" query={(ref) => ref.where(`createdBy`, '==', user.uid)} let:ref>
      <DialogBtn
        className="text-red-500 mt-5 py-2 mx-10"
        on:click={() => {
          Object.values(selectedRecipes).forEach((r) => r.ref.delete())
          onFinished()
        }}
      >
        Yes
      </DialogBtn>
    </Collection>
  </User>
</div>
