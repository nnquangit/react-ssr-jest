import React from 'react';
import {renderRoutes} from 'react-router-config';
import {createRouter} from './router';
import './assets/app.css'
import {hocGlobal} from './hocGlobal'

export const App = hocGlobal(class extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return renderRoutes(createRouter())
    }
})