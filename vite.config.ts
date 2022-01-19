import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import VitePluginSuperHtml from './scripts/vite-plugin-super-html';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePluginSuperHtml()],
  resolve: {
    alias: {
      '~': resolve(__dirname),
      '@': resolve(__dirname, 'src'),
    },
  },
});
