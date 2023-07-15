import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({

  onwarn: (warning, handler) => {
    if (warning.code.toLowerCase().startsWith('a11y')) {
      return;
    }
    handler(warning);
  },

	plugins: [sveltekit()]
});
