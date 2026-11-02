import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The site is served from the root of the custom domain (isuri-and-sulochana.life),
// so the base path is '/'.
//
// The base path can be overridden at build time with the VITE_BASE env var —
// this is used by the preview deployment to serve the branch under a sub-path
// (e.g. /preview/) without disturbing the production site.
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE || '/',
})
