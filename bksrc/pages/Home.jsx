import React from 'react';
import * as Rx from "rxjs/index";
import {withRouter} from "react-router";
import PropTypes from 'prop-types';
import {attachComponents} from "../plugins/ExStore";


const subject = new Rx.Subject();

function getStore() {
    return subject
}

function getState() {
    const _store = getStore();
    const _data = _store.data;

    if (!_store.data) {
        throw "Store did not created ! Run createStore before use getState";
    }

    return _data.state;
}

function getStateCapture() {
    const _store = getStore();
    const _data = _store.data;

    if (!_store.data) {
        throw "Store did not created ! Run createStore before use getStateCapture";
    }

    return JSON.parse(JSON.stringify(_data.state));
}

function createStore(mods, plugins = []) {
    const _store = getStore();

    _store.data = {
        state: {}, actions: {}, mutations: {}, getters: {},
        services: {}, plugins: []
    }

    if (plugins.length) {
        _store.data.plugins = [..._store.data.plugins, ...plugins]
    }

    _store.getState = getState;
    _store.getStateCapture = getStateCapture;
    _store.attachModdules = attachModdules;
    _store.attachServices = attachServices;

    _store.attachModdules(mods)

    _store.data.plugins.map(plugin => plugin(_store))

    return _store;
}

function attachModdules(modules) {
    const _store = getStore();
    const _data = _store.data;

    if (!_store.data) {
        throw "Store did not created ! Run createStore before use attachModdules";
    }

    Object.keys(modules).map((module) => {

        _data.state[module] = {...modules[module].state};

        if (modules[module].mutations) {
            Object.keys(modules[module].mutations).map(k => {
                _data.mutations[k] = (payload) => {
                    modules[module].mutations[k](_data.state[module], payload)
                    subject.next({mutation: k, state: _store.getStateCapture()})
                }
            })
        }
        if (modules[module].getters) {
            Object.keys(modules[module].getters).map(k => {
                _data.getters[k] = (payload) => modules[module].getters[k](
                    {..._data.state[module]},
                    payload
                )
            })
        }
        if (modules[module].actions) {
            Object.keys(modules[module].actions).map(k => {
                _data.actions[k] = (payload) => modules[module].actions[k]({
                    commit: (mutation, payloads) => _data.mutations[mutation](payloads),
                    state: {..._data.state[module]},
                    rootState: {..._data, state: _store.getStateCapture()}
                }, payload)
            })
        }
    })
}

function attachServices(services) {
    const _store = getStore();
    const _data = _store.data;

    if (!_store.data) {
        throw "Store did not created ! Run createStore before use attachServices";
    }

    Object.assign(_data.services, services)
}

createStore({
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
        state: {auth: 10, more: 0},
        actions: {
            authCounter: ({state, commit}) => commit('AUTH_ADD'),
            authMore: ({state, commit}) => commit('AUTH_MORE')
        },
        mutations: {
            'AUTH_ADD': (state) => state.auth = state.auth + 1,
            'AUTH_MORE': (state) => state.more = state.more + 1
        }
    }
}).attachServices({
    $api: {
        get: (url) => console.log('$api get ', url),
        post: (url, data) => console.log('$api post ', url, data),
    }
})

getStore().data.actions.addCounter();
getStore().data.actions.addMore();

getStore().data.actions.authCounter();
getStore().data.actions.authMore();

getStore().data.actions.addCounter();
getStore().data.actions.addMore();

getStore().data.actions.authCounter();
getStore().data.actions.authMore();

const connect = (mapToProps = {}) => {
    const _store = getStore();
    const _data = _store.data;

    if (!_store.data) {
        throw "Store did not created ! Run createStore before use connect";
    }

    return (WrappedComponent) => {
        return withRouter(class extends React.Component {
            constructor(props) {
                super(props);
                this.state = mapToProps(_data)
                this.trigger = _store.subscribe((msg) => this.setState(mapToProps(_data)))
            }

            componentWillUnmount() {
                this.trigger.unsubscribe()
            }

            render() {
                return <WrappedComponent {...this.state} Unsubscribe={() => this.trigger.unsubscribe()}/>;
            }
        });
    }
}

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {view: false}
    }

    componentDidMount() {
        this.setState({view: true})
    }

    render() {
        let {counter, addCounter, Unsubscribe} = this.props;
        let {view} = this.state;

        if (!view) {
            return '';
        }

        return (<div>
            Home abcaa {counter.current} caqwqasqw
            <button type="button" onClick={addCounter}>Thu 1 cai nha</button>
            <button type="button" onClick={Unsubscribe}>Unsubscribe</button>
        </div>)
    }
}

export const Home = connect(({state, actions}) => ({...state, ...actions}))(HomePage)
// export const Home = connect(state => ({counter: state.counter}), {...actions})(HomePage)

