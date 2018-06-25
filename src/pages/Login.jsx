import React from 'react';
import {NoSSR} from '../components';
import {connectReact as connect} from "exstore"

const Login = connect(store => ({
    store,
    location: store.getState().router.location
}))(class extends React.Component {
    constructor(props) {
        super(props)
        let rState = props.location.state
        this.state = {redirect: (rState && rState.referrer) ? rState.referrer.pathname : '/'}
        this.onLogin = this.onLogin.bind(this)
    }

    onLogin() {
        let {redirect} = this.state;
        let {history} = this.props;
        let {signin} = this.props.store.actions;
        let {$firebase} = this.props.store.services;
        let provider = new $firebase.auth.GoogleAuthProvider();

        $firebase.auth().signInWithPopup(provider).then((result) => {
            let user = result.user;
            user.getIdToken()
                .then(token => signin({displayName: user.displayName, email: user.email, token}))
                .then(() => history.push(redirect))
        }).catch((error) => console.log(error));
    }

    render() {
        let {signout} = this.props.store.actions;
        let {isLoggedIn, currentUser} = this.props.store.getters;

        return (<div>
            <NoSSR>
                {isLoggedIn() && (<div>
                    Name: {currentUser().displayName}<br/>
                    Email: {currentUser().email}
                </div>)}
            </NoSSR>
            <div className="mt-3">
                <NoSSR>
                    {!isLoggedIn() && (<button type="button" className="btn btn-primary" onClick={this.onLogin}>
                        Login
                    </button>)}
                    {isLoggedIn() && (<button type="button" className="btn btn-danger mr-3" onClick={signout}>
                        Logout
                    </button>)}
                </NoSSR>
            </div>
        </div>)
    }
})

export {Login}