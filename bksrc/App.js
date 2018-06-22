import React from 'react';
import {renderRoutes} from 'react-router-config';
import {withRouter} from 'react-router'
import {createRouter} from './router';
import {getStore} from './plugins/exstore'
import './assets/app.css'
import {hocGlobal} from './hocGlobal'

export const App = hocGlobal(withRouter(class extends React.Component {
    constructor(props) {
        super(props);
        // const {location, history} = props
        //
        // getStore().attachServices({$history: history})
        // getStore().attachPlugins([(_store) => {
        //     _store.data.state['router'] = {location}
        //     history.listen((loc, action) => {
        //         _store.data.state['router'] = {location: loc}
        //         _store.next({mutation: 'router:change', state: _store.getStateCapture()})
        //     })
        // }])
    }

    render() {
        return renderRoutes(createRouter())
    }
}))