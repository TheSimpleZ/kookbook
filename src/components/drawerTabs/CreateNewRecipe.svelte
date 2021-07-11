<script>
  import DialogBtn from '@/components/dialogs/DialogBtn.svelte'
  import { Collection, User } from 'sveltefire'
  import { firebase } from '@/libs/firebase'
  import { send, receive } from '../../libs/crossfade'

  export let onFinished

  let value
</script>

<div class="flex flex-col w-full px-10 py-5 el" in:receive={{ key: 'tab' }} out:send={{ key: 'tab' }}>
  <label for="recipe_name" class="block text-sm font-medium text-gray-700">Name</label>
  <input
    id="recipe_name"
    type="text"
    placeholder="A fancy name..."
    bind:value
    class="mt-0 block w-60 px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
  />
  <User persist={localStorage} let:user let:auth>
    <Collection path="recipes" query={(ref) => ref.where(`createdBy`, '==', user.uid)} let:ref>
      <DialogBtn
        className="text-indigo-500 mt-5 py-2 mx-10"
        on:click={() => {
          const currentDateTime = firebase.firestore.FieldValue.serverTimestamp()
          ref.add({
            createdAt: currentDateTime,
            updatedAt: currentDateTime,
            createdBy: user.uid,
            name: value,
          })
          value = ''
          onFinished()
        }}
      >
        Create
      </DialogBtn>
    </Collection>
  </User>
</div>

<style>
  .el {
    grid-column: 1/2;
    grid-row: 1/2;
  }
</style>
