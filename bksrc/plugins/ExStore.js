import React from 'react';
import {withRouter} from 'react-router'

function observe(o, callback) {
    function buildProxy(prefix, o) {
        return new Proxy(o, {
            set(target, property, value) {
                let result = target[property] = value;
                callback(prefix + property, value);
                return result;
            },
            get(target, property) {
                const out = target[property];
                if (out instanceof Object) {
                    return buildProxy(prefix + property + '.', out);
                }
                return out;
            },
        });
    }

    return buildProxy('', o);
}

const store = {
    state: observe({}, () => store.components.map(v => v.comp.setState(v.mapToProps(store)))),
    actions: {}, mutations: {}, getters: {}, services: {}, components: []
}

export const replaceState = (newstate) => {
    Object.assign(store.state, newstate)
}
export const exportState = () => {
    return {...store.state}
}
export const attachComponents = (comp, mapToProps) => {
    store.components.push({comp, mapToProps})
}
export const attachModules = (mods) => {
    Object.keys(mods).map((key) => {
        if (mods[key].state) {
            store.state[key] = mods[key].state
        }
        if (mods[key].mutations) {
            Object.keys(mods[key].mutations).map(k => {
                store.mutations[k] = (payload) => {
                    return mods[key].mutations[k](
                        store.state[key],
                        payload
                    )
                }
            })
        }
        if (mods[key].getters) {
            Object.keys(mods[key].getters).map(k => {
                store.getters[k] = (payload) => {
                    return mods[key].getters[k](
                        store.state[key],
                        payload
                    )
                }
            })
        }
        if (mods[key].actions) {
            Object.keys(mods[key].actions).map(k => {
                store.actions[k] = (payload) => {
                    return mods[key].actions[k]({
                        commit: (mutation, payloads) => store.mutations[mutation](payloads),
                        state: store.state[key],
                        rootState: store
                    }, payload)
                }
            })
        }
    })
}
export const attachServices = (services) => Object.assign(store.services, services)
export const connect = (mapToProps = {}) => {
    return (WrappedComponent) => {
        return withRouter(class extends React.Component {
            constructor(props) {
                super(props);

                // const router = {match, location, history} = this.props
                // attachServices({router})

                this.state = mapToProps(store)
                attachComponents(this, mapToProps);
            }

            render() {
                return <WrappedComponent {...this.state} />;
            }
        });
    }
}

store.exportState = exportState;
store.replaceState = replaceState;
store.attachComponents = attachComponents;
store.attachModules = attachModules;
store.attachServices = attachServices;

export const makeStore = () => {
    return store;
}
