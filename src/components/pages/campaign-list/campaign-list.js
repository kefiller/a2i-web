import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import Spinner from '../../spinner';

import withCcsApiService from '../../hoc/with-ccs-api-cervice';
import { fetchCampaigns } from '../../../actions';
import ErrorIndicator from '../../error-indicator';

import CampaignListTable from './campaign-list-table';

class CampaignList extends React.Component {
    componentDidMount() {
        this.props.fetchCampaigns();
    }

    render() {
        const { campaigns: {loading, error, list} } = this.props;

        if(loading) {
            return <Spinner/>;
        }

        if(error) {
            return <ErrorIndicator error={error}/>;
        }

        return (
            <CampaignListTable campaigns={list} />
        );
    }
}

const mapStateToProps = ({campaigns}) => {
    return {
        campaigns
    };
}

const mapDispatchToProps = (dispatch, {ccsApiService, history}) => {
    return {
        fetchCampaigns: fetchCampaigns(dispatch, ccsApiService, history),
    };
}

// export default withCcsApiService(connect(mapStateToProps, mapDispatchToProps)(CampaignList));
export default compose(
    withRouter,
    withCcsApiService,
    connect(mapStateToProps, mapDispatchToProps)
)(CampaignList);
