import React from 'react';
import {renderToString} from 'react-dom/server';
import {StaticRouter} from "react-router-dom";
import {App} from './App';
import {Helmet} from "react-helmet";

export function createApp({req, res}) {
    console.log(req.url)
    return new Promise((resolve, reject) => {
        const html = renderToString(
            <div>
                <div>Server before</div>
                <StaticRouter location={req.url} context={{}}>
                    <App/>
                </StaticRouter>
                <div>Server after</div>
            </div>
        );
        const helmet = Helmet.renderStatic();
        resolve({html, helmet})
    })
}
