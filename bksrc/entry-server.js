import React from 'react';
import ReactDOMServer from 'react-dom/server';
import StaticRouter from 'react-router-dom/StaticRouter';
import {App} from './App'
import {createStore} from './store';

createStore()

export function createApp({req, res}) {
    let context = {};
    return new Promise((resolve, reject) => {
        const html = ReactDOMServer.renderToString(
            <StaticRouter location="/" context={context}>
                <App/>
            </StaticRouter>
        );
        resolve({html})
    })
}
