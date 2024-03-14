const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
module.exports = {
  addons: ['@storybook/addon-a11y', '@storybook/addon-jest', '@storybook/addon-mdx-gfm'],
  framework: {
    name: '@storybook/angular',
    options: {}
  },
  features: {
    previewMdx2: true
  },
  webpackFinal: async config => {
    const tsPaths = new TsconfigPathsPlugin({
      configFile: './tsconfig.base.json'
    });
    config.resolve.plugins ? config.resolve.plugins.push(tsPaths) : config.resolve.plugins = [tsPaths];

    // add your own webpack tweaks below if needed

    // add your own webpack tweaks above if needed

    return config;
  },
  docs: {
    autodocs: true
  }
};