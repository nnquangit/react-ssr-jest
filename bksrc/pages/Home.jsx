import React from 'react';
import * as Rx from "rxjs/index";
import {withRouter} from "react-router";
import PropTypes from 'prop-types';
import {attachComponents} from "../plugins/ExStore";


const subject = new Rx.Subject();

subject.data = {
    state: {}, actions: {}, mutations: {}, getters: {},
    services: {},
    plugins: [
        //Plugin change root state
        (root) => subject.subscribe((newstate) => {
            console.log('Logger', newstate);
            // subject.data.state = newstate
        })
    ]
}

subject.data.plugins.map(plugin => plugin(subject))

function attMod(mods) {
    const _store = subject.data;
    Object.keys(mods).map((key) => {
        _store.state[key] = mods[key].state

        const _state = new Proxy(_store.state[key], {
            get: (obj, prop) => obj[prop],
            set: (obj, prop, value) => {
                obj[prop] = value
                subject.next({..._store.state, [key]: {...obj}})
                return true;
            }
        })

        if (mods[key].mutations) {
            Object.keys(mods[key].mutations).map(k => {
                _store.mutations[k] = (payload) => mods[key].mutations[k](
                    _state,
                    payload
                )
            })
        }
        if (mods[key].getters) {
            Object.keys(mods[key].getters).map(k => {
                _store.getters[k] = (payload) => mods[key].getters[k](
                    {..._store.state[key]},
                    payload
                )
            })
        }
        if (mods[key].actions) {
            Object.keys(mods[key].actions).map(k => {
                _store.actions[k] = (payload) => mods[key].actions[k]({
                    commit: (mutation, payloads) => _store.mutations[mutation](payloads),
                    state: {..._store.state[key]},
                    rootState: _store
                }, payload)
            })
        }
    })
}

attMod({
    counter: {
        state: {current: 10, more: 0},
        actions: {
            addCounter: ({state, commit}) => commit('DEMO_ADD'),
            addMore: ({state, commit}) => commit('DEMO_MORE')
        },
        mutations: {
            'DEMO_ADD': (state) => state.current = state.current + 1,
            'DEMO_MORE': (state) => state.more = state.more + 1
        }
    },
    auth: {
        state: {current: 10, more: 0},
        actions: {
            authCounter: ({state, commit}) => commit('AUTH_ADD'),
            authMore: ({state, commit}) => commit('AUTH_MORE')
        },
        mutations: {
            'AUTH_ADD': (state) => state.current = state.current + 1,
            'AUTH_MORE': (state) => state.more = state.more + 1
        }
    }
})

subject.data.actions.addCounter();
subject.data.actions.addMore();
subject.data.actions.addCounter();
subject.data.actions.addMore();
subject.data.actions.addCounter();
subject.data.actions.addMore();

const connect = (mapToProps = {}) => {
    return (WrappedComponent) => {
        return withRouter(class extends React.Component {
            constructor(props) {
                super(props);

                // const router = {match, location, history} = this.props
                // attachServices({router})

                this.state = mapToProps(subject.data)

                this.trigger = subject.subscribe((newstate) => {
                    console.log('Local component')
                    this.setState(mapToProps(subject.data))
                })
                // attachComponents(this, mapToProps);
            }

            render() {
                return <WrappedComponent {...this.state} Unsubscribe={() => this.trigger.unsubscribe()}/>;
            }
        });
    }
}

class HomePage extends React.Component {
    render() {
        let {counter, addCounter, Unsubscribe} = this.props;
        return (<div>
            Home abcaa {counter.current} caqwqasqw
            <button type="button" onClick={addCounter}>Thu 1 cai nha</button>
            <button type="button" onClick={Unsubscribe}>Unsubscribe</button>
        </div>)
    }
}

export const Home = connect(({state, actions}) => ({...state, ...actions}))(HomePage)
// export const Home = connect(state => ({counter: state.counter}), {...actions})(HomePage)

