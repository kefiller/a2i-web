import * as actionTypes from './actionTypes';
import { map, pick, sortBy } from 'lodash';

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
        const campaignStatusesUnsorted = map(result['info'], (val, key) => {
            return {
                name: key,
                ...val
            }
        });

        const campaignStatuses = sortBy(campaignStatusesUnsorted, ['status', 'name']);
        console.log(campaignStatuses);

        dispatch(fetchCampaignsSuccess(campaignStatuses));
    } catch (error) {
        console.log('loadCampaignsStatuses error', error);
        fetchCampaignsError(error);
    }
}

export const fetchCampaigns = (dispatch, ccsApiService) => () => {
    loadCampaignsStatuses(ccsApiService, dispatch);
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

export const setCurrentCampaignMode = (mode) => {
    return {
        type: actionTypes.SET_CURRENT_CAMPAIGN_MODE,
        payload: mode
    };
}

export const setCurrentNewCampaign = (dispatch) => () => {
    dispatch(setCurrentCampaignError(false));
    dispatch(setCurrentCampaignName(''));
    dispatch(setCurrentCampaignSettings([]));
    dispatch(setCurrentCampaignData([]));
    dispatch(setCurrentCampaignMode('new'));
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

// const getComponentCampaignData = ({ data }) => {
//     const res = Object.keys(data)
//         .map((num) => Object.keys(data[num])
//             .filter(attribName => attribName.substr(0, 2) !== 'x-')
//             .map(attribName => data[num][attribName])
//         );
//     console.log(res);
//     return res;
// }

export const createNewCampaign = (dispatch, ccsApiService, history) => async (name, settings) => {
    const campaignName = getCampaignNameFromField(name);

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

export const updateCampaignSettings = (dispatch, ccsApiService, history) => async (nameField, settingsFields) => {
    const name = getCampaignNameFromField(nameField);
    const settings = getCampaignSettingsFromFields(settingsFields);

    dispatch(setCurrentCampaignSettings(settings));
    dispatch(setCurrentCampaignLoading(true));

    try {
        await ccsApiService.a2iCampaignUpdate(name, settings);
    } catch (error) {
        console.log(error);
        dispatch(setCurrentCampaignError(error.message));
    }
    dispatch(setCurrentCampaignLoading(false));
    history.push('/CampaignList');
}

export const startCampaign = (dispatch, ccsApiService) => async (name) => {
    console.log('starting campaign', name);
    try {
        await ccsApiService.a2iCampaignStart(name);
        console.log('campaign started', name);
        loadCampaignsStatuses(dispatch, ccsApiService);
    } catch (error) {
        console.log(error);
    }
}

export const stopCampaign = (dispatch, ccsApiService) => async (name) => {
    console.log('stopping campaign', name);
    try {
        await ccsApiService.a2iCampaignStop(name);
        console.log('stop signal sent', name);
        loadCampaignsStatuses(ccsApiService, dispatch);
    } catch (error) {
        console.log(error);
    }
}

export const goCampaignReport = (dispatch, ccsApiService) => async (name) => {
    console.log('goCampaignReport', name);
}

export const goEditCampaignSettings = (dispatch, ccsApiService, history) => async (name) => {
    dispatch(setCurrentCampaignError(false));
    dispatch(setCurrentCampaignName(name));
    dispatch(setCurrentCampaignMode('edit'));
    try {
        const { settings } = await ccsApiService.a2iCampaignSettings(name);
        dispatch(setCurrentCampaignSettings(settings));
        history.push('/EditCampaign');
    } catch (error) {
        console.log(error);
        dispatch(setCurrentCampaignError(error.message));
    }
}

export const goCampaignData = (dispatch, ccsApiService, history) => async campaignName => {
    history.push('/CampaignData');
    try {
        dispatch(setCurrentCampaignName(campaignName));
        const { data = [] } = await ccsApiService.a2iCampaignDataGet(campaignName);
        const first100nums = map(data, (val, idx) => idx).slice(0, 100);
        const first100objs = pick(data, first100nums);
        dispatch(setCurrentCampaignData(first100objs));
    } catch (error) {
        console.log('goCampaignData error', error);
        dispatch(setCurrentCampaignError(error.message));
    }
}

export const archiveCampaign = (dispatch, ccsApiService) => async (name) => {
    console.log('archiveCampaign', name);
}

export const dropCampaign = (dispatch, ccsApiService) => async (name) => {
    console.log('dropping campaign', name);
    try {
        await ccsApiService.a2iCampaignDrop(name);
        console.log('campaign dropped', name);
        loadCampaignsStatuses(ccsApiService, dispatch);
    } catch (error) {
        console.log(error);
    }
}
