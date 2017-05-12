var path = require('path');
var webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var helpers = require('./helpers');


const PATHS = {
    app: './app/index.js',
    html: './app/index.html',
    lib: './lib/index.js',
    src: path.join(__dirname, 'app'),
    libDir: path.join(__dirname, 'lib'),
    dist: path.join(__dirname, 'dist'),
    routes: path.join(__dirname, 'app/routes'),
    eslintrc: path.join(__dirname, './.eslintrc')
}

const main = path.join(helpers.src, 'main.ts');
const vendor = path.join(helpers.src, 'vendor.ts');
const polyfills = path.join(helpers.src, 'polyfills.ts');

module.exports = {
    entry: {
        polyfills: polyfills,
        vendor: vendor,
        app: main
    },
    output: {
        filename: "[name].bundle.js",
        chunkFilename: "[id].chunk.js",
        path: helpers.dist
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        alias: {
            '@app': helpers.root('ng', 'app')
        }
    },
    module: {
        rules: [{
                test: /\.tsx?$/,
                loaders: [{
                        loader: 'awesome-typescript-loader',
                        options: {
                            configFileName: './tsconfig.json'
                        }
                    },
                    'angular2-template-loader' //?keepUrl=true'
                ],
                exclude: [/\.(spec|e2e)\.ts$/]
            },
            {
                test: /\.(png|jpg|gif|woff|woff2|ttf|svg|eot)$/,
                use: 'url-loader?limit=10000' //loader: 'file-loader?name=assets/[name].[ext]'
            },
            {
                test: /favicon.ico$/,
                loader: 'file-loader?name=/[name].[ext]'
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader'
                }],
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),
        new CleanWebpackPlugin(['*'], {
            root: helpers.dist,
            verbose: true,
            dry: false
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            inject: 'body',
            chunksSortMode: 'dependency',
            template: helpers.root('ng/index.html')
        }),
        new CopyWebpackPlugin([{
            from: helpers.root('ng/assets/img/*.*'),
            to: 'assets/img',
            flatten: true
        }])
    ]
};