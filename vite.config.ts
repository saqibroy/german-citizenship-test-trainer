import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Gzip compression
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 10240, // Only compress files larger than 10kb
      deleteOriginFile: false
    }),
    // Brotli compression (better than gzip)
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 10240,
      deleteOriginFile: false
    }),
    // Bundle analyzer (only in analyze mode)
    visualizer({
      open: false,
      filename: 'dist/stats.html',
      gzipSize: true,
      brotliSize: true,
    })
  ],
  build: {
    // Enable build optimizations
    minify: 'terser',
    // Code splitting configuration
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunk for React and core dependencies
          'vendor-react': ['react', 'react-dom'],
          // Separate chunk for icons
          'vendor-icons': ['lucide-react'],
          // Separate chunk for date utilities
          'vendor-utils': ['date-fns'],
          // Data files in separate chunks
          'data-questions': ['./src/data.js'],
          'data-vocabulary': ['./src/vacabulary.js'],
          'data-grammar': ['./src/germanLessons.js']
        },
        // Optimize chunk file names
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    // Increase chunk size warning limit for data files
    chunkSizeWarningLimit: 600,
    // Enable source maps for debugging (can disable for smaller builds)
    sourcemap: false,
    // Enable CSS code splitting
    cssCodeSplit: true
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react', 'date-fns']
  }
})
