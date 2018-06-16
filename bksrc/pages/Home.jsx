import React from 'react';
import {actions} from '@/store/counter'
import {withRouter} from 'react-router'

export const actionsConst = {
    SIGNIN: 'AUTH_SIGNIN',
    SIGNOUT: 'AUTH_SIGNOUT'
}

const auth = {
    state: {isLoggedIn: false, user: {}},
    actions: {
        signin: ({commit, state, rootState: {api}}, user) => commit(actionsConst.SIGNIN, user),
        signout: ({commit}) => commit(actionsConst.SIGNOUT)
    },
    mutations: {
        [actionsConst.SIGNIN]: (state, user) => Object.assign(state, {isLoggedIn: true, user}),
        [actionsConst.SIGNOUT]: (state) => Object.assign(state, {isLoggedIn: false, user: {}})
    },
    getters: {
        currentUser: (state) => state.user,
        isLoggedIn: (state) => state.isLoggedIn
    }
}


const store = {
    state: {},
    actions: {},
    mutations: {},
    getters: {},
    services: {}
}

const attachStore = (mods) => {
    Object.keys(mods).map((key) => {
        if (mods[key].state) {
            store.state[key] = mods[key].state
        }
        if (mods[key].actions) {
            Object.keys(mods[key].actions).map(k => {
                store.actions[k] = (payload) => mods[key].actions[k]({
                    commit: (mutation, payloads) => store.mutations[mutation](payloads),
                    state: store.state[key],
                    rootState: store
                }, payload)
            })
        }
        if (mods[key].mutations) {
            Object.keys(mods[key].mutations).map(k => {
                store.mutations[k] = (payload) => mods[key].mutations[k](store.state[key], payload)
            })
        }
        if (mods[key].getters) {
            Object.keys(mods[key].getters).map(k => {
                store.getters[k] = (...arg) => mods[key].getters[k](mods[key].state, ...arg)
            })
        }
    })

}

attachStore({auth})
store.actions.signin({fullname: 'Quang Ngô'})
console.log(store)

// const proxied = new Proxy(store, {
//     get: function (target, prop) {
//         console.log('Proxied get', prop);
//         return Reflect.get(target, prop);
//     },
//     set: function (target, prop, value) {
//         console.log('Proxied set', prop, value);
//         return Reflect.set(target, prop, value);
//     }
// });
//
// const attachStore = (services) => {
//     Object.assign(store, services)
// }

const customRedux = (addProps = {}) => {
    return (WrappedComponent) => {
        return withRouter(class extends React.Component {
            constructor(props) {
                super(props);
                this.state = {}
                // const {match, location, history} = this.props
                // attachStore({router: {match, location, history}})
                //
                // const transSet = (target, prop, value) => {
                //     let result = Reflect.set(target, prop, value);
                //     this.setState(trans)
                //     return result
                // }
                // const trans = new Proxy(proxied, {
                //     get: (target, prop) => {
                //         console.log('Trans proxied get', prop);
                //         return Reflect.get(target, prop);
                //     },
                //     set: transSet.bind(this)
                // });
                // this.state = addProps(trans)
            }

            render() {
                return <WrappedComponent {...this.state} />;
            }
        });
    }
}

class HomePage extends React.Component {
    render() {
        let {counter, addCounter} = this.props;
        return (<div>
            Home abcaa {counter} caqwqasqw
            <button type="button" onClick={addCounter}>Thu 1 cai nha</button>
        </div>)
    }
}

export const Home = customRedux((store) => ({
    counter: 1,
    addCounter: () => {
        console.log({...store})
        store.counter = (store.counter || 0) + 1
    }
}))(HomePage)
// export const Home = connect(state => ({counter: state.counter}), {...actions})(HomePage)

