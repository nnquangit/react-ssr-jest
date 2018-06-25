import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router';
import {createBrowserHistory} from "history";
import {createStore} from './store';
import {logPlugin, routerPluginClient, ssrPlugin} from './store/plugins';
import {createApi} from "./services/api";
import {createCookies} from "./services/cookies";
import {createFirebase} from "./services/firebase";
import {App} from './App'

const history = createBrowserHistory();
const store = createStore()
const $cookies = createCookies()
const $api = createApi(store)
const $firebase = createFirebase()

store.attachServices({$api, $cookies, $firebase})
store.attachPlugins([
    logPlugin(),
    ssrPlugin(),
    routerPluginClient(history),
    (_store) => {
        let {$cookies} = _store.getServices()
        let saved = $cookies.getItem('__auth');

        if (saved) {
            _store.replaceState({..._store.getState(), auth: JSON.parse(saved)})
        }

        _store.subscribe((msg) => $cookies.setItem('__auth', JSON.stringify(_store.getState().auth)))
    }
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