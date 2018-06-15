import React from 'react';
import {renderRoutes} from 'react-router-config';
import {createRouter} from './services';

export class App extends React.Component {
    render() {
        return renderRoutes(createRouter())
    }
}