import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import EditCampaignSettings from './edit-campaign-settings';
import { createNewCampaign, clearCurrentCampaignError } from '../../../actions';
import withStdContainer from '../../hoc/with-std-container';
import withCcsApiService from '../../hoc/with-ccs-api-cervice';

import {CampaignSettintsFields, CampaignNameField} from '../../../actions/field-descriptors';

const mapStateToProps = ({currentCampaign: {error}}) => {
    return {
        campaignName: CampaignNameField,
        settings : CampaignSettintsFields,
        submitCaption: 'Создать',
        error,
    }
}

const mapDispatchToProps = (dispatch, { ccsApiService, history }) => {
    return {
        onMount: clearCurrentCampaignError(dispatch),
        onSubmit: createNewCampaign(dispatch, ccsApiService, history)
    };
}

export default compose(
    withRouter,
    withCcsApiService,
    connect(mapStateToProps, mapDispatchToProps),
    withStdContainer,
)(EditCampaignSettings);
