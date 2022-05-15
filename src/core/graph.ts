import { BrainNode } from './brain';
import { DataSet } from 'vis-data';
import type { Node, Edge } from 'vis-network';

/**
 * Convert brain nodes to Vis.js datasets.
 * @param data The brain nodes
 * @returns The Vis.js datasets
 */
export function dataToVis(data: BrainNode[]): [DataSet<Node>, DataSet<Edge>] {
  const nodes: Node[] = data.map((node) => ({ id: node.id, label: node.name }));
  const links: Edge[] = data.flatMap((node) => {
    return node.backLinks.map((backLink) => ({
      from: node.id,
      to: backLink,
    }));
  });
  return [new DataSet(nodes), new DataSet(links)];
}
