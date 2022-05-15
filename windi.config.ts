import { defineConfig } from 'vite-plugin-windicss';
import { theme } from './site.config';

export default defineConfig({
  darkMode: 'media',
  preflight: false,
  theme,
});
