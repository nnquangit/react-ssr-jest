import React from 'react';
import {renderRoutes} from 'react-router-config';
import {withRouter} from 'react-router'
import {createRouter} from './router';
import {getStore} from './plugins/exstore'

export const App = withRouter(class extends React.Component {
    constructor(props) {
        super(props);
        const {location, history} = props
        getStore().attachPlugins([(_store) => {
            _store.data.state['$router'] = {location, history}
            _store.data.state['$router'].history.listen((location, action) => {
                _store.data.state['$router'] = {location, history}
            })
        }])
    }

    render() {
        return renderRoutes(createRouter())
    }
})