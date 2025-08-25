// @ts-check
import { defineConfig } from 'astro/config';
import compress from 'astro-compress';

// https://astro.build/config
export default defineConfig({
  site: 'https://tokyo-designplex.jp',
  base: '/~2504ishii/project',

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @use "./src/styles/functions.scss" as *;
          @use "./src/styles/mixins.scss" as *;
          `,
        },
      },
    },
  },

  integrations: [compress()],
});
