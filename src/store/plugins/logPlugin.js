export function logPlugin(params) {
    return (_store) => _store.subscribe((msg) => console.log(msg))
}
