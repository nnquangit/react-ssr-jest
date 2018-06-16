import React from 'react';
import {actions} from '@/store/counter'

const store = {}

const proxied = new Proxy(store, {
    get: function (target, prop) {
        console.log('Proxied get', prop);
        return Reflect.get(target, prop);
    },
    set: function (target, prop, value) {
        console.log('Proxied set', prop, value);
        return Reflect.set(target, prop, value);
    }
});


const customRedux = (addProps = {}) => {
    return (WrappedComponent) => {
        return class extends React.Component {
            constructor(props) {
                super(props);

                const transSet = (target, prop, value) => {
                    let result = Reflect.set(target, prop, value);
                    this.setState(trans)
                    return result
                }

                const trans = new Proxy(proxied, {
                    get: (target, prop) => {
                        console.log('Trans proxied get', prop);
                        return Reflect.get(target, prop);
                    },
                    set: transSet.bind(this)
                });
                this.state = addProps(trans)
            }

            render() {
                return <WrappedComponent {...this.state} />;
            }
        };
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
    addCounter: () => store.counter = (store.counter || 0) + 1
}))(HomePage)
// export const Home = connect(state => ({counter: state.counter}), {...actions})(HomePage)

