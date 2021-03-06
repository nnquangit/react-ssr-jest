import React from 'react'
import {renderRoutes} from 'react-router-config'
import {Link} from 'react-router-dom'

export class Master extends React.Component {
    render() {
        let {route} = this.props
        return (<div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <Link className="navbar-brand" to="/"><i className="mdi mdi-home" /></Link>
                    <div className="mr-auto">
                        <div className="navbar-nav">
                            <Link className="nav-item nav-link" to="/login">Login</Link>
                            <Link className="nav-item nav-link" to="/protected">Protected</Link>
                            <Link className="nav-item nav-link" to="/serverrender">ServerRender</Link>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="my-3 container">
                {renderRoutes(route.routes)}
            </div>
        </div>)
    }
}
