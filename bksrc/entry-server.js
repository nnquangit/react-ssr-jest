import React from 'react';
import ReactDOMServer from 'react-dom/server';
import StaticRouter from 'react-router-dom/StaticRouter';
import {matchRoutes} from 'react-router-config';
import {createStore, routerPluginServer} from './store';
import {App} from './App'
import {createApi} from './services/api';
import {createCookies} from "./services/cookies";
import {createFirebase} from "./services/firebase";
import {createRouter} from './router';

export function createApp({req, res}) {
    const store = createStore()
    const $cookies = createCookies({req, res})
    const $api = createApi(store)
    const $firebase = createFirebase()

    store.attachServices({$api, $cookies, $firebase})
    store.attachPlugins([
        routerPluginServer({req, res}),
    ])

    const routes = createRouter()
    const branch = matchRoutes(routes, req.path);

    const promises = branch.map((route) => {
        let asyncData = route.route.component.asyncData;
        return asyncData ? asyncData(store.data) : Promise.resolve(null);
    });

    return new Promise((resolve, reject) => {
        Promise.all(promises).then(() => {
            const html = ReactDOMServer.renderToString(
                <StaticRouter location={req.url} context={{}}>
                    <App/>
                </StaticRouter>
            );
            const state = JSON.stringify(store.getStateCapture());

            resolve({html, state})
        })
    })
}
