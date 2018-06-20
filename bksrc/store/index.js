import React from 'react';
import {createStore as makeStore} from '../plugins/exstore'
import auth from './auth';
import users from './users';
import counter from './counter';

export function createStore(...arg) {
    return makeStore({auth, users, counter}, ...arg);
}