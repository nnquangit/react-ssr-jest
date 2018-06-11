/*
    ./webpack.config.js
*/

const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'
const resolve = (file) => path.resolve(__dirname, file)

const config = {
    entry: {app: './src/entry-client.js'},
    mode: isProd ? 'production' : 'development',
    devtool: isProd ? false : '#cheap-module-eval-source-map',
    performance: {
        hints: isProd ? 'warning' : false,
        maxEntrypointSize: 1024 * 1024,
        maxAssetSize: 500 * 1024,
    },
    optimization: {
        minimizer: [
            new UglifyJSPlugin({
                uglifyOptions: {
                    warnings: false, compress: true,
                    output: {comments: false},
                    cache: true,
                    parallel: true
                }
            })
        ],
        runtimeChunk: {
            name: "manifest",
        },
    },
    output: {
        path: resolve('./public'),
        publicPath: '/',
        filename: '[name].[hash].js'
    },
    resolve: {
        extensions: ['*', '.js', '.json', '.jsx'],
        alias: {
            '@': resolve('./src'),
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader?cacheDirectory',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {importLoaders: 1, minimize: {discardComments: {removeAll: true}}}
                    },
                    'postcss-loader',
                ],
            },
            {
                test: /\.(sass|scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {minimize: {discardComments: {removeAll: true}}}
                    },
                    'postcss-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {limit: 10000, name: 'fonts/[name].[hash:7].[ext]'}
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {limit: 10000, name: 'img/[name].[hash:7].[ext]'}
            }
        ]
    },
    plugins: [
        new HardSourceWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].[hash].css",
            chunkFilename: "[name].[hash].css"
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.template.html',
            inject: 'body'
        })
    ]
}

if (isProd) {
    config.plugins.push(new CompressionPlugin({
        asset: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
    }))
}

module.exports = config
