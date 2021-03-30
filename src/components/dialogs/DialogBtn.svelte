<script>
  export let className
</script>

<button
  class="{className} rounded-lg hover:bg-gray-100 flex items-center justify-center focus:outline-none"
  on:click
  {...$$props}
>
  <slot />
</button>
