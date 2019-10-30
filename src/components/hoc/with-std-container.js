import React from 'react';

import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

class StdContainer extends React.Component {
    componentDidMount() {
        // if (this.props.onMount) this.props.onMount();
    }

    render() {
        let { children, loading, LoadingElement, error, ErrorElement } = this.props;

        if (!LoadingElement) LoadingElement=Spinner;
        if (!ErrorElement) ErrorElement=ErrorIndicator;

        if (loading) return  <LoadingElement/>;
        if (error) return <ErrorElement error={error}/>;

        return children;
    }
}

const withStdContainer = (Wrapped) => (props) => {
    return (
        <StdContainer {...props}  >
            <Wrapped {...props}/>
        </StdContainer>
    );
}

export default withStdContainer;
