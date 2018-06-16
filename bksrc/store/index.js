import React from 'react';
import {makeStore} from '../plugins/ExStore'
import auth from './auth';
import counter from './counter';

export function createStore(init) {
    const store = makeStore(init);

    store.attachModules({auth, counter})

    return store
}