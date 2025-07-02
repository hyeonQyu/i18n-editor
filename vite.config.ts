import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist/renderer',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
