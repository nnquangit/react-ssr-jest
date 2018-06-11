import React from 'react';
import {renderToString} from 'react-dom/server';
import {App} from './App';

export function createApp() {
    return renderToString(
        <div>
            <div>Server before</div>
            <App/>
            <div>Server after</div>
        </div>
    );
}
