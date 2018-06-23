import React from 'react';
import {connectReact as connect} from "../plugins/exstore"
import {hocGlobal} from '../hocGlobal';

const Login = connect(({state, getters, actions, services}) => ({
    ...actions,
    ...services
}))(hocGlobal(class extends React.Component {
    constructor(props) {
        super(props)
        this.onLogin = this.onLogin.bind(this)
    }

    onLogin() {
        let {$firebase} = this.props;
        let provider = new $firebase.auth.GoogleAuthProvider();

        $firebase.auth().signInWithPopup(provider).then(function (result) {
            console.log(result.user)
        }).catch(function (error) {
            console.log(error)
        });
    }

    render() {
        return (<div>
            {/*<Loader/>*/}

            <form>
                <div className="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                           placeholder="Enter email"/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone
                        else.
                    </small>
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                </div>
                <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                    <label className="form-check-label" for="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <button type="button" className="btn btn-primary" onClick={this.onLogin}>Google</button>
        </div>)
    }
}))

export {Login}