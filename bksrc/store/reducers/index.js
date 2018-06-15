import {combineReducers} from 'redux'

import {reducer as counter} from './counter';

export function rootReducers(storage) {
    return combineReducers({counter});

}
