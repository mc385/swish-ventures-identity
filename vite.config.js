import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves at https://<user>.github.io/<repo>/ — set base accordingly.
// For local dev + custom domain deploys, base remains '/'.
const isProd = process.env.NODE_ENV === 'production' || process.env.GITHUB_ACTIONS === 'true'

export default defineConfig({
  plugins: [react()],
  base: isProd ? '/swish-ventures-identity/' : '/',
  server: { port: 5173, strictPort: false, open: false }
})
