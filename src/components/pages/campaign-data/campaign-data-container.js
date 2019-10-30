import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CampaignData from './campaign-data';
// import { getCampaignData } from '../../../actions';
import withStdContainer from '../../hoc/with-std-container';
import withCcsApiService from '../../hoc/with-ccs-api-cervice';

const mapStateToProps = ({currentCampaign: {error, loading, name, data}}) => {
    return {
        error,
        loading,
        name,
        data,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const { ccsApiService} = ownProps;
    return {
        // onMount: getCampaignData(dispatch, ccsApiService, 'campaignName')
    };
}

export default compose(
    withRouter,
    withCcsApiService,
    connect(mapStateToProps, mapDispatchToProps),
    withStdContainer,
)(CampaignData);
