import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App';

ReactDOM.render((<div>
    <div>Client before</div>
    <App/>
    <div>Client after</div>
</div>), document.getElementById('app'));
