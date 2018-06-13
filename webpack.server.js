const path = require('path');
const nodeExternals = require('webpack-node-externals')
const {SSRServerPlugin} = require('ssr-webpack-plugin')

var isJS = function (file) {
    return /\.js(\?[^.]+)?$/.test(file);
};

class TestWebpackPlugin {
    apply(compiler) {
        console.log('TestWebpackPlugin', "\n")
        compiler.options.module.rules.push({test: /\.css$/, use: 'ignore-loader'})

        compiler.hooks.emit.tap("Make ssr-bundle", function (compilation, cb) {
            var stats = compilation.getStats().toJson();
            console.log(stats.entrypoints)
            return cb
        });

        // compiler.plugin('emit', function (compilation, cb) {
        //     var stats = compilation.getStats().toJson();
        //     console.log('done')
        //     stats.assets.forEach(function (asset) {
        //         console.log(asset.name, "\n")
        //         // if (asset.name.match(/\.css$/)) {
        //         //     console.log("css", asset.name)
        //         // } else if (asset.name.match(/\.js$/)) {
        //         //     console.log("js", asset.name)
        //         // } else if (asset.name.match(/\.js\.map$/)) {
        //         //     console.log("map", asset.name)
        //         // }
        //         // do not emit anything else for server
        //         // delete compilation.assets[asset.name];
        //     });
        //
        //     // var entryName = Object.keys(stats.entrypoints)[0];
        //     // var entryInfo = stats.entrypoints[entryName];
        //     // var entryAssets = entryInfo.assets.filter(isJS);
        //     // var entry = entryAssets[0];
        //     //
        //     // var bundle = {
        //     //     entry: entry,
        //     //     files: {},
        //     //     maps: {}
        //     // };
        //     //
        //     // stats.assets.forEach(function (asset) {
        //     //     if (asset.name.match(/\.js$/)) {
        //     //         bundle.files[asset.name] = compilation.assets[asset.name].source();
        //     //     } else if (asset.name.match(/\.js\.map$/)) {
        //     //         bundle.maps[asset.name.replace(/\.map$/, '')] = JSON.parse(compilation.assets[asset.name].source());
        //     //     }
        //     //     // do not emit anything else for server
        //     //     delete compilation.assets[asset.name];
        //     // });
        //     //
        //     // var json = JSON.stringify(bundle, null, 2);
        //     //
        //     // compilation.assets['server-ssr-bundle.js'] = {
        //     //     source: function () {
        //     //         return json;
        //     //     },
        //     //     size: function () {
        //     //         return json.length;
        //     //     }
        //     // };
        //
        //     // var json = JSON.stringify(bundle, null, 2);
        //     // var filename = 'server-ssr-test.json';
        //     //
        //     // compilation.assets[filename] = {
        //     //     source: function () { return json; },
        //     //     size: function () { return json.length; }
        //     // };
        //
        //     cb();
        //
        // })
    }
}
module.exports = {
    name: 'Abcd',
    target: 'node',
    mode: 'production',
    entry: path.resolve(__dirname, 'src/entry-server.js'),
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'server-bundle.js',
        libraryTarget: 'commonjs2'
    },
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
