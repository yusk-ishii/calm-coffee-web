// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({  vite: {
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
});
