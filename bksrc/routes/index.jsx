import {Home, Protected, ServerRender} from "../pages"

export const routes = [
    {path: '/', exact: true, component: Home},
    {path: '/protected', exact: true, component: Protected},
    {path: '/serverrender', exact: true, component: ServerRender}
]
