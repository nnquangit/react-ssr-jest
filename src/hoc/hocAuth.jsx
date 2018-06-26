import React from 'react'
import {NoSSR} from '../components'
import {connectReact as connect} from 'exstore'
import {Redirect} from 'react-router-dom'

export const hocAuth = (WrappedComponent) => {
    return connect(({getters}) => ({...getters}))(class extends React.Component {
        constructor(props) {
            super(props)
        }

        render() {
            let {isLoggedIn, location} = this.props

            return (<NoSSR>
                {isLoggedIn() && (<WrappedComponent {...this.props}/>)}
                {!isLoggedIn() && (<Redirect to={{pathname: '/login', state: {referrer: location}}}/>)}
            </NoSSR>)
        }
    })
}
