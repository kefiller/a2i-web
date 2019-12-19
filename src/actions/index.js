import * as actionTypes from './actionTypes';
import { map } from 'lodash';

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

const loadCampaignsStatuses = async (ccsApiService, dispatch) => {
    try {
        const result = await ccsApiService.a2iCampaignsInfo();
        const campaignStatuses = map(result['info'], (val, key) => {
            return {
                name: key,
                ...val
            }
        });
        dispatch(fetchCampaignsSuccess(campaignStatuses));
    } catch (error) {
        console.log('loadCampaignsStatuses error', error);
        fetchCampaignsError(error);
    }
}

export const fetchCampaigns = (dispatch, ccsApiService) => () => {
    loadCampaignsStatuses(ccsApiService, dispatch);
}

export const goCampaignData = (dispatch, ccsApiService, history) => async campaignName => {
    history.push('/CampaignData');
    try {
        dispatch(setCurrentCampaignName(campaignName));
        const {data = []} = await ccsApiService.a2iCampaignDataGet(campaignName);
        dispatch(setCurrentCampaignData(data));
        // console.log(campaignData);
    } catch (error) {
        console.log('goCampaignData error', error);
        dispatch(setCurrentCampaignError(error.message));
    }
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

export const setCurrentCampaignError = (error) => {
    return {
        type: actionTypes.SET_CURRENT_CAMPAIGN_ERROR,
        payload: error
    };
}

export const setCurrentCampaignLoading = (loading) => {
    return {
        type: actionTypes.SET_CURRENT_CAMPAIGN_LOADING,
        payload: loading
    };
}

export const setCurrentNewCampaign = (dispatch) => () => {
    dispatch(setCurrentCampaignName(''));
    dispatch(setCurrentCampaignSettings([]));
    dispatch(setCurrentCampaignData([]));
}

export const clearCurrentCampaignError = (dispatch) => () => {
    dispatch(setCurrentCampaignError(false));
}

const getCampaignNameFromField = field => field.value;

const getCampaignSettingsFromFields = (fields) => {
    const settings = {};
    fields.forEach(({ name, value }) => {
        settings[name] = value;
    })
    return settings;
}

const getComponentCampaignData = ({ data }) => {
    const res = Object.keys(data)
        .map((num) => Object.keys(data[num])
            .filter(attribName => attribName.substr(0, 2) !== 'x-')
            .map(attribName => data[num][attribName])
        );
    console.log(res);
    return res;
}

export const createNewCampaign = (dispatch, ccsApiService, history) => async (name, settings) => {
    const campaignName = getCampaignNameFromField(name);
    // const campaignName = 'kstovo_prioksky_debt_30102019';

    dispatch(setCurrentCampaignName(campaignName));
    dispatch(setCurrentCampaignSettings(settings));

    dispatch(setCurrentCampaignLoading(true));
    // ccsApiService.a2iCampaignDataGet(campaignName)
    //     .then((data) => {
    //         dispatch(setCurrentCampaignData(data.data));
    //         dispatch(setCurrentCampaignLoading(false));
    //     })
    //     .catch((error) => {
    //         dispatch(setCurrentCampaignLoading(false));
    //         console.log('getCampaignData', error);
    //         dispatch(setCurrentCampaignError(error.message));
    //     });

    try {
        await ccsApiService.a2iCampaignCreate(campaignName, getCampaignSettingsFromFields(settings));
        await ccsApiService.a2iCampaignDataGet(campaignName);
    } catch (error) {
        console.log('a2iCampaignCreate error', error);
        dispatch(setCurrentCampaignError(error.message));
    }
    dispatch(setCurrentCampaignLoading(false));
    history.push('/CampaignData');
}


