<script lang="ts">
  import Node from './sidebar-node.svelte';

  import { SidebarNode } from '../core/tree';
  export let tree!: SidebarNode[];
  export let linkPrefix: string = '/';
</script>

<section class="sidebar">
  {#each tree as node}
    <Node {node} {linkPrefix} />
  {/each}
</section>
