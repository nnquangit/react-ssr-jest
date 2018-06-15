const path = require('path');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const nodeExternals = require('webpack-node-externals')
const {SSRServerPlugin} = require('./plugin')

const resolve = (file) => path.resolve(__dirname, file)

module.exports = {
    target: 'node',
    mode: 'production',
    entry: resolve('./bksrc/entry-server.js'),
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'server-react-bundle.js',
        libraryTarget: 'commonjs2'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.vue'],
        alias: {
            '@': resolve('./bksrc'),
            'vue$': 'vue/dist/vue.common.js'
        }
    },
    externals: nodeExternals({whitelist: /\.css$/}),
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {hotReload: true}
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader?cacheDirectory',
            },
        ]
    },
    plugins: [
        new HardSourceWebpackPlugin(),
        new SSRServerPlugin()
    ]
};
