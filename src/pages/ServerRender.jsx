import React from 'react'
import {connectReact as connect} from "exstore"
import {UserList} from "../components"

const ServerRender = connect(({state, getters, actions}) => ({
    fetchData: actions.getUsers,
    result: getters.usersList(),
    path: state.router.location.pathname,
    page: state.router.location.query.page || 1
}))(class extends React.Component {
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

        return (<div>
            <UserList {...result} onChange={(page) => history.push(path + '?page=' + page)}/>
        </div>)
    }
})

ServerRender.asyncData = ({state, actions}) => {
    let page = state.router.location.query.page || 1
    return actions.getUsers(page)
}

export {ServerRender}