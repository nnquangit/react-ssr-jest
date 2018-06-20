import React from 'react';
import {connectReact as connect} from "../plugins/exstore";

class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {currentCounter, addCounter} = this.props;

        return (<div>
            Home a b caba{currentCounter()}
            <button type="button" onClick={addCounter}>Thu 1 cai nha</button>
        </div>)
    }
}

export const Home = connect(({getters, actions}) => ({...getters, ...actions}))(HomePage)

