import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {App} from './App';

export function createApp({req, res}) {
    return new Promise((resolve, reject) => {
        const html = ReactDOMServer.renderToString(<App/>);
        resolve({html})
    })
}
