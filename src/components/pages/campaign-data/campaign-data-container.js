import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { find, get } from 'lodash';

import CampaignData from './campaign-data';
import withStdContainer from '../../hoc/with-std-container';
import withCcsApiService from '../../hoc/with-ccs-api-cervice';

const mapStateToProps = (state) => {
    const {currentCampaign: {error, loading, name, data}, campaigns: {list}} = state;
    const numbersTotal = get(find(list, {name}), 'numbers_total', 0);

    return {
        error,
        loading,
        name,
        data,
        numbersTotal
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    // const { ccsApiService} = ownProps;
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
