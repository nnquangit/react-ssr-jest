import React from 'react';
import {renderRoutes} from 'react-router-config';
import {withRouter} from 'react-router'
import {createRouter} from './router';
import {getStore} from './plugins/exstore'
import './assets/app.css'

export const App = withRouter(class extends React.Component {
    constructor(props) {
        super(props);
        const {location, history} = props
        getStore().attachServices({$history: history})
        getStore().attachPlugins([(_store) => {
            _store.data.state['router'] = {location}
            history.listen((location, action) => {
                _store.data.state['router'] = {location}
            })
        }])
    }

    render() {
        return renderRoutes(createRouter())
    }
})