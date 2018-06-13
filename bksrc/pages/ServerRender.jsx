import React from 'react';
import {render} from 'react-dom';
import {Helmet} from "react-helmet";

export class ServerRender extends React.Component {
    render() {
        return (<p>
            <Helmet>
                <title>ServerRender</title>
            </Helmet>
            This is ServerRender
        </p>)
    }
}
