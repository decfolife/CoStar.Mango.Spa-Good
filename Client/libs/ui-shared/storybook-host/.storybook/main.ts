const rootMain = require('../../../../.storybook/main');
import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  ...rootMain,
  core: { ...rootMain.core, builder: 'webpack5' },
  stories: [
    // ...rootMain.stories,
    /**
     * Libraries and components, tokens and documentation below
     */
    // General Storybook Documentation
    '../docs/**/*.stories.mdx',
    // Tokens
    '../../common/**/*.stories.mdx',
    '../../common/**/*.stories.@(js|jsx|ts|tsx)',
    // Add ui-shared folders below, add same folders on tsconfig.json as well
    '../../lib-ui-shared/**/*.stories.mdx',
    '../../lib-ui-shared/**/*.stories.@(js|jsx|ts|tsx)',
    '../../lib-ui-elements/**/*.stories.mdx',
    '../../lib-ui-elements/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: ['@storybook/addon-essentials', ...(rootMain.addons || [])],
  previewHead: (head) => `
  ${head}
  <style>
  .sbdocs-content {
    max-width: 1500px !important
  }
  </style>
  `
};

module.exports = config;
