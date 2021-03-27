<script>
  import Dialog from './Dialog.svelte'
  import { Collection, Doc } from 'sveltefire'
  import { firebase } from '@/libs/firebase'
  import uniqby from 'lodash.uniqby'
  import Icon, { Check, Plus, X, Ban } from 'svelte-hero-icons'
  import DialogBtn from './DialogBtn.svelte'

  export let visible
  export let recipe

  let inviteInput = ''
  let inviteWriter = false
  let collaboratorsDataList

  $: endOfSearchString = inviteInput.replace(/.$/, (c) => String.fromCharCode(c.charCodeAt(0) + 1))
  $: readers = recipe?.readers || []
  $: writers = recipe?.writers || []
  $: collaboratorIds = [...new Set([...readers, ...writers])]

  function startsWithQuery(ref, field) {
    const query = ref.limit(10)

    return inviteInput ? query.where(field, '>=', inviteInput).where(field, '<', endOfSearchString) : query
  }

  function closeDialog() {
    visible = false
    inviteInput = ''
  }
</script>

<Dialog title="Share" bind:visible on:cancel={closeDialog} on:ok={closeDialog}>
  <table class="table-auto">
    <thead>
      <tr>
        <th class="px-6 py-3 text-left">Shared with</th>
        <th class="px-6 py-3 text-left">Editor</th>
      </tr>
    </thead>
    <tbody>
      {#if collaboratorIds.length > 0}
        <Collection
          path="users"
          query={(ref) => ref.where(firebase.firestore.FieldPath.documentId(), 'in', collaboratorIds)}
          let:data={collaborators}
        >
          {#each collaborators as collaborator}
            <tr class="border-b">
              <td class="px-6 py-3 text-left">{collaborator.displayName}</td>
              <td class="px-6 py-3 text-left">
                <DialogBtn
                  className="p-1"
                  on:click={() => {
                    let newWriters
                    if (writers.includes(collaborator.id)) {
                      newWriters = writers.filter((w) => w !== collaborator.id)
                    } else {
                      newWriters = [...writers, collaborator.id]
                    }
                    recipe.ref.update({
                      writers: newWriters,
                    })
                  }}
                >
                  {#if writers.includes(collaborator.id)}
                    <Icon src={Check} size="20" class="icon" />
                  {:else}
                    <Icon src={X} size="20" class="icon" />
                  {/if}
                </DialogBtn>
              </td>
              <td class="px-6 py-3 text-left">
                <DialogBtn
                  className="p-1"
                  tooltip={{ content: 'Stop sharing', placement: 'right' }}
                  on:click={() => {
                    recipe.ref.update({
                      writers: writers.filter((w) => w !== collaborator.id),
                      readers: readers.filter((w) => w !== collaborator.id),
                    })
                  }}
                >
                  <Icon src={Ban} size="20" class="icon" />
                </DialogBtn>
              </td>
            </tr>
          {/each}
        </Collection>
      {/if}
    </tbody>
  </table>

  <div class="flex flex-col mt-10 mb-5">
    <label for="recipe_name" class="block text-sm font-medium text-gray-700">Invite by name or email</label>
    <span class="flex">
      <input
        id="recipe_name"
        list="collaborators"
        bind:value={inviteInput}
        class="mt-0 block w-60 px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:outline-none"
      />
      <DialogBtn
        className="flex items-center py-1 pr-2 ml-3"
        on:click={() => {
          const inviteUserId = collaboratorsDataList.querySelector("option[value='" + inviteInput + "']").dataset.value
          if (inviteUserId) {
            inviteInput = ''
            recipe.ref.update({
              readers: [...readers, inviteUserId],
              ...(inviteWriter && { writers: [...writers, inviteUserId] }),
            })
          }
        }}
      >
        <Icon src={Plus} size="20" class="icon" />Add
      </DialogBtn>
    </span>
    <div class="flex gap-2 mt-4">
      <label for="writer" class="checkbox-label">Allow user to edit</label>
      <input id="writer" type="checkbox" class="rounded" bind:checked={inviteWriter} />
    </div>

    <Collection path="users" query={(ref) => startsWithQuery(ref, 'displayName')} let:data={usersByName}>
      <Collection path="users" query={(ref) => startsWithQuery(ref, 'email')} let:data={usersByEmail}>
        <datalist bind:this={collaboratorsDataList} id="collaborators">
          {#each uniqby([...usersByName, ...usersByEmail], 'id') as user}
            <option data-value={user.id}>{`${user.displayName} <${user.email}>`}</option>
          {/each}
        </datalist>
      </Collection>
    </Collection>
  </div>
  <span slot="footer" class="flex items-center mr-auto">
    <Doc path={`users/${recipe.createdBy}`} let:data={creator}>
      <p class="text-xs text-gray-400">Recipe created by: {creator.displayName}</p>
    </Doc>
  </span>
</Dialog>

<style lang="postcss">
  .checkbox-label {
    @apply block text-sm font-medium text-gray-700;
  }
</style>
