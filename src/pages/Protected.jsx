import React from 'react'
import {NoSSR} from '../components'
import {connectReact as connect} from 'exstore'
import {hocAuth} from '../hoc'

const Protected = hocAuth(connect(({getters}) => ({
    currentUser: getters.currentUser()
}), ({actions}) => ({
    signout: actions.signout
}))(class extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let {currentUser, signout} = this.props

        return (<NoSSR>
            <div className="jumbotron">
                <h1 className="display-3">Protected Page</h1>
                <pre>{JSON.stringify(currentUser, true, ' ')}</pre>
                <button type="button" className="btn btn-danger" onClick={signout}>Logout</button>
            </div>
        </NoSSR>)
    }
}))

export {Protected}
