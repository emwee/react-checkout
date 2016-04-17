var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: {
      app: './index.js'
  },
  output: {
      path: __dirname,
      filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loader: 'style!css'
    },
    {
      test: /\.js$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader',
      query: {
          presets: ['es2015', 'stage-2', 'react']
      }
    },
    {
      test: /\.json$/,
      loader: 'json-loader'
    }]
  },
  devtool: 'cheap-module-eval-source-map'
}