import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.GITHUB_PAGES === 'true' ? '/solution-one/' : '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
  server: {
    watch: {
      ignored: ['**/.edge-profile/**', '**/.browser-profile/**', '**/solution-one-*.png', '**/payatom-*.png'],
    },
  },
})
