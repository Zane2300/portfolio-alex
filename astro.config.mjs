// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [svelte()],

  site: 'https://zane2300.github.io/portfolio-alex',
  base: '/portfolio-alex',
  outDir: 'docs', 
});