import React from 'react';
import ReactDOM from 'react-dom';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import {Provider} from "react-redux";
import {App} from './App'
import {rootStore} from './store';

const store = rootStore()

const render = (Main) => {
    ReactDOM.hydrate((
        <Provider store={store}>
            <BrowserRouter><Main/></BrowserRouter>
        </Provider>
    ), document.getElementById('app'));
}

render(App)


if (module.hot) {
    module.hot.accept('./App', () => {
        const {App: nextApp} = require('./App')
        render(nextApp)
    })
}