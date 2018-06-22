export function ssrPlugin(params) {
    return (_store) => _store.data.state = window.__INITIAL_STATE__
}