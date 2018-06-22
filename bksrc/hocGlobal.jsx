import React from 'react';
import qs from 'query-string'

export const hocGlobal = (WrappedComponent) => {
    return class extends React.Component {
        constructor(props) {
            super(props);
        }

        render() {
            const {location} = this.props
            const newloc = {...location, query: location ? qs.parse(location.search) : {}}

            return <WrappedComponent {...this.props} location={newloc}/>;
        }
    }
}