import { vitePreprocess } from "@sveltejs/kit/vite";
import adapter from "@sveltejs/adapter-auto";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    alias: {
      $assets: "src/lib/assets",
      $components: "src/lib/components",
      $db: "src/lib/db",
      $lib: "src/lib",
      $poke: "src/lib/poke",
      $utils: "src/lib/utils",
    }
  },

  onwarn: (warning, handler) => {
    if (warning.code.toLowerCase().startsWith('a11y')) {
      return;
    }
    handler(warning);
  },

  preprocess: [vitePreprocess({})],
};

export default config;
