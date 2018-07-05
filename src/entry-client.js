import React from 'react'
import ReactDOM from 'react-dom'
import {Router} from 'react-router'
import {createBrowserHistory} from 'history'
import {createStore} from './store'
import {createApi, createCookies} from './store/services'
import {logPlugin, persitAuthPlugin, routerPluginClient, ssrPlugin} from './store/plugins'
import 'bootstrap/dist/js/bootstrap.js'
import {App} from './App'

const history = createBrowserHistory()
const store = createStore()
const $cookies = createCookies()
const $api = createApi(store)

store.attachServices({$api, $cookies})
store.attachPlugins([
    ssrPlugin(),
    routerPluginClient(history),
    persitAuthPlugin(),
    logPlugin()
])

const render = (Main) => {
    ReactDOM.hydrate(<Router history={history}><Main/></Router>, document.getElementById('app'))
}

render(App)

if (module.hot) {
    module.hot.accept('./App', function () {
        const {App: newApp} = require('./App')
        render(newApp)
    })
}
