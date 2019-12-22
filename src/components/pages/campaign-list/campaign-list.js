import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import Spinner from '../../spinner';

import withCcsApiService from '../../hoc/with-ccs-api-cervice';
import {
    fetchCampaigns,
    startCampaign,
    stopCampaign,
    goCampaignReport,
    goEditCampaignSettings,
    goCampaignData,
    archiveCampaign,
    dropCampaign
} from '../../../actions';

import ErrorIndicator from '../../error-indicator';
import CampaignListTable from './campaign-list-table';

class CampaignList extends React.Component {
    componentDidMount() {
        this.props.fetchCampaigns();
    }

    render() {
        const { campaigns: { loading, error, list },
            startCampaign,
            stopCampaign,
            goCampaignReport,
            goEditCampaignSettings,
            goCampaignData,
            archiveCampaign,
            dropCampaign
        } = this.props;

        if (loading) {
            return <Spinner />;
        }

        if (error) {
            return <ErrorIndicator error={error} />;
        }

        return (
            <CampaignListTable
                campaigns={list}
                startCampaign={startCampaign}
                stopCampaign={stopCampaign}
                goCampaignReport={goCampaignReport}
                goEditCampaignSettings={goEditCampaignSettings}
                goCampaignData={goCampaignData}
                archiveCampaign={archiveCampaign}
                dropCampaign={dropCampaign}
                />
        );
    }
}

const mapStateToProps = ({ campaigns }) => {
    return {
        campaigns
    };
}

const mapDispatchToProps = (dispatch, { ccsApiService, history }) => {
    return {
        fetchCampaigns: fetchCampaigns(dispatch, ccsApiService, history),
        startCampaign: startCampaign(dispatch, ccsApiService),
        stopCampaign: stopCampaign(dispatch, ccsApiService),
        goCampaignReport: goCampaignReport(dispatch, ccsApiService, history),
        goEditCampaignSettings: goEditCampaignSettings(dispatch, ccsApiService, history),
        goCampaignData: goCampaignData(dispatch, ccsApiService, history),
        archiveCampaign: archiveCampaign(dispatch, ccsApiService),
        dropCampaign: dropCampaign(dispatch, ccsApiService),
    };
}

// export default withCcsApiService(connect(mapStateToProps, mapDispatchToProps)(CampaignList));
export default compose(
    withRouter,
    withCcsApiService,
    connect(mapStateToProps, mapDispatchToProps)
)(CampaignList);
