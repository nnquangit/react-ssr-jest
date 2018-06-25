import {rootApp} from './app'

let {app} = rootApp({})

app.$mount()

if (module.hot) {
    const api = require('vue-hot-reload-api')
    const Vue = require('vue')

    // make the API aware of the Vue that you are using.
    // also checks compatibility.
    api.install(Vue)

    // compatibility can be checked via api.compatible after installation
    if (!api.compatible) {
        throw new Error('vue-hot-reload-api is not compatible with the version of Vue you are using.')
    }

    // indicate this module can be hot-reloaded
    module.hot.accept()
}