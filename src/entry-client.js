import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom";
import {App} from './App';

ReactDOM.render((<div>
    <div>Client before</div>
    <Router>
        <App/>
    </Router>
    <div>Client after</div>
</div>), document.getElementById('app'));
