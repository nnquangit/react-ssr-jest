import {applyMiddleware, createStore} from 'redux'
import {rootReducers} from './reducers';
import thunk from "redux-thunk";

export function rootStore(storage) {

    const store = createStore(rootReducers(), applyMiddleware(thunk))

    return store;
}
