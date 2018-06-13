import React from 'react';
import {render} from 'react-dom';
import {Helmet} from "react-helmet";

export class Protected extends React.Component {
    render() {
        return (<p>
            <Helmet>
                <title>Protected</title>
            </Helmet>
            This is Protected
        </p>)
    }
}
