// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import { config as baseConfig } from '@dnd-frontend/eslint-config/base'
import storybook from 'eslint-plugin-storybook'

/** @type {import("eslint").Linter.Config} */
export default [...baseConfig, ...storybook.configs['flat/recommended']]
