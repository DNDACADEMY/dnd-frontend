import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    react(),
    vanillaExtractPlugin(),
    dts({
      include: ['src'],
      exclude: ['**/*.stories.tsx', '**/*.test.tsx', '**/*.test.ts']
    })
  ],
  build: {
    lib: {
      entry: './src/primitives/index.tsx',
      formats: ['es'],
      fileName: () => 'index.js'
    },
    rollupOptions: {
      external: ['react', 'react-dom']
    },
    sourcemap: true
  }
})
