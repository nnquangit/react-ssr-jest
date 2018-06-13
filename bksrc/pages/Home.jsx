import React from 'react';
import {Helmet} from "react-helmet";
import {render} from 'react-dom';

export class Home extends React.Component {
    render() {
        return (<p>
            <Helmet>
                <title>Home</title>
            </Helmet>
            This is home
        </p>)
    }
}
