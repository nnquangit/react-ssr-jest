import React from 'react'
import {connectReact as connect} from 'exstore'
import {UserList} from '../components'

const ServerRender = connect(({state, getters, actions}) => ({
    fetchData: actions.getUsers,
    result: getters.usersList(),
    path: state.router.location.pathname,
    page: parseInt(state.router.location.query.page || 1)
}))(class extends React.Component {
    constructor(props) {
        super(props)
        this.state = {page: props.page}
    }

    componentDidMount() {
        let {fetchData, page, result} = this.props

        if (!result.loaded) {
            fetchData(page)
        }
    }

    static getDerivedStateFromProps(nextProps, state) {
        let {fetchData} = nextProps

        if (nextProps.page !== state.page) {
            fetchData(nextProps.page)
        }

        return {page: nextProps.page}
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
