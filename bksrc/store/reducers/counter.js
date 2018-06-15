const define = {
    ADD: 'COUNTER_ADD',
}

const actions = {
    addCounter: () => (dispatch, rootState) => dispatch({type: define.ADD})
}

const reducer = (state = 15, action) => {
    switch (action.type) {
        case define.ADD:
            state += 8;
            return state
        default:
            return state
    }
}

export {define, actions, reducer}
