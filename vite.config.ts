import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // We are using the root directory for source files
  root: './',
  build: {
    outDir: 'dist',
  }
});