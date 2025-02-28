import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/app/',
  build: {
    outDir: 'app', // Gera os arquivos dentro da pasta app
    emptyOutDir: true, // Remove arquivos antigos antes de criar novos
  },
})
