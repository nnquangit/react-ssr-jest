require('babel-register')
process.traceDeprecation = process.env.NODE_ENV === 'production'

const express = require('express')
const path = require('path')
const port = process.env.PORT || 8080
const app = express()
const ejs = require('ejs')
const favicon = require('serve-favicon')

const isProd = process.env.NODE_ENV === 'production'
const resolve = (file) => path.resolve(__dirname, file)
const serve = (path, cache) => express.static(resolve(path), {maxAge: 0})

app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'html')
app.engine('html', ejs.renderFile)

app.use(favicon('./static/favicon.ico'))
app.use('/static', serve('./static', true))
app.use('/', serve('./public', true))

let manifest, serverBundle, readyPromise
if (isProd) {
    serverBundle = require('./public/server-react-bundle')
    manifest = require('./public/ssr-client-manifest')
} else {
    readyPromise = require('./build/setup-dev-server')(app, (opt) => {
        serverBundle = opt.serverBundle
        manifest = opt.manifest
    })
}

const render = (req, res) => {
    serverBundle.createApp({req, res}).then(data => res.render('index', {...data, manifest}))
}

app.get('*', isProd ? render : (req, res) => readyPromise.then(() => render(req, res)))

app.listen(port, function (error) {
    if (error) {
        console.log(error)
    } else {
        console.log(`http://localhost:${port}`)
    }
})
