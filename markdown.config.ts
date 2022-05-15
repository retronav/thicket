import wikiLink from 'remark-wiki-link';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import { join } from 'path';
import slugify from '@sindresorhus/slugify';
import type { MarkdownRenderingOptions } from '@astrojs/markdown-remark';
import { linkPrefix } from './site.config';
import { isAmbiguousUrl } from './src/core/util';
import { h } from 'hastscript';
import { Node, toString } from 'hast-util-to-string';

//@ts-ignore Why does this requires every option even if all can be optional?
const config: MarkdownRenderingOptions = {
  remarkPlugins: [
    remarkGfm,
    remarkMath,
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
        properties : { ariaLabel: "Permalink", className: ['heading-link'] },
      },
    ],
    ['rehype-shift-heading', { shift: 1 }],
  ],
};

export default config;
