const path = require('path')
const fs = require('fs')

class SSRClientPlugin {
    constructor(options = {}) {
        this.options = {filename: 'ssr-client-manifest.json', ...options}
    }

    apply(compiler) {
        let filename = this.options.filename;
        compiler.hooks.emit.tap("SSRClientPlugin", function (compilation, cb) {
            let stats = compilation.getStats().toJson();
            let assets = [];
            Object.values(stats.entrypoints).map(v => assets = [...assets, ...v.assets])
            let data = {
                publicPath: stats.publicPath,
                assets: assets,
                css: assets.filter(name => name.match(/\.css$/)),
                js: assets.filter(name => name.match(/\.js$/))
            }
            if (compiler.outputFileSystem && compiler.outputFileSystem.mkdirpSync) {
                compiler.outputFileSystem.mkdirpSync(stats.outputPath);
                compiler.outputFileSystem.writeFileSync(path.join(stats.outputPath, filename), JSON.stringify(data));
            } else {
                fs.writeFileSync(path.join(stats.outputPath, filename), JSON.stringify(data));
            }
            return cb
        });
    }
}

class SSRServerPlugin {
    apply(compiler) {
        compiler.options.module.rules.push({test: /\.css$/, use: 'ignore-loader'})

        compiler.hooks.emit.tap("SSRServerPlugin", function (compilation, cb) {
            let stats = compilation.getStats().toJson();
            return cb
        });
    }
}

module.exports = {SSRClientPlugin, SSRServerPlugin}