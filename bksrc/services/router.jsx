import React from "react";
import {Home, Master, Protected, ServerRender} from "../pages";

export function createRouter() {
    return [
        {
            path: "", component: Master, routes: [
                {path: "/", component: Home},
                {path: "/protected", component: Protected},
                {path: "/serverrender", component: ServerRender}
            ]
        },

    ]
}