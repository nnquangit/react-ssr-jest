import {createStore} from 'redux'
import {rootReducers} from './reducers';

export function rootStore(storage) {
    const store = createStore(rootReducers())

    // if (module.hot) {
    //     module.hot.accept('./reducers/index.js', () => {
    //         const {rootReducers: nextrootReducers} = require('./reducers/index.js');
    //         store.replaceReducer(nextrootReducers());
    //     })
    // }

    return store;
}
