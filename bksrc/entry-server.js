import React from 'react';
import ReactDOMServer from 'react-dom/server';
import StaticRouter from 'react-router-dom/StaticRouter';
import {Provider} from "react-redux";
import {App} from './App'
import {rootStore} from './store';

const store = rootStore()

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
