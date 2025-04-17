import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/CustodiaApp/',
  plugins: [react()],
  optimizeDeps: {
    include: ['@mui/x-date-pickers', 'date-fns']
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    proxy: {
      "/api": {
        target: "http://tecnodoc.universeglobalcenter.com:8080",
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
