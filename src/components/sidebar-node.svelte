<script lang="ts">
  import { SidebarNode } from '../core/tree';
  import Collapsible from './collapsible.svelte';
  export let node: SidebarNode<{ active?: true }>;
  export let linkPrefix: string = '/';
</script>

<div class="sidebar-item">
  {#if node.type === 'node'}
    <div class="sidebar-node" class:active={node?.data?.active} tabindex="0">
      <a
        href={(linkPrefix + node.path).replace('//', '/')}
        style="display: block"
        tabindex="-1"
      >
        {node.name}
      </a>
    </div>
  {:else if node.type === 'directory'}
    <Collapsible open={node?.data?.active}>
      <span slot="title">
        {node.name}
      </span>
      <span slot="content">
        {#each node.children as child}
          <svelte:self node={child} />
        {/each}
      </span>
    </Collapsible>
  {/if}
</div>

<style lang="scss">
  // Trickery to get the "hierarchy lines" for collapsed nodes.
  .sidebar-item {
    :global(.collapsible[open] span[slot='content']) {
      @apply border-dark-600 dark:border-light-200 block;
      border-width: 0 0 0 1px;
      border-style: solid;
      :global(.sidebar-item) {
        @apply relative;
      }
      :global(.sidebar-item::before) {
        content: '';
        @apply bg-dark-600 dark:bg-light-200 absolute top-1/2 inline-block h-[1px] w-1;
      }
    }

    .sidebar-node {
      @apply ml-1;
      &.active {
        @apply bg-primary-300 dark:bg-primary-700;
      }
    }

    .sidebar-node,
    :global(.collapsible summary) {
      @apply <sm:py-1 hover:bg-primary-300 rounded-generic mt-1 px-2 hover:bg-opacity-40;
      @apply dark:hover:bg-primary-700 dark:hover:bg-opacity-40;
    }

    .sidebar-node a,
    a:visited {
      @apply text-text-primary-light dark:text-text-primary-dark;
    }
  }
</style>
