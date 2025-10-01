import { resolve } from 'path';

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: { port: 3000, host: true },
  build: {
    outDir: 'build',
    rollupOptions: {
      output: {
        manualChunks: {},
      },
    },
  },
  resolve: {
    alias: {
      shared: resolve('../shared/src/'),
      src: resolve('src/'),
    },
  },
});
