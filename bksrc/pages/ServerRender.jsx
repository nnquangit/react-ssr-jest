import React from 'react';
import {connectReact as connect} from "../plugins/exstore";
import {Loader, Pagination, UserInfo} from "../components";
import {hocGlobal} from "../hocGlobal";

const ServerRender = connect(({state, getters, actions}) => ({
    ...getters,
    ...actions,
    path: state.router.location.pathname,
    page: state.router.location.query.page || 1
}))(hocGlobal(class extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let {usersList, getUsers, page} = this.props;
        let {loaded} = usersList()

        if (!loaded) {
            getUsers(page)
        }
    }

    componentWillUpdate(nextProps, nextState) {
        let {getUsers} = nextProps;

        if (this.props.page !== nextProps.page) {
            getUsers(nextProps.page)
        }
    }

    render() {
        let {usersList, history, path} = this.props;
        let {results: data, info, fetch} = usersList()
        let {page = 1, total = 100, perpage = 10} = info

        return (<div className="my-3 container">
            {fetch && (<Loader/>)}
            <Pagination
                page={page} total={total} perpage={perpage}
                onChange={(page) => history.push(path + '?page=' + page)}/>
            {data.map((e, k) => (<UserInfo {...e} key={k}/>))}
        </div>)
    }
}))

ServerRender.asyncData = ({state, actions}) => {
    let page = state.router.location.query.page || 1
    return actions.getUsers(page)
};

export {ServerRender}