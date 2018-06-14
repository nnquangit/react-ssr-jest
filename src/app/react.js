import React from 'react';
import {renderToString} from 'react-dom/server';

class App extends React.Component {
    render() {
        return (<div>Hello World React</div>)
    }
};

export function createApp({req, res}) {
    return new Promise((resolve, reject) => {
        const html = renderToString(<App/>);
        resolve({html, meta: {title: 'Wellcome'}})
    })
}
