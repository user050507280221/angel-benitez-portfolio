import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Automatically switches paths based on whether GitHub Actions or Vercel is building the app
  base: process.env.GITHUB_ACTIONS ? '/angel-benitez-portfolio/' : '/',
})