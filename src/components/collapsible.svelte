<script lang="ts">
  export let open: boolean = false;
</script>

<details {open} class="collapsible" tabindex="-1">
  <summary>
    <slot name="title" />
  </summary>
  <slot name="content" />
</details>

<style lang="scss">
  details {
    summary {
      @apply w-[100%+0.25rem];
      margin-left: -0.25rem !important;
    }
    @apply ml-2 cursor-pointer;
  }
</style>
