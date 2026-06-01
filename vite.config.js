import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // This tells GitHub Pages to map URLs to your exact repository folder
  base: '/angel-benitez-portfolio/',
})