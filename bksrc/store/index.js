import React from 'react';
import {makeStore, attachModules} from '@/plugins/ExStore'
import auth from './auth';
import counter from './counter';

export function createStore(init) {
    attachModules({auth, counter})
    return makeStore(init)
}