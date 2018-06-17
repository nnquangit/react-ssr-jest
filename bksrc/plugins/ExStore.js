import React from 'react';
import {withRouter} from 'react-router'
import * as Rx from "rxjs";

function observe(o, before, after) {
    function buildProxy(prefix, o) {
        return new Proxy(o, {
            set(target, property, value) {
                before(store);
                let result = target[property] = value;
                after(store);
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

const storeUpdate = (store) => {
    store.components.map(v => v.comp.setState(v.mapToProps(store)))
}
const store = {
    state: observe(
        {},
        (cur) => console.log('before'),
        (cur) => store.components.map(v => v.comp.setState(v.mapToProps(store)))
    ),
    actions: {}, mutations: {}, getters: {}, services: {},
    components: [],
    plugins: [storeUpdate]
}

// setTimeout(function(){
//     subject.data.actions.addCounter()
// }, 2000)


// console.log(subject.value)

// function factory(reducerByType, initialState) {
//     const caction = new Rx.Subject;
//     const cstate = caction
//         .startWith(initialState)
//         .scan((nstate, naction) => {
//             if (reducerByType.hasOwnProperty(naction.type)) {
//                 return reducerByType[naction.type](nstate, naction);
//             }
//             return nstate;
//         })
//         .distinctUntilChanged();
//     //
//     //
//     // cstate.subscribe((x) => {
//     //         console.log('Next: ', x);
//     //     }, (err) => {
//     //         console.log('Error: ', err);
//     //     }, () => {
//     //         console.log('Completed');
//     //     }
//     // );
//
//     return {
//         // cstate,
//         cdispatch: (payload) => caction.onNext(payload)
//     }
// }
//
// let {cdispatch} = factory({
//     ADD: (state, action) => {
//         console.log()
//         return state + action.number
//     },
//     SUBTRACT: (state, action) => state - action.number,
// }, 0)
//
// cdispatch({type: 'ADD', number: 10})
// cdispatch({type: 'ADD', number: 10})
// console.log(cstate)
// function factory(reducerByType, initialState) {
//     const action$ = new Rx.Subject();
//     const state$ = action$
//         .startWith(initialState)
//         .scan((state, action) => {
//             if (reducerByType.hasOwnProperty(action.type)) {
//                 return reducerByType[action.type](state, action);
//             }
//
//             return state;
//         })
//         .distinctUntilChanged();
//
//
//     return {
//         action$,
//         state$,
//         dispatch: action => action$.next(action)
//     }
// }
//
// const {state$, dispatch} = factory({
//     ADD: (state, action) => state + action.number,
//     SUBTRACT: (state, action) => state - action.number,
// }, 0);
//
// state$.subscribe(val => console.log(val));
//
// dispatch({
//     type: 'ADD',
//     number: 10,
// });
//
// dispatch({
//     type: 'SUBTRACT',
//     number: 15,
// });
//
// dispatch({
//     type: 'SUBTRACT',
//     number: 0,
// });

// Object.assign(source, {auth: {isLogin: true}})

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
                        {...store.state[key]},
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
