const rootMain = require('../../../../.storybook/main');
import type { StorybookConfig, Options } from '@storybook/core-common';

const config: StorybookConfig = {
  ...rootMain,
  core: { ...rootMain.core, builder: 'webpack5' },
  stories: [
    ...rootMain.stories,
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
  addons: [...(rootMain.addons || [])],
  webpackFinal: async (config, { configType }: Options) => {
    // apply any global webpack configs that might have been specified in .storybook/main.ts
    if (rootMain.webpackFinal) {
      config = await rootMain.webpackFinal(config, { configType } as Options);
    }

    // add your own webpack tweaks if needed
    return config;
  },
};

module.exports = config;
