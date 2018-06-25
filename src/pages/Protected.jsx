import React from 'react';
import {hocAuth} from "../hoc"

const Protected = hocAuth(class extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div>Protected</div>)
    }
})

export {Protected}