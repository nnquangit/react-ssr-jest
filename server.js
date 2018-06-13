require('babel-register')
process.traceDeprecation = true

const MFS = require('memory-fs')
const express = require('express')
const path = require('path')
const port = 3000;
const app = express();
const webpack = require('webpack')
// const config = require('./webpack.config.js');
// const readFile = (output, file) => output.readFileSync(path.join(config.output.path, file), 'utf-8')
const ReactDOMServer = require('react-dom/server')
const {createApp} = require('./public/server-bundle')
const ejs = require('ejs');

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

// const clientCompiler = webpack(config);
// clientCompiler.outputFileSystem = new MFS()
// const devMiddleware = require('webpack-dev-middleware')(clientCompiler, {
//     publicPath: config.output.publicPath,
//     stats: {
//         colors: true,
//         modules: false,
//         children: false,
//         entrypoints: false,
//     },
//     watchOptions: {
//         aggregateTimeout: 300,
//         poll: 1000
//     }
// })
// // console.log(createApp())
// app.use(devMiddleware);
// clientCompiler.hooks.done.tap("Client compiled", function (compilation, callback) {
//     // const HTML = readFile(clientCompiler.outputFileSystem, 'index.html');
//     // console.log('bbbbb', HTML)
//     console.log("Client compiled", ReactDOMServer.renderToStaticMarkup(App))
// });

createApp({req: {url: '/inbox'}, res: ''}).then(({html}) => console.log(html))
// app.get('*', (req, res) => {
//     createApp({req, res}).then(context => res.render('index', context))
// })

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
