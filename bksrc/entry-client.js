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
    (_store) => {
        let saved = localStorage.getItem('sharetab');
        if (saved) {
            _store.data.state = JSON.parse(saved)
        }
        _store.subscribe((msg) => localStorage.setItem('sharetab', JSON.stringify(_store.data.state)))
    }
])

const render = () => {
    ReactDOM.hydrate(<Router>
        <App/>
    </Router>, document.getElementById('app'));
}

render()

if (module.hot) {
    module.hot.accept()
}