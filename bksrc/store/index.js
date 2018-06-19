import React from 'react';
import {createStore as makeStore} from 'exstore'
import auth from './auth';
import counter from './counter';

export function createStore(services, plugins) {
    return makeStore({auth, counter}, services, plugins);
}