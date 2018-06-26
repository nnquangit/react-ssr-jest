import React from 'react'

export class NoSSR extends React.Component {
    constructor(props) {
        super(props)
        this.state = {render: false}
    }

    componentDidMount() {
        this.setState({render: true})
    }

    render() {
        return this.state.render ? this.props.children : ''
    }
}
