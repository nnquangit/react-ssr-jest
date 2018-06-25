import React from 'react';
import {Loader, Pagination, UserInfo} from "../../components"

export const UserList = (props) => {
    let {results, info: {page = 1, total = 100, perpage = 10}, fetch, onChange} = props

    return (<div>
        {fetch && (<Loader/>)}
        <Pagination page={page} total={total} perpage={perpage} onChange={onChange}/>
        {results.map((e, k) => (<UserInfo {...e} key={k}/>))}
    </div>)
}