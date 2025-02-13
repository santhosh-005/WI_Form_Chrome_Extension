import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()  
  ],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        sidepanel: 'index.html',
        background: 'public/background.js',
      },
      output: {
        entryFileNames: '[name].js',
      },
    },
  },
})
