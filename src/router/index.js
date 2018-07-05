import {Home, Login, Master, Protected, ServerRender} from '../pages'

export function createRouter() {
    return [
        {
            component: Master,
            routes: [
                {path: '/', component: Home, exact: true},
                {path: '/login', component: Login},
                {path: '/protected', component: Protected},
                {path: '/serverrender', component: ServerRender}
            ]
        }
    ]
}
