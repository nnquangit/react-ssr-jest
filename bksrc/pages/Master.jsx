import React from 'react';
import {renderRoutes} from "react-router-config";
import {Link} from "react-router-dom";
import '../app.css'

export class Master extends React.Component {
    render() {
        let {route} = this.props;
        return (<div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-item nav-link" to="/">Home</Link>
                        <Link className="nav-item nav-link" to="/protected">Protected</Link>
                        <Link className="nav-item nav-link" to="/serverrender">ServerRender</Link>
                    </div>
                </div>
            </nav>
            {renderRoutes(route.routes)}
        </div>)
    }
}