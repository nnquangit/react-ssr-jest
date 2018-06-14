require('babel-register')
process.traceDeprecation = true

const MFS = require('memory-fs')
const express = require('express')
const path = require('path')
const fs = require('fs')
const port = 3000;
const app = express();
const webpack = require('webpack')
// const config = require('./webpack.config.js');
// const readFile = (output, file) => output.readFileSync(path.join(config.output.path, file), 'utf-8')
const ReactDOMServer = require('react-dom/server')
// const react = require('./public/server-react-bundle')
// const vue = require('./public/server-vue-bundle')
const ejs = require('ejs');
const resolve = (file) => path.resolve(__dirname, file)
const readFile = (output, file) => output.readFileSync(file, 'utf-8')

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

const clientConfig = require('./webpack.client.js');
clientConfig.entry.app = ['webpack-hot-middleware/client', clientConfig.entry.app]
clientConfig.output.filename = '[name].js'
clientConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
)

let manifest, clientResolver, clientPromise = new Promise((resolve, reject) => clientResolver = resolve)
const clientCompiler = webpack(clientConfig);
clientCompiler.outputFileSystem = new MFS()
app.use(require('webpack-dev-middleware')(clientCompiler, {
    publicPath: clientConfig.output.publicPath,
    stats: false,
    watchOptions: {aggregateTimeout: 300, poll: 1000}
}));
clientCompiler.hooks.done.tap("Client compiled", function (compilation, callback) {
    let {path: outputPath} = compilation.compilation.options.output;
    let context = readFile(clientCompiler.outputFileSystem, path.join(outputPath, 'ssr-client-manifest.json'));
    manifest = JSON.parse(context);
    clientResolver();
    console.log(">>>>>>>>>>> Client compiled done", context)
    return callback;
});
app.use(require('webpack-hot-middleware')(clientCompiler))

const reactConfig = require('./webpack.server.js');
let serverBundle, reactResolver, reactPromise = new Promise((resolve, reject) => reactResolver = resolve)
const reactCompiler = webpack(reactConfig);
reactCompiler.outputFileSystem = new MFS()
app.use(require('webpack-dev-middleware')(reactCompiler, {
    publicPath: reactConfig.output.publicPath,
    stats: false,
    watchOptions: {aggregateTimeout: 300, poll: 1000}
}));
reactCompiler.hooks.done.tap("React server compiler", function (compilation, callback) {
    let {filename, path: outputPath} = compilation.compilation.options.output;
    let context = readFile(reactCompiler.outputFileSystem, path.join(outputPath, filename));
    serverBundle = eval(context);
    reactResolver();
    console.log(">>>>>>>>>>> Server compiled done", context)
    return callback;
});
reactCompiler.watch({}, (err, stats) => console.log("Webpack server watching..."))
app.use('*', function (req, res, next) {

    app.get('/react', (req, res) => {
        Promise.all([clientPromise, reactPromise]).then(() => {
            serverBundle.createApp({req, res}).then(data => {
                res.render('index', {...data, manifest})
            })
        })
        // reactPromise.then(() => {
        //     reactRender.createApp({req, res}).then(data => {
        //         console.log(data.html)
        //         res.render('index', data)
        //     })
        // })
    })

    // app.get('/vue', (req, res) => {
    //     vue.createApp({req, res}).then(data => {
    //         res.render('index', data)
    //     })
    // })
    next();
});
// clientCompiler.hooks.tap("afterEmit",function (compilation, callback) {
//     console.log("hookshookshooks ", Object.keys(compilation), compilation)
// });
// clientCompiler.plugin("emit", function (compilation, callback) {
//     console.log("aaaaaaaaaaaaaaaaa", Object.keys(compilation), compilation)
// });
// clientCompiler.plugin("emit", function(compilation, callback) {
//     console.log("The compilation is going to emit files...");
//     callback();
// });
// clientCompiler.plugin('after-emit', function(compilation, callback) {
//     console.log("Files Emiited")
//     runGulpTaskToCopyFiles()
//     callback();
// });
// clientCompiler.plugin('done', () => {
//     let clientManifest = JSON.parse(readFile(clientCompiler.outputFileSystem, 'vue-ssr-client-manifest.json'))
//     console.log('clientCompiler.plugin',clientManifest)
// })

app.listen(port, function (error) {
    if (error) {
        console.log(error);
    } else {
        console.log(`http://localhost:${port}`)
    }
});
