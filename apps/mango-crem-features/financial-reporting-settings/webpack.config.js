const webpackMerge = require('webpack-merge');
const baseConfig = require('../../../base-webpack.config');

module.exports = webpackMerge.merge(baseConfig, {
  output: {
    chunkLoadingGlobal: 'FINANCIAL_REPORTING_SETTINGSchunkLoadingGlobal',
    library: 'FINANCIAL_REPORTING_SETTINGS',
  },
});
