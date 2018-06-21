import React from 'react';
import {connectReact as connect} from "../plugins/exstore";
import {Pagination, UserInfo} from "../components";

const ServerRender = connect(
    ({getters, actions}) => ({...getters, ...actions})
)(class extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {usersList, usersListInfo, getUsers} = this.props;
        let {page = 1, total = 100, perpage = 10} = usersListInfo()

        return (<div className="my-3 container">
            <Pagination page={page} total={total} perpage={perpage} onChange={(p) => getUsers(p)}/>
            {usersList().map((e, k) => (<UserInfo {...e} key={k}/>))}
        </div>)
    }
})

ServerRender.asyncData = ({store, route}) => store.data.actions.getUsers(1);

export {ServerRender}