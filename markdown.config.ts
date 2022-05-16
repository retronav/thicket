import wikiLink from 'remark-wiki-link';
import rehypeKatex from 'rehype-katex';
import { join } from 'path';
import type { MarkdownRenderingOptions } from '@astrojs/markdown-remark';
import { linkPrefix } from './site.config';
import { isAmbiguousUrl } from './src/core/util';

//@ts-ignore Why does this requires every option even if all can be optional?
const config: MarkdownRenderingOptions = {
  remarkPlugins: [
    'remark-gfm',
    'remark-math',
    'remark-frontmatter',
    [
      wikiLink,
      {
        pageResolver: (name: string) => [name],
        hrefTemplate: (href: string) => {
          let [path, id] = href.split('#');
          let url = '';
          if (isAmbiguousUrl(path)) {
            url = path;
          } else url = join(linkPrefix, path);
          if (id) url += `#${id}`;
          return url;
        },
        aliasDivider: '|',
      },
    ],
  ],
  rehypePlugins: [
    'rehype-slug',
    [rehypeKatex, { output: 'html' }],
    [
      'rehype-autolink-headings',
      {
        behavior: 'wrap',
        properties: { ariaLabel: 'Permalink', className: ['heading-link'] },
      },
    ],
    ['rehype-shift-heading', { shift: 1 }],
  ],
};

export default config;
