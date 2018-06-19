import React from 'react';
import {withRouter} from "react-router";
import {createStore, getStore} from "exstore";

const store = createStore({
    counter: {
        state: {current: 10, more: 0},
        actions: {
            addCounter: ({state, commit}) => commit('DEMO_ADD'),
            addMore: ({state, commit}) => commit('DEMO_MORE')
        },
        events: {
            'DEMO_ADD': (state) => state.current = state.current + 1,
            'DEMO_MORE': (state) => state.more = state.more + 1
        }
    }
}, [
    (_store) => _store.data.state = {counter: {current: 15, more: 0}, auth: {auth: 15, more: 0}},
    (_store) => _store.subscribe((msg) => console.log(msg))
]).attachServices({
    $api: {
        get: (url) => console.log('$api get ', url),
        post: (url, data) => console.log('$api post ', url, data),
    }
})

store.data.actions.addCounter();

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

