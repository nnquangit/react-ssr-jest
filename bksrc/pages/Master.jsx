import React from 'react';
import {renderRoutes} from "react-router-config";
import '../app.css'

export class Master extends React.Component {
    render() {
        let {route} = this.props;
        return (<div>
            Master begin
            {renderRoutes(route.routes)}
            Master end
        </div>)
    }
}