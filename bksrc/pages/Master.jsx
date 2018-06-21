import React from 'react';
import {renderRoutes} from "react-router-config";
import {Link} from "react-router-dom";

export class Master extends React.Component {
    render() {
        let {route} = this.props;
        return (<div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <a className="navbar-brand" href="#">Brand</a>
                    <div className="mr-auto">
                        <div className="navbar-nav">
                            <Link className="nav-item nav-link" to="/">Home</Link>
                            <Link className="nav-item nav-link" to="/protected">Protected</Link>
                            <Link className="nav-item nav-link" to="/serverrender">ServerRender</Link>
                        </div>
                    </div>
                </div>
            </nav>
            {renderRoutes(route.routes)}
        </div>)
    }
}