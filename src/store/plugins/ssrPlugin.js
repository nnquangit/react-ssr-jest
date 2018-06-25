export function ssrPlugin(params) {
    return (_store) => _store.state = window.__INITIAL_STATE__
}