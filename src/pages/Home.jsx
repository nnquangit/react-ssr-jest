import React from 'react'
import {connectReact as connect} from 'exstore'

const Home = connect(({getters}) => ({
    current: getters.currentCounter()
}), ({actions}) => ({
    addCounter: actions.addCounter
}))(class extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let {current, addCounter} = this.props
        return (<div>
            <button type="button" className="btn btn-primary" onClick={addCounter}>
                Counter <span className="badge badge-light">{current}</span>
            </button>
            <br/> <br/>
            <div className="jumbotron">
                <h1 className="display-4">Hello, world!</h1>
            </div>
        </div>)
    }
})

export {Home}
