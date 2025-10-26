import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/domains': path.resolve(__dirname, './src/domains'),
      '@/shared': path.resolve(__dirname, './src/shared'),
      '@/pages': path.resolve(__dirname, './src/pages'),
      '@/assets': path.resolve(__dirname, './src/shared/assets'),
      '@/core': path.resolve(__dirname, './src/core'),
      '@/core-hooks': path.resolve(__dirname, './src/core/hooks'),
      '@/ui': path.resolve(__dirname, './src/components/atoms'),
      '@/molecules': path.resolve(__dirname, './src/components/molecules'),
      '@/organisms': path.resolve(__dirname, './src/components/organisms'),
      '@/templates': path.resolve(__dirname, './src/components/templates'),
      '@/api': path.resolve(__dirname, './src/core/api'),
      '@/config': path.resolve(__dirname, './src/core/config'),
      '@/i18n': path.resolve(__dirname, './src/core/i18n'),
      '@/locale': path.resolve(__dirname, './src/core/i18n'),
      '@/hooks': path.resolve(__dirname, './src/shared/hooks'),
      '@/lib': path.resolve(__dirname, './src/shared/utils'),
      '@/store': path.resolve(__dirname, './src/shared/store'),
      '@/types': path.resolve(__dirname, './src/shared/types'),
      '@/styles': path.resolve(__dirname, './src/shared/styles'),
      shared: path.resolve(__dirname, '../../packages/shared/src'),
    },
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          query: ['@tanstack/react-query'],
          ui: ['lucide-react', 'framer-motion'],
        },
      },
    },
  },
  server: {
    host: true,
    port: 5173,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  preview: {
    host: true,
    port: 4173,
  },
})
