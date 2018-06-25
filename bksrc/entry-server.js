import React from 'react';
import {rootApp} from './app'

const renderer = require('vue-server-renderer').createRenderer()

export function createApp({req, res}) {
    return new Promise((resolve, reject) => {
        let {app} = rootApp({})
        renderer.renderToString(app, (err, html) => {
            if (err) throw err
            resolve({html})
        })

    })
}
