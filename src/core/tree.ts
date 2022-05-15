import type { MarkdownHeader } from '@astrojs/markdown-remark';
export const SEPERATOR = '/';

/**
 * A representation of a sidebar node.
 * This is similar to a node in a tree.
 */
export class SidebarNode<T extends {} = unknown> {
  constructor(
    /** The display name of the node. */
    public readonly name: string,
    /** The type of the node. */
    public readonly type: 'directory' | 'node',
    /**
     * An array of headings in the node document, if any.
     * Only used in nodes of type "node".
     */
    public readonly headings: MarkdownHeader[] = [],
    /**
     * The filesystem path of the node. Used for navigation.
     * Should start with a forward slash.
     */
    public readonly path: string = '',
    /** Child nodes of the node, if any. */
    public readonly children: SidebarNode[] = [],
    /** Custom mutable data, if any. */
    public data?: T
  ) {
  }
}

/**
 * Convert a list of paths to a Tree (Array of SidebarNodes).
 * @param paths Array of paths to convert
 * @returns An array of SidebarNodes
 */
export function fsToTree(paths: {
  [file: string]: MarkdownHeader[];
}): SidebarNode<SidebarNode>[] {
  const root: SidebarNode<SidebarNode>[] = [];
  Object.entries(paths).forEach(([path, heading]) => {
    const sections = path.split(SEPERATOR);
    if (sections.length > 1) {
      let topNodeExists = false;
      let topNode = root.find((node) => node.name === sections[0]);
      if (topNode instanceof SidebarNode) topNodeExists = true;
      else
        topNode = new SidebarNode(
          sections[0],
          'directory',
          [],
          SEPERATOR + sections[0]
        );
      pathToBranch(sections.slice(1), topNode, heading);
      if (!topNodeExists) root.push(topNode);
    } else {
      root.push(
        new SidebarNode(path, 'node', heading, SEPERATOR + sections[0])
      );
    }
  });
  return root;
}

/**
 * Get a child node in a parent node at a given path.
 * @param root The parent node
 * @param path The path to resolve
 * @returns The resolved node
 */
export function resolveNode(
  root: SidebarNode,
  path: string
): SidebarNode | undefined {
  function resolve(node: SidebarNode, name: string): SidebarNode | undefined {
    if (node instanceof SidebarNode) {
      // Cover for top nodes
      if (node.name === name) return node;

      for (const child of node.children) {
        if (child.name === name) return child;
      }
    }
  }

  function resolveInner(
    node: SidebarNode,
    sections: string[]
  ): SidebarNode | undefined {
    const parentNode = resolve(node, sections[0]);
    if (sections.length === 1) return parentNode;
    else if (parentNode && sections.length > 1)
      return resolveInner(parentNode, sections.slice(1));
  }

  const sections = path.split(SEPERATOR);

  if (sections.length > 1) {
    return resolveInner(root, sections);
  } else if (sections.length === 1) {
    return resolve(root, sections.pop());
  }
}

/**
 * Convert a path to a nested node structure and append to a parent node.
 * @param sections The sections in a path seperated by a seperator
 * @param topNode The top node to put the child nodes in
 * @param headings Headings for the node
 * @returns The topNode with its children.
 */
function pathToBranch(
  sections: string[],
  topNode: SidebarNode,
  headings: MarkdownHeader[]
): void {
  if (sections.length === 0) return;
  const parent = topNode.children.find((node) => node.name === sections[0]);
  if (!parent) {
    const isNode = sections.length === 1;
    const child = new SidebarNode(
      sections[0],
      isNode ? 'node' : 'directory',
      isNode ? headings : [],
      topNode.path + SEPERATOR + sections[0]
    );
    topNode.children.push(child);
    pathToBranch(sections.slice(1), child, headings);
  } else {
    pathToBranch(sections.slice(1), parent, headings);
  }
}

/**
 * Traverse a node and its children.
 * @param root The node to traverse
 * @param callback Function which will be run for each node
 */
export function walkNode(
  root: SidebarNode,
  callback: (node: SidebarNode) => void
) {
  function walk(node: SidebarNode) {
    callback(node);
  }

  walk(root);
  root.children.forEach((node) => walkNode(node, callback));
}
