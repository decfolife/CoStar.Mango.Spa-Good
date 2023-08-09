const webpackMerge = require('webpack-merge');
const baseConfig = require('../../../base-webpack.config');

module.exports = webpackMerge.merge(baseConfig, {
  output: {
    chunkLoadingGlobal: 'DATA_SET_DICTIONARYchunkLoadingGlobal',
    library: 'DATA_SET_DICTIONARY',
  },
});
