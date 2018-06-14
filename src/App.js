import React from 'react';
import {Child} from './Child';

export class App extends React.Component {

    render() {
        return (<div>
            Hello World Reactabcasq
            <Child/>
            <button className="square" onClick={() => alert('click')}>Click</button>
        </div>)
    }
}