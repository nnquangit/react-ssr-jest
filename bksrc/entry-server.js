import React from 'react';
import ReactDOMServer from 'react-dom/server';
import StaticRouter from 'react-router-dom/StaticRouter';
import {createStore} from './store';
import {createApi} from './services/api';
import {App} from './App'
import {createCookies} from "./services/cookies";

export function createApp({req, res}) {
    const store = createStore()
    const $cookies = createCookies({req, res})
    const $api = createApi(store)

    store.attachServices({$api, $cookies})

    return new Promise((resolve, reject) => {
        const html = ReactDOMServer.renderToString(
            <StaticRouter location={req.url} context={{}}>
                <App/>
            </StaticRouter>
        );
        const state = JSON.stringify(store.getStateCapture());

        resolve({html, state})
    })
}
