import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import path, { resolve } from 'path';

const root = resolve(__dirname, 'src');

export default defineConfig({
  plugins: [svgr(), react(), tsconfigPaths()],
  resolve: {
    alias: {
      '@': path.resolve(root),
    },
  },
});
