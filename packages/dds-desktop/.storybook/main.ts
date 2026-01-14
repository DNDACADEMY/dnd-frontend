import { getAbsolutePath } from './utils/getAbsolutePath'

import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-vitest'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-docs')
  ],
  framework: getAbsolutePath('@storybook/react-vite'),
  core: {
    builder: {
      name: '@storybook/builder-vite',
      options: {
        viteConfigPath: 'vite.config.ts'
      }
    }
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript'
  }
}
export default config
