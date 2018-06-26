import {createStore as makeStore} from 'exstore'
import modules from './modules'

export function createStore() {
    return makeStore({modules})
}
