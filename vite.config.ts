import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// GitHub Pages serves the site from /pythonSkill/, local dev from /.
export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/pythonSkill/' : '/',
  plugins: [react()],
})
