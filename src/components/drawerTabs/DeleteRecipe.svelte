<script>
  import { Collection, User } from 'sveltefire'

  export let selectedRecipes
  export let onFinished
</script>

<div class="flex flex-col justify-between w-full px-10 py-5">
  <p>Are you sure you would like to delete the selected recipe(s)?</p>
  <User persist={localStorage} let:user let:auth>
    <Collection path="recipes" query={(ref) => ref.where(`createdBy`, '==', user.uid)} let:ref>
      <button
        class="btn text-red-500 hover:bg-red-200 bg-red-100"
        on:click={() => {
          Object.values(selectedRecipes).forEach((r) => r.ref.delete())
          onFinished()
        }}
      >
        Yes
      </button>
    </Collection>
  </User>
</div>
