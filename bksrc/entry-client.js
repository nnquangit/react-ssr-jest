import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router';
import {App} from './App'
import {createStore, logPlugin, routerPluginClient, ssrPlugin} from './store';
import {createApi} from "./services/api";
import {createCookies} from "./services/cookies";
import {createBrowserHistory} from "history";

const store = createStore()
const $cookies = createCookies()
const $api = createApi(store)
const history = createBrowserHistory();

store.attachServices({$api, $cookies})
store.attachPlugins([
    logPlugin(),
    ssrPlugin(),
    routerPluginClient(history)
])

const render = (Main) => {
    ReactDOM.hydrate(<Router history={history}><Main/></Router>, document.getElementById('app'));
}

render(App)

if (module.hot) {
    module.hot.accept('./App', function () {
        const {App: newApp} = require('./App')
        render(newApp)
    });
    module.hot.accept('./store', function () {
        const oldstate = store.getStateCapture()
        const {createStore} = require('./store');
        createStore().replaceState(oldstate)
    });
}