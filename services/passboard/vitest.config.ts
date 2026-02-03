/// <reference types="vitest" />
import path from 'path'

import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  // @ts-expect-error: Vite 7과 Vitest 4 및 플러그인 간의 물리적 경로 차이로 발생하는 타입 불일치 에러를 무시합니다. (런타임 및 빌드에는 영향 없음)
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
