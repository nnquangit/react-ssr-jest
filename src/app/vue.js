const renderer = require('vue-server-renderer').createRenderer()
const Vue = require('vue')
const app = new Vue({
    template: `<div>Hello World Vue</div>`
})

export function createApp({req, res}) {
    return new Promise((resolve, reject) => {
        renderer.renderToString(app, (err, html) => {
            resolve({html, meta: {title: 'Wellcome'}})
        })

    })
}