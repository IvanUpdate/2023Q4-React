/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    coverage: {
      enabled: true,
      all: true,
      include: ['src/components/**/*.tsx'],
      provider: 'istanbul',
      reporter: 'text',
      exclude: ['./src/services/**', './src/assets/**', './src/types', './src/main.tsx','./src/components/errorBoundary/*', './src/components/loader', './src/components/app/AppContext.tsx']
    },
  },
})