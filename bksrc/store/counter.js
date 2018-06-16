import {api} from '../services';

const define = {
    ADD: 'COUNTER_ADD',
}

const actions = {
    addCounter: () => (dispatch, rootState) => dispatch({type: define.ADD})
}

const reducer = (state = 15, action) => {
    switch (action.type) {
        case define.ADD:
            state += 1;
            return state
        default:
            return state
    }
}

const getters = {
    counter: (state) => state
}

export {define, actions, getters, reducer}
