import React from 'react';
import {createStore as makeStore} from '../plugins/exstore'
import auth from './auth';
import users from './users';
import counter from './counter';

export function createStore() {
    return makeStore({
        modules: {auth, users, counter}
    });
}

export * from "./plugins"
