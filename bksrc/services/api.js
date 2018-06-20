import axios from 'axios'

export function createApi(store) {
    const api = axios.create({
        // baseURL: '/',
        // withCredentials: true,
        headers: {'Content-Type': 'application/json'}
    })

    api.interceptors.request.use((config) => {
        // if (store.getters.isLoggedIn) {
        //     let {token} = store.getters.currentUser
        //     config.headers.common['Authorization'] = token
        // }
        // return config
    }, (error) => Promise.reject(error))

    return api
}