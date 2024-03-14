const rootMain = require('../../../../.storybook/main');
import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  ...rootMain,
  core: { ...rootMain.core, builder: 'webpack5' },
  stories: [
    ...rootMain.stories,
    '../**/*.stories.mdx',
    '../**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: ['@storybook/addon-essentials', ...(rootMain.addons || [])],

};

module.exports = config;
