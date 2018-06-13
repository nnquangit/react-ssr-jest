import React from 'react';
import axios from 'axios';
import {render} from 'react-dom';
import {renderRoutes} from "react-router-config";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {routes} from "./routes";
import './assets/app.css';

class Master extends React.Component {
    render() {
        return (<div>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/protected">protected</Link>
                </li>
                <li>
                    <Link to="/serverrender">serverrender</Link>
                </li>
            </ul>
            {renderRoutes(routes)}
        </div>);
    }
}

export class App extends React.Component {
    render() {
        return (<div>
            <Master/>
        </div>);
    }
}
