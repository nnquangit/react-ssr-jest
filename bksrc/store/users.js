export const define = {
    list: {
        FETCH: 'USERS_LIST_FETCH',
        FETCH_SUCCESS: 'USERS_LIST_FETCH_SUCCESS',
        FETCH_FAIL: 'USERS_LIST_FETCH_FAIL'
    }
}

const state = {
    list: {fetch: false, results: [], info: {}}
}

const actions = {
    getUsers({commit, state, rootState: {services: {$api}}}, page = 1) {
        commit(define.list.FETCH)
        return $api.get('https://randomuser.me/api/?results=10&nat=us&page=' + page)
            .then(res => {
                commit(define.list.FETCH_SUCCESS, res)
                return res
            })
            .catch(res => {
                commit(define.list.FETCH_FAIL, res)
                return res
            })
    }
}

const mutations = {
    [define.list.FETCH]: (state) => state.list.fetch = true,
    [define.list.FETCH_SUCCESS]: (state, res) => state.list = {...res.data, fetch: false},
    [define.list.FETCH_FAIL]: (state) => state.list.fetch = false
}

const getters = {
    usersList: (state) => state.list.results || [],
    usersListInfo: (state) => state.list.info || {}
}

export default {define, state, actions, mutations, getters}
