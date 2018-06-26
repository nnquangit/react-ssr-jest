import chunk from 'lodash/chunk'
import axios from 'axios'
import {articles} from '../api/articles'

const api = axios.create({
    // baseURL: '/',
    // withCredentials: true,
    headers: {'Content-Type': 'application/json'}
})

export function createApi(store) {
    // api.interceptors.request.use((config) => {
    //     // if (store.getters.isLoggedIn) {
    //     //     let {token} = store.getters.currentUser
    //     //     config.headers.common['Authorization'] = token
    //     // }
    //     // return config
    // }, (error) => Promise.reject(error))
    return api
}

export const fakerApi = () => {
    api.get = makeMoockup(api.get, /\/article/, (params, parts) => paginate(params, articles.data))
}
export const paginate = (params, data) => {
    let page = params.params.page || 1
    let pages = chunk(data, params.params.limit)
    return {
        data: {
            data: pages[page - 1],
            meta: {
                current_page: page,
                last_page: pages.length,
                total: data.length
            },
            more: page < pages.length
        }
    }
}
export const makeMoockup = (callback, match, matchCallback) => {
    return (url, params, ...ar) => {
        let parts = url.match(match)
        if (parts) {
            return new Promise((resolve, reject) => {
                let result = matchCallback(params, parts)
                setTimeout(() => resolve(result), 100)
            })
        }
        return callback(url, params, ...ar)
    }
}
fakerApi()
// https://newsapi.org/v2/everything?q=bitcoin&apiKey=9ff53357d2004a03b332580636e4f953
