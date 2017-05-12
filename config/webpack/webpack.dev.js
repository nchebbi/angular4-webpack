var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');
var webpack = require('webpack');
var path = require('path');

const ExtractCSS = new ExtractTextPlugin('[name]_css.css');
const ExtractSCSS = new ExtractTextPlugin('[name]_scss.css');
module.exports = webpackMerge(commonConfig, {
  entry: {
     //client:  'webpack-hot-middleware/client?http://localhost:9000/',
    //devserver: 'webpack/hot/dev-server', // "only-dev-server" prevents reload on syntax errors
  },
  output: {
    path: helpers.root('wwwroot'),
    filename: "[name].bundle.js",
    chunkFilename: "[id].chunk.js",
  },
   module: {
        rules: [
            {
                test: /\.css$/,
                include: helpers.root('ng', 'app'),
                use: ['to-string-loader', 'css-loader']
            },
            {
                test: /\.css$/,
                include: [path.resolve(helpers.src, 'assets/css')], //helpers.root('ng','app.css'),
                use: ExtractCSS.extract({
                    fallback: "style-loader",
                    use: ['css-loader']
                })
            },
            {
                test: /\.scss$/,
                include: [path.resolve(helpers.src, 'assets/css')],
                use: ExtractSCSS.extract({
                    fallback: "style-loader",
                    use: ['css-loader', 'sass-loader']
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
    ],
 // plugins:[new webpack.HotModuleReplacementPlugin()],
  watch: true,
  devServer: {
    contentBase: helpers.dist,
    compress: true,
    port: 9000,
    inline: true,
    historyApiFallback: true,
    open: true,
   // hot: true
  }
});