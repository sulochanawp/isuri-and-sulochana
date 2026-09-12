import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANT: Change '/wedding-rsvp/' to match your GitHub repository name exactly
// e.g. if your repo is github.com/yourname/my-wedding → base: '/my-wedding/'
//
// The base path can be overridden at build time with the VITE_BASE env var —
// this is used by the preview deployment to serve the branch under a sub-path
// (e.g. /isuri-and-sulochana/preview/) without disturbing the production site.
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE || '/isuri-and-sulochana/',
})
