<script>
  import Dialog from '../components/dialog.svelte'
  import { Doc, Collection } from 'sveltefire'
  import { firebase } from '../libs/firebase'
  import uniqby from 'lodash.uniqby'

  export let visible
  export let recipe

  let inviteInput = ''
  let inviteReader = false
  let inviteWriter = false
  let collaboratorsList

  $: endOfSearchString = inviteInput.replace(/.$/, (c) => String.fromCharCode(c.charCodeAt(0) + 1))
  $: readers = recipe?.readers || []
  $: writers = recipe?.writers || []
  function startsWithQuery(ref, field) {
    const query = ref.limit(10)

    return inviteInput ? query.where(field, '>=', inviteInput).where(field, '<', endOfSearchString) : query
  }
</script>

<Dialog
  title="Share"
  bind:visible
  on:cancel={() => {
    visible = false
  }}
  on:ok={() => {
    const inviteUserId = collaboratorsList.querySelector("option[value='" + inviteInput + "']").dataset.value
    if (inviteUserId && (inviteReader || inviteWriter))
      recipe.ref.update({
        ...(inviteReader && { readers: [...readers, inviteUserId] }),
        ...(inviteWriter && { writers: [...writers, inviteUserId] }),
      })
    else console.log(inviteUserId, inviteReader)
  }}
>
  <Doc path={`users/${recipe.creator}`} let:data={creator}>
    <p>Creator: {creator.displayName}</p>
  </Doc>

  <ul>
    <li>Readers:</li>
    {#each readers as readerId}
      <Doc path={`users/${readerId}`} let:data={reader}>
        <li>{reader.displayName}</li>
      </Doc>
    {/each}
    <li>Writers:</li>
    {#each writers as writerId}
      <Doc path={`users/${writerId}`} let:data={writer}>
        <li>{writer.displayName}</li>
      </Doc>
    {/each}
  </ul>
  <div class="flex flex-col mt-10">
    <label for="recipe_name" class="block text-sm font-medium text-gray-700">Invite by name or email</label>
    <input
      id="recipe_name"
      list="collaborators"
      bind:value={inviteInput}
      class="mt-0 block w-60 px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:outline-none"
    />
    <div class="flex gap-2 mt-4">
      <label for="reader" class="block text-sm font-medium text-gray-700">Reader</label>
      <input id="reader" type="checkbox" bind:checked={inviteReader} />
      <label for="writer" class="block text-sm font-medium text-gray-700">Writer</label>
      <input id="writer" type="checkbox" bind:checked={inviteWriter} />
    </div>

    <Collection path="users" query={(ref) => startsWithQuery(ref, 'displayName')} let:data={usersByName}>
      <Collection path="users" query={(ref) => startsWithQuery(ref, 'email')} let:data={usersByEmail}>
        <datalist bind:this={collaboratorsList} id="collaborators">
          {#each uniqby([...usersByName, ...usersByEmail], 'id') as user}
            <option data-value={user.id}>{`${user.displayName} <${user.email}>`}</option>
          {/each}
        </datalist>
      </Collection>
    </Collection>
  </div>
</Dialog>
