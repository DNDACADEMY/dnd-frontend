/// <reference types="vitest" />
import path from 'path'

import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react(), vanillaExtractPlugin()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/shared/utils/testSetup.ts'],
    include: ['src/**/*.spec.{ts,tsx}'],
    exclude: ['node_modules', 'src/shared/utils/testSetup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'src/shared/utils/testSetup.ts', '**/*.d.ts', '**/*.config.{js,ts}', '**/*.stories.{js,jsx,ts,tsx}']
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
