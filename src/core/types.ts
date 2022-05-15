import type { MarkdownHeader } from '@astrojs/markdown-remark';

export type SearchData = {
  name: string;
  headings: Array<MarkdownHeader>;
  path: string;
};
