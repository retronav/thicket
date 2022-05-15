import { readFileSync } from 'fs';
import * as fsWalk from '@nodelib/fs.walk';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { syntax } from 'micromark-extension-wiki-link';
import * as wikiLink from 'mdast-util-wiki-link';
import { Node as UnistNode, visit } from 'unist-util-visit';
import { relative, resolve, sep, join } from 'path';

export interface BrainNode {
  id: string;
  name: string;
  backLinks: string[];
}

/**
 * A brain is a collection of nodes.
 * This brain works on the files stored on disk.
 */
export class FilesystemBrain {
  nodes: BrainNode[] = [];

  /**
   * Create a file system brain
   * @param folder The path to the folder to scan
   */
  constructor(public folder: string) {
    const files = fsWalk
      .walkSync(folder, { stats: true })
      .filter((file) => file.stats.isFile() && file.path.endsWith('.md'))
      .map((file) => file.path)
      // It's better to work with an idempotent seperator
      .map((file) => file.replace(sep, '/'));

    files.forEach((path) => {
      const node = this.parse(path);

      if (node.id.includes('/'))
        node.backLinks = node.backLinks.map((backLink) => {
          // Normalize all paths
          if (backLink.startsWith('/')) return backLink.substring(1);
          return join(node.id.split('/').slice(0, -1).join('/'), backLink);
        });
      this.nodes.push(node);
    });
  }

  /**
   * Parse all backlinks in a markdown file
   * @param filePath The path to the markdown file
   * @returns The parsed file as a node
   */
  parse(filePath: string): BrainNode {
    const file = String(readFileSync(filePath));
    const backLinks = this.getBackLinks(file);
    return {
      id: relative(resolve(this.folder), filePath)
        .replace('.md', ''),
      name: filePath.split('/').pop().replace('.md', ''),
      backLinks,
    };
  }

  /**
   * Get all backlinks in a markdown file
   * @param md The markdown file
   * @returns The backlinks
   */
  private getBackLinks(md: string): string[] {
    const backLinks = [];
    const ast = fromMarkdown(md, {
      extensions: [syntax({ aliasDivider: '|' })],
      mdastExtensions: [
        wikiLink.fromMarkdown({
          pageResolver: (name: string) => [
            name.replace(/ /g, ' '),
          ],
        }),
      ],
    });
    visit(ast, 'wikiLink', (node: UnistNode) => {
      // Remove the id part from the permalink
      backLinks.push((node.data.permalink as string).split('#')[0]);
    });
    return backLinks;
  }
}
