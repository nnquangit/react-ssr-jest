import Vue from 'vue'
import './app.css'

Vue.config.productionTip = false

export function rootApp(ssrContext) {
    const app = new Vue({data: {title: 'abcds'}, template: `<div id="app">Hello World Vuejs {{title}}</div>`})
    return {app}
}
