import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import EditCampaignSettings from './edit-campaign-settings';
import { createNewCampaign, updateCampaignSettings } from '../../../actions';
import withStdContainer from '../../hoc/with-std-container';
import withCcsApiService from '../../hoc/with-ccs-api-cervice';

import {CampaignSettintsFields, CampaignNameField} from '../../../actions/field-descriptors';

const mapStateToProps = (props) => {
    const {currentCampaign: {name, error, settings, mode}} = props;
    return {
        campaignField: CampaignNameField,
        settingsFields : CampaignSettintsFields,
        error,
        mode,
        campaignName: name,
        campaignSettings: settings
    }
}

const mapDispatchToProps = (dispatch, { ccsApiService, history }) => {
    return {
        createCampaign: createNewCampaign(dispatch, ccsApiService, history),
        updateCampaign: updateCampaignSettings(dispatch, ccsApiService, history),
    };
}

export default compose(
    withRouter,
    withCcsApiService,
    connect(mapStateToProps, mapDispatchToProps),
    withStdContainer,
)(EditCampaignSettings);
