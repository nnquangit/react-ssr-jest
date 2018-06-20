import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {App} from './App'
import {createStore} from './store';
import {createApi} from "./services/api";
import {createCookies} from "./services/cookies";

const store = createStore()
const $cookies = createCookies()
const $api = createApi(store)

store.attachServices({$api, $cookies})
store.attachPlugins([
    (_store) => _store.data.state = window.__INITIAL_STATE__,
])

const render = (Main) => {
    ReactDOM.hydrate(<Router><Main/></Router>, document.getElementById('app'));
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