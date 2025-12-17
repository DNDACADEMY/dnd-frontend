import { nextJsConfig } from '@dnd-frontend/eslint-config/next-js'

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...nextJsConfig,
  {
    rules: {
      'turbo/no-undeclared-env-vars': 'off'
    }
  }
]
