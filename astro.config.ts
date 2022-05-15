import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import markdownConfig from './markdown.config';
// https://astro.build/config
export default defineConfig({
  integrations: [svelte()],
  markdown: markdownConfig,
  site: 'https://thicket.retronav.vercel.app/',
});
