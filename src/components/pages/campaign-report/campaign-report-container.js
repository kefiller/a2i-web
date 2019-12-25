import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CampaignReport from './campaign-report';
import withStdContainer from '../../hoc/with-std-container';
import withCcsApiService from '../../hoc/with-ccs-api-cervice';

const mapStateToProps = (state) => {
    const {currentCampaign: {name, report}} = state;

    return {
        name,
        report
    }
}

const mapDispatchToProps = (dispatch, { ccsApiService, history }) => {
    return {
        // addDataToCampaign: addDataToCampaign(dispatch, ccsApiService, history)
    };
}

export default compose(
    withRouter,
    withCcsApiService,
    connect(mapStateToProps, mapDispatchToProps),
    withStdContainer,
)(CampaignReport);
