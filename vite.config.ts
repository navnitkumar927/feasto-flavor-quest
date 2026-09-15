// @lovable.dev/vite-tanstack-config already includes
// TanStack Start, React, Tailwind, TypeScript paths,
// Nitro, and other required plugins.

import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: {
      entry: "server",
    },
  },

  nitro: {
    preset: "bun",
  },
});
