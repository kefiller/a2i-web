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
        // console.log(campaignStatuses);
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

export const setCurrentCampaignName = (name) => {
    return {
        type: actionTypes.SET_CURRENT_CAMPAIGN_NAME,
        payload: name
    };
}

export const setCurrentCampaignSettings = (settings) => {
    return {
        type: actionTypes.SET_CURRENT_CAMPAIGN_SETTINGS,
        payload: settings
    };
}

export const setCurrentCampaignData = (data) => {
    return {
        type: actionTypes.SET_CURRENT_CAMPAIGN_DATA,
        payload: data
    };
}

export const setCurrentNewCampaign = (dispatch) => () => {
    dispatch(setCurrentCampaignName(''));
    dispatch(setCurrentCampaignSettings([]));
    dispatch(setCurrentCampaignData([]));
}

export const createNewCampaign = (dispatch, ccsApiService, history) => (name, settings) => {
    ccsApiService.a2iCampaignCreate(name, settings)
    .then(() => {history.push('/')})
    .catch((error) => {
        console.log('a2iCampaignCreate error', error);
    });
}
