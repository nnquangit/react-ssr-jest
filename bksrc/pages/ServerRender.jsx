import React from 'react'
import {connectReact as connect} from "../plugins/exstore"
import {Loader, Pagination, UserInfo} from "../components"
import {hocGlobal} from "../hocGlobal"

const ServerRender = connect(({state, getters, actions}) => ({
    fetchData: actions.getUsers,
    result: getters.usersList(),
    path: state.router.location.pathname,
    page: state.router.location.query.page || 1
}))(hocGlobal(class extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        let {fetchData, page, result} = this.props

        if (!result.loaded) {
            fetchData(page)
        }
    }

    componentWillUpdate(nextProps, nextState) {
        let {fetchData} = nextProps

        if (this.props.page !== nextProps.page) {
            fetchData(nextProps.page)
        }
    }

    render() {
        let {result, history, path} = this.props
        let {results: data = [], info: {page = 1, total = 100, perpage = 10}, fetch} = result

        return (<div>
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
}

export {ServerRender}