import React from 'react';
import ReactDOM from 'react-dom';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import {App} from './App'
import {createStore} from './store';

createStore()

const render = (Main) => {
    ReactDOM.hydrate(<BrowserRouter><Main/></BrowserRouter>, document.getElementById('app'));
}

render(App)

if (module.hot) {
    module.hot.accept('./App', () => {
        const {App: nextApp} = require('./App')
        render(nextApp)
    })
}