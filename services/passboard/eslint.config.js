import { nextJsConfig } from '@dnd-lab/eslint-config/next-js'

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...nextJsConfig,
  {
    ignores: ['public/mockServiceWorker.js']
  },
  {
    rules: {
      'turbo/no-undeclared-env-vars': 'off'
    }
  }
]
