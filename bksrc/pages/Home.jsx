import React from 'react';
import {connect} from 'react-redux'
import {actions} from '@/store/counter'

class HomePage extends React.Component {
    render() {
        let {counter, addCounter} = this.props;
        return (<div>
            Home abcaa {counter} caqwqasqw
            <button type="button" onClick={addCounter}>Thu 1 cai nha</button>
        </div>)
    }
}

export const Home = connect(state => ({counter: state.counter}), {...actions})(HomePage)

