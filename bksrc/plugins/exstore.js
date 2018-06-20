import * as Rx from "rxjs";
import React from 'react';

const subject = new Rx.Subject();
subject.data = {
    state: {}, actions: {}, mutations: {}, getters: {},
    services: {}, plugins: []
}
subject.getState = getState;
subject.getStateCapture = getStateCapture;
subject.replaceState = replaceState;
subject.attachModules = attachModules;
subject.getServices = getServices;
subject.attachServices = attachServices;
subject.attachPlugins = attachPlugins;

export function getStore() {
    return subject
}

export function getState() {
    return getStore().data.state;
}

export function getStateCapture() {
    return JSON.parse(JSON.stringify(getStore().data.state));
}

export function replaceState(state) {
    const _store = getStore();
    const _data = _store.data;

    _data.state = {...state}
    subject.next({mutation: 'state:replace', state: _store.getStateCapture()})

    return _store;
}

export function createStore(mods, services, plugins = []) {
    const _store = getStore();

    _store.attachModules(mods)

    if (typeof services === 'object') {
        _store.attachServices(services)
    }

    if (plugins.length) {
        _store.attachPlugins(plugins)
    }

    return _store;
}

export function attachModules(modules) {
    const _store = getStore();
    const _data = _store.data;

    Object.keys(modules).map((module) => {

        _data.state[module] = {...modules[module].state};

        if (modules[module].mutations) {
            Object.keys(modules[module].mutations).map(mutation => {
                _data.mutations[mutation] = (payload) => {
                    modules[module].mutations[mutation](_data.state[module], payload)
                    subject.next({mutation: mutation, state: _store.getStateCapture()})
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

    return _store;
}

export function getServices(services) {
    return getStore().data.services;
}

export function attachServices(services) {
    const _store = getStore();
    const _data = _store.data;

    Object.assign(_data.services, services)

    return _store;
}

export function attachPlugins(plugins) {
    const _store = getStore();
    const _data = _store.data;

    if (plugins.length) {
        plugins.map(plugin => {
            _data.plugins.push(plugin)
            plugin(_store)
        })
    }

    return _store;
}

export const connectReact = (mapToProps = {}) => {
    const _store = getStore();
    const _data = _store.data;

    return (WrappedComponent) => {
        return class extends React.Component {
            constructor(props) {
                super(props);
                this.state = mapToProps(_data)
                this.subscribe = _store.subscribe((msg) => this.setState(mapToProps(_data)))
            }

            componentWillUnmount() {
                this.subscribe.unsubscribe()
            }

            render() {
                return <WrappedComponent {...this.state}/>;
            }
        };
    }
}