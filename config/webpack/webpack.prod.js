var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');


var path = require('path');
const ExtractCSS = new ExtractTextPlugin('[name]_[hash]_css.css');
const ExtractSCSS = new ExtractTextPlugin('[name]_[hash]_scss.css');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
  devtool: 'source-map',

  output: {
    path: helpers.root('wwwroot'),
    // publicPath: 'https://young-savannah-99031.herokuapp.com/',
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js'
  },
  module: {
    rules: [{
        test: /\.css$/,
        include: helpers.root('ng', 'app'),
        use: ['to-string-loader', 'css-loader']
      },
      {
        test: /\.css$/,
        include: [path.resolve(helpers.src, 'assets/css')], //helpers.root('ng','app.css'),
        use: ExtractCSS.extract({
          fallback: "style-loader",
          use: [{
            loader: "css-loader",
            options: {
              minimize: true
            }
          }]
        })
      },
      {
        test: /\.scss$/,
        include: [path.resolve(helpers.src, 'assets/css')],
        use: ExtractSCSS.extract({
          fallback: "style-loader",
          use: [{
            loader: "css-loader",
            options: {
              minimize: true
            }
          }, 'sass-loader']
        })
      },
      {
        test: /\.scss$/,
        include: [path.resolve(helpers.src, 'app')],
        use: ['to-string-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    ExtractCSS,
    ExtractSCSS,
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      },
      sourceMap: false
    }),
    new ExtractTextPlugin('[name].[hash].css')
  ]
});