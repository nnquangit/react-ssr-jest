import React from 'react';
import ReactDOM from 'react-dom';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import {connectRouter, routerMiddleware} from 'connected-react-router'
import {Provider} from "react-redux";
import {applyMiddleware, compose, createStore} from 'redux'
import thunk from "redux-thunk";
import {createBrowserHistory} from 'history'
import {App} from './App'
import {rootReducers} from './store';

const history = createBrowserHistory()
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    connectRouter(history)(rootReducers()),
    {},
    composeEnhancer(applyMiddleware(routerMiddleware(history), thunk))
)


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