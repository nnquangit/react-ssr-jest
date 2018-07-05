import React from 'react'
import {NoSSR} from '../components'
import {connectReact as connect} from 'exstore'

const Login = connect(({getters}) => ({
    currentUser: getters.currentUser(),
    isLoggedIn: getters.isLoggedIn(),
}), ({actions}) => ({
    signin: actions.signin,
    signout: actions.signout
}))(class extends React.Component {
    constructor(props) {
        super(props)
        // let rState = props.location.state
        // this.state = {redirect: (rState && rState.referrer) ? rState.referrer.pathname : '/'}
        this.state = {fullname: ''}
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit() {
        // let {redirect} = this.state
        // let {history} = this.props
        // let {signin} = this.props.store.actions
        // let {$firebase} = this.props.store.services
        // let provider = new $firebase.auth.GoogleAuthProvider()
        //
        // $firebase.auth().signInWithPopup(provider).then((result) => {
        //     let user = result.user
        //     user.getIdToken()
        //         .then(token => signin({displayName: user.displayName, email: user.email, token}))
        //         .then(() => history.push(redirect))
        // }).catch((error) => console.log(error))
    }

    render() {
        let {fullname} = this.state
        let {isLoggedIn, currentUser, signout} = this.props

        return (<NoSSR>
            {isLoggedIn && (<div>
                <pre>{JSON.stringify(currentUser, true, ' ')}</pre>
                <button type="submit" className="btn btn-danger" onClick={signout}>logout</button>
            </div>)}
            {!isLoggedIn && (<form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label htmlFor="txtFullname">Fullname</label>
                    <input type="text" className="form-control" id="txtFullname" value={fullname}
                           onChange={(e) => this.setState({fullname: e.target.value})}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>)}
        </NoSSR>)
    }
})

export {Login}
