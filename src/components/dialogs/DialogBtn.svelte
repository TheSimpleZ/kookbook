<script>
  export let className
</script>

<button
  class="rounded-lg hover:bg-gray-100 flex items-center justify-center focus:outline-none {className}"
  on:click
  {...$$props}
>
  <slot />
</button>
