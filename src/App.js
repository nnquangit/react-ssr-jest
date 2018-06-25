import React from 'react';
import {renderRoutes} from 'react-router-config';
import {createRouter} from './router';
import './assets/app.css'

export class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return renderRoutes(createRouter())
    }
}