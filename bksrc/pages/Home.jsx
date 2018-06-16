import React from 'react';
import {connect} from '../plugins/ExStore'

class HomePage extends React.Component {
    render() {
        let {currentCounter, addCounter} = this.props;
        return (<div>
            Home abcaa {currentCounter()} caqwqasqw
            <button type="button" onClick={addCounter}>Thu 1 cai nha</button>
        </div>)
    }
}

export const Home = connect(({state, actions, getters}) => ({...getters, ...actions}))(HomePage)
// export const Home = connect(state => ({counter: state.counter}), {...actions})(HomePage)

