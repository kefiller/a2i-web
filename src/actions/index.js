import * as actionTypes from './actionTypes';
import CampaignSettintsTpl from './campaign-settings-tpl';

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

export const setCurrentCampaignMode = (mode) => {
    return {
        type: actionTypes.SET_CURRENT_CAMPAIGN_MODE,
        payload: mode
    };
}

export const setCurrentNewCampaign = (dispatch) => () => {
    dispatch(setCurrentCampaignSettings(CampaignSettintsTpl));
    dispatch(setCurrentCampaignData([]));
    dispatch(setCurrentCampaignMode(actionTypes.CAMPAIGN_MODE_EDIT));
}

export const createNewCampaign = (dispatch, ccsApiService, history) => () => {
    console.log('Hi from actions!');
    
    history.push('/');
}
