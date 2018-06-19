const path = require('path');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const nodeExternals = require('webpack-node-externals')
const {SSRServerPlugin} = require('ssr-plugin')

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
            {test: /\.(css|less|scss|sass|styl)$/, use: 'ignore-loader'},
            {test: /\.vue$/, loader: 'vue-loader', options: {hotReload: true}},
            {test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel-loader',},
        ]
    },
    plugins: [
        new HardSourceWebpackPlugin(),
        new SSRServerPlugin()
    ]
};
