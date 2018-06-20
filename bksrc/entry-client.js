import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {App} from './App'
import {createStore} from './store';
import {createApi} from "./services/api";

const $api = createApi()
createStore([], {$api})

const render = () => {
    ReactDOM.hydrate(<Router>
        <App/>
    </Router>, document.getElementById('app'));
}

render()

if (module.hot) {
    module.hot.accept()
}