import React from 'react';
import {NoSSR} from '../components';
import {connectReact as connect} from "../plugins/exstore"

const Login = connect(({actions, services, getters}) => ({
    ...actions, ...services, ...getters
}))(class extends React.Component {
    constructor(props) {
        super(props)
        this.onLogin = this.onLogin.bind(this)
    }

    onLogin() {
        let {$firebase, signin} = this.props;
        let provider = new $firebase.auth.GoogleAuthProvider();

        $firebase.auth().signInWithPopup(provider).then((result) => {
            let user = result.user;
            user.getIdToken().then(token => signin({
                displayName: user.displayName,
                email: user.email,
                token
            }))
        }).catch((error) => console.log(error));
    }

    render() {
        let {signout, isLoggedIn, currentUser} = this.props;

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