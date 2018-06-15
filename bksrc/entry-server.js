import React from 'react';
import ReactDOMServer from 'react-dom/server';
import StaticRouter from 'react-router-dom/StaticRouter';
import {Provider} from "react-redux";
import {applyMiddleware, compose, createStore} from 'redux'
import thunk from "redux-thunk";
import {App} from './App'
import {rootReducers} from './store';

const store = createStore(
    rootReducers(),
    {},
    compose(applyMiddleware(thunk))
)

export function createApp({req, res}) {
    let context = {};
    return new Promise((resolve, reject) => {
        const html = ReactDOMServer.renderToString(
            <Provider store={store}>
                <StaticRouter location="/" context={context}>
                    <App/>
                </StaticRouter>
            </Provider>
        );
        resolve({html})
    })
}
