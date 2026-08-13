import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [react(), tailwindcss()],

  build: {
    chunkSizeWarningLimit: 1000,

    rollupOptions: {
      plugins: [
        visualizer({
          filename: 'stats.html',
          open: true,
          gzipSize: true,
          brotliSize: true,
          template: 'treemap',
        }),
      ],

      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (
              id.includes('react-dom') ||
              id.includes('react-router') ||
              id.includes('scheduler')
            ) {
              return 'vendor-react'
            }

            if (id.includes('framer-motion')) {
              return 'vendor-framer'
            }

            if (id.includes('lucide-react')) {
              return 'vendor-lucide'
            }

            return 'vendor-others'
          }
        },
      },
    },
  },
})