import React from 'react';
import {createStore as makeStore} from '../plugins/exstore'
import modules from './modules';

export function createStore() {
    return makeStore({modules});
}