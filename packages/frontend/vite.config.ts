import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: true, // Listen on all addresses
    port: 5173,
    strictPort: true, // Fail if port is already in use
    watch: {
      usePolling: true // Use polling for hot reload in Docker
    }
  },
})
