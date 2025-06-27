import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { apiServerPlugin } from './api/vite-server.ts';

export default defineConfig({
  plugins: [react(), apiServerPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
    exclude: ['mongodb', 'mongoose', 'express', 'cors'],
    esbuildOptions: {
      target: 'es2020'
    }
  },
  server: {
    hmr: true,
    watch: {
      usePolling: true
    }
  },
  build: {
    sourcemap: true,
    target: 'es2020',
    rollupOptions: {
      external: ['mongodb', 'mongoose', 'express', 'cors', 'dotenv'],
      output: {
        manualChunks: undefined
      }
    }
  },
  esbuild: {
    target: 'es2020'
  }
})