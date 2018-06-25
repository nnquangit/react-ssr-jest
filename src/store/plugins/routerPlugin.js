import qs from 'query-string'

export function routerPluginServer({req}) {
    return (_store) => _store.state['router'] = {
        location: {
            hash: '',
            pathname: req.path,
            query: req.query || {},
            search: req.url.replace(req.path, ''),
            state: {}
        }
    }
}

export function routerPluginClient(_history) {
    return (_store) => {
        let location = _history.location;
        let newloc = {...location, query: location ? qs.parse(location.search) : {}}

        _store.state['router'] = {location: newloc}

        _history.listen((location, action) => {
            let newloc = {...location, query: location ? qs.parse(location.search) : {}}

            _store.state['router'] = {location: newloc}
            _store.next({mutation: 'router:change', state: _store.getStateCapture()})
        })
    }
}