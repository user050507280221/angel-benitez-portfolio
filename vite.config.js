import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // Load environment variables safely
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    // Dynamically sets base path: uses repo name for GitHub Actions, root for Vercel
    base: env.GITHUB_ACTIONS ? '/angel-benitez-portfolio/' : '/',
  }
})