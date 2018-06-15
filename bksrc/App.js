import React from 'react';
import {renderRoutes} from 'react-router-config';
import {createRouter} from './router';

export class App extends React.Component {
    render() {
        return renderRoutes(createRouter())
    }
}