const path = require('path');
const nodeExternals = require('webpack-node-externals')
const {SSRServerPlugin} = require('ssr-webpack-plugin')

module.exports = {
    target: 'node',
    mode: 'production',
    entry: path.resolve(__dirname, 'src/entry-server.js'),
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'server-react-bundle.js'
        // libraryTarget: 'commonjs2'
    },
    externals: nodeExternals({whitelist: /\.css$/}),
    module: {
        rules: [
            // {test: /\.css$/, use: 'ignore-loader'},
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader?cacheDirectory',
            },
        ]
    },
    plugins: [
        new SSRServerPlugin()
    ]
};
