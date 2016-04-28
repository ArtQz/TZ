var path = require('path');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: [
    'babel-core/polyfill',
    './app'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'app.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [
          path.join(__dirname, 'src'),
          /retail-ui/,
        ],
      },
      {
        test: /\.(css|less)$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {test: /\.less$/, loader: 'less-loader'},
      {test: /\.(png|woff|eot)$/, loader: "file-loader"},
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      ui: 'retail-ui/components'
    },
  },
  plugins: [
    new ExtractTextPlugin('app.css'),
  ],
  devtool: 'source-map',
};
