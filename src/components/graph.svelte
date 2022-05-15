<script lang="ts">
  import { onMount } from 'svelte';
  import type { FilesystemBrain } from '../core/brain';
  import { dataToVis } from '../core/graph';
  import type { IdType, Options } from 'vis-network';
  import type { Theme } from 'windicss/types/interfaces';

  export let brain: FilesystemBrain;
  export let options: Options = {};
  export let activeNode: string;
  export let linkPrefix: string;
  export let windiTheme: Theme;

  let isDarkMode: boolean;

  const theme = 'extend' in windiTheme ? windiTheme.extend : windiTheme;
  const activeColor = theme.colors['secondary']['500'];
  let container!: HTMLElement;

  // Use a real anchor to go to page of the selected node from graph
  let anchor!: HTMLAnchorElement;

  onMount(async () => {
    const vis = await import('vis-network');
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    isDarkMode = darkModeQuery.matches;
    const [nodes, edges] = dataToVis(brain.nodes);
    if (activeNode) {
      nodes.update({ id: activeNode, color: activeColor });
    }
    const config = (isDarkMode: boolean): Options => ({
      height: '100%',
      width: '100%',
      interaction: { hover: true, selectConnectedEdges: false },
      nodes: {
        shape: 'dot',
        size: 10,
        color: isDarkMode
          ? theme.colors['light'][200]
          : theme.colors['dark'][200],
        font: {
          color: isDarkMode
            ? theme.colors['light'][200]
            : theme.colors['dark'][200],
        },
      },
      edges: {
        arrows: {
          to: true,
        },
        color: {
          inherit: false,
        },
      },
      ...options,
    });
    const network = new vis.Network(
      container,
      { nodes, edges },
      config(isDarkMode)
    );

    // Highlight connected nodes and edges on hovering a node
    network.on('hoverNode', (evt) => {
      const linkedNodes = network.getConnectedNodes(evt.node) as IdType[];
      const linkedEdges = network.getConnectedEdges(evt.node) as IdType[];

      const initialNodes = linkedNodes.map((id: IdType) => {
        // @ts-ignore: error in vis.js library types
        const initialColor: string | null = nodes.get(id).color ?? null;
        nodes.update({ id, color: { border: activeColor } });
        return { id, color: initialColor };
      });
      const initialEdges = linkedEdges.map((id: IdType) => {
        // @ts-ignore: error in vis.js library types
        const initialColor: string | null = edges.get(id).color ?? null;
        edges.update({ id, color: activeColor });
        return { id, color: initialColor };
      });

      network.once('blurNode', () => {
        initialEdges.forEach((edge) => edges.update(edge));
        initialNodes.forEach((node) => nodes.update(node));
      });
    });

    network.on('selectNode', ({ nodes }) => {
      const url = linkPrefix + nodes[0];
      if (anchor) {
        anchor.href = url;
        anchor.click();
      }
    });
  });
</script>

<section class="graph" bind:this={container} />
<a aria-hidden="true" hidden href="/" bind:this={anchor}>Link</a>
