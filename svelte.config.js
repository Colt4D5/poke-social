import { vitePreprocess } from "@sveltejs/kit/vite";
import adapter from "@sveltejs/adapter-auto";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    alias: {
      $assets: "src/lib/assets",
      $components: "src/lib/components",
      $lib: "src/lib",
      $poke: "src/lib/poke",
    }
  },

  preprocess: [vitePreprocess({})],
};

export default config;
