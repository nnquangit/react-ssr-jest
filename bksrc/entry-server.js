import React from 'react';
import ReactDOMServer from 'react-dom/server';
import StaticRouter from 'react-router-dom/StaticRouter';
import {createStore} from './store';
import {createApi} from './services/api';
import {App} from './App'

export function createApp({req, res}) {
    let context = {};
    let store = createStore([], {$api: createApi()})

    return new Promise((resolve, reject) => {
        const html = ReactDOMServer.renderToString(
            <StaticRouter location={req.url} context={context}>
                <App/>
            </StaticRouter>
        );
        resolve({html})
    })
}
