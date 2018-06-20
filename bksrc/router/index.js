import React from "react";
import {Home, Master, Protected, ServerRender} from "../pages";

export function createRouter() {
    return [
        {
            component: Master,
            routes: [
                {path: "/", component: Home, exact: true},
                {path: "/protected", component: Protected},
                {path: "/serverrender", component: ServerRender}
            ]
        }
    ]
}