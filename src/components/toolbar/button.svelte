<script>
  import tippy from 'tippy.js'

  export let disabled = false
  export let tooltip = null
  const tippyif = (...args) => tooltip && tippy(...args)
</script>

<span
  use:tippyif={{
    content: tooltip,
    placement: 'bottom',
  }}
>
  <button {disabled} class="px-4 disabled:opacity-50 focus:outline-none" on:click>
    <slot />
  </button>
</span>
