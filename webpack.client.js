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
const AssetsPlugin = require('assets-webpack-plugin')
const {SSRClientPlugin} = require('./plugin')

const isProd = process.env.NODE_ENV === 'production'
const resolve = (file) => path.resolve(__dirname, file)

const config = {
    entry: {app: resolve('./src/entry-client.js')},
    mode: isProd ? 'production' : 'development',
    devtool: isProd ? false : '#cheap-module-eval-source-map',
    devServer: {
        open: false,
        index: "index.html",
        openPage: '',
        contentBase: './client',
        compress: true,
        hot: true,
        historyApiFallback: true
    },
    performance: {
        hints: isProd ? 'warning' : false,
        maxEntrypointSize: 1024 * 1024,
        maxAssetSize: 500 * 1024,
    },
    optimization: {
        splitChunks: {
            chunks: "async",
            minSize: 1000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: true,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "initial",
                    priority: -10
                },
                default: {
                    minChunks: 1,
                    priority: -20,
                    reuseExistingChunk: true,
                }
            }
        },
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
        runtimeChunk: true,
    },
    output: {
        path: resolve('./public'),
        publicPath: '/',
        filename: '[name].[hash].js'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {'@': resolve('./src')}
    },
    module: {
        rules: [
            {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {importLoaders: 1, minimize: {modules: true, discardComments: {removeAll: true}}}
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
        // new HardSourceWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].[hash].css",
            chunkFilename: "[name].[hash].css"
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            inject: 'body'
        }),
        new webpack.ProvidePlugin({
            'jQuery': 'jquery',
            '$': 'jquery',
            'Popper': 'popper.js',
        }),
        new SSRClientPlugin()
    ]
}

// if (isProd) {
//     config.plugins.push(new CompressionPlugin({
//         asset: "[path].gz[query]",
//         algorithm: "gzip",
//         test: /\.js$|\.css$|\.html$/,
//         threshold: 10240,
//         minRatio: 0.8
//     }))
// }

module.exports = config
