import { compose } from 'redux';
import { connect } from 'react-redux';

import EditCampaignSettings from './edit-campaign-settings';
import { setCurrentCampaignNewSettings } from '../../../actions';
import withStdContainer from '../../hoc/with-std-container';

const mapStateToProps = ({ currentCampaign }) => {
    return {
        ...currentCampaign
    }
}

const mapDispatchToProps = (dispatch, { ccsApiService }) => {
    return {
        onMount: setCurrentCampaignNewSettings(dispatch, ccsApiService),
    };
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStdContainer,
)(EditCampaignSettings);
