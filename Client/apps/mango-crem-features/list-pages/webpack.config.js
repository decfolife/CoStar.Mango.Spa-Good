const webpackMerge = require('webpack-merge')
const baseConfig = require('../../../base-webpack.config')

module.exports = webpackMerge.merge(baseConfig, {
  output: {
    chunkLoadingGlobal: 'listPageschunkLoadingGlobal',
    library: 'listPages',
  },
})