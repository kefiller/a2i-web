import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import EditCampaignSettings from './edit-campaign-settings';
import { setCurrentNewCampaign, createNewCampaign } from '../../../actions';
import withStdContainer from '../../hoc/with-std-container';

const mapStateToProps = ({ currentCampaign }) => {
    return {
        ...currentCampaign
    }
}

const mapDispatchToProps = (dispatch, { ccsApiService, history }) => {
    return {
        onMount: setCurrentNewCampaign(dispatch),
        onSubmit: createNewCampaign(dispatch, ccsApiService, history)
    };
}

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
    withStdContainer,
)(EditCampaignSettings);
