const webpack = require('webpack');
const path = require('path');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

const resolve = (file) => path.resolve(__dirname, file)

module.exports = {
    target: 'node',
    mode: 'production',
    entry: resolve('src/entry-server.js'),
    output: {
        path: resolve('public'),
        filename: 'server-bundle.js',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {test: /\.css$/, use: 'ignore-loader'},
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader?cacheDirectory',
            },
        ]
    },
    plugins: [
        new HardSourceWebpackPlugin(),
        new webpack.ProvidePlugin({
            'jQuery': 'jquery',
            '$': 'jquery',
            'Popper': 'popper.js',
        })
    ]
};
