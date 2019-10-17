import * as actionTypes from './actionTypes';

export const fetchCampaignsRequest = () => {
    return {
        type: actionTypes.FETCH_CAMPAIGNS_REQUEST,
    };
}

export const fetchCampaignsSuccess = (campaigns) => {
    return {
        type: actionTypes.FETCH_CAMPAIGNS_SUCCESS,
        payload: campaigns
    };
}

export const fetchCampaignsError = (error) => {
    console.log('fetchCampaignsError', error);
    return {
        type: actionTypes.FETCH_CAMPAIGNS_ERROR,
        payload: error
    };
}

const loadCampaignsStatuses = (ccsApiService, dispatch) => ({ campaigns }) => {
    const campaignStatuses = [];

    const promises = campaigns.map(campaign => {
        return ccsApiService.a2iCampaignStatus(campaign)
        .then((data) => {
            campaignStatuses.push({ name: campaign, ...data });
        })
        .catch((error) => {
            dispatch(fetchCampaignsError(error));
        });
    });
    Promise.all(promises).then(() => {
        dispatch(fetchCampaignsSuccess(campaignStatuses));
    });
}

export const fetchCampaigns = (dispatch, ccsApiService) => () => {
    ccsApiService.a2iCampaignList()
        .then(loadCampaignsStatuses(ccsApiService, dispatch))
        .catch((error) => {
            dispatch(fetchCampaignsError(error));
        });
}
