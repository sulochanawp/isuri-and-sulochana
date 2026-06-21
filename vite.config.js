import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANT: Change '/wedding-rsvp/' to match your GitHub repository name exactly
// e.g. if your repo is github.com/yourname/my-wedding → base: '/my-wedding/'
export default defineConfig({
  plugins: [react()],
  base: '/isuri-and-sulochana/',
})
