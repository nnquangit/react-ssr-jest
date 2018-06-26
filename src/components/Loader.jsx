import React from 'react'
import ReactDOM from 'react-dom'

const Child = () => (<div className="loader-wrapper">
    <div className="loader-overlay"></div>
    <div className="loader"></div>
</div>)

export class Loader extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.popup = document.createElement('div')
        document.body.appendChild(this.popup)
        this.renderChild(this.props)
    }

    componentDidUpdate() {
        this.renderChild(this.props)
    }

    componentWillUnmount() {
        ReactDOM.unmountComponentAtNode(this.popup)
        document.body.removeChild(this.popup)
    }

    renderChild(props) {
        ReactDOM.render(<Child {...props}/>, this.popup)
    }

    render() {
        return ''
    }
}
