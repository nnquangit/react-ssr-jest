const path = require('path');
const nodeExternals = require('webpack-node-externals')
const {SSRServerPlugin} = require('ssr-webpack-plugin')

var isJS = function (file) {
    return /\.js(\?[^.]+)?$/.test(file);
};

class TestWebpackPlugin {
    apply(compiler) {
        compiler.options.module.rules.push({test: /\.css$/, use: 'ignore-loader'})

        compiler.hooks.emit.tap("Make ssr-bundle", function (compilation, cb) {
            var stats = compilation.getStats().toJson();
            return cb
        });
    }
}
module.exports = {
    target: 'node',
    mode: 'production',
    entry: path.resolve(__dirname, 'src/app/vue.js'),
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'server-vue-bundle.js',
        libraryTarget: 'commonjs2'
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
        new TestWebpackPlugin()
    ]
};
