import * as actionTypes from '../actions/actionTypes';

const initialState = {
    campaigns: {
        list: [],
        loading: true,
        error: false
    },
    currentCampaign: {
        name: '',
        settings: [],
        data: [],
        mode: 'new', // new or edit
        loading: false,
        error: false
    }
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_CAMPAIGNS_REQUEST:
            return {
                ...state,
                campaigns: {
                    list: [],
                    loading: true,
                    error: false
                }
            };
        case actionTypes.FETCH_CAMPAIGNS_SUCCESS:
            return {
                ...state,
                campaigns: {
                    list: action.payload,
                    loading: false,
                    error: false
                }
            };
        case actionTypes.FETCH_CAMPAIGNS_ERROR:
            return {
                ...state,
                campaigns: {
                    list: [],
                    loading: false,
                    error: action.payload
                }
            };
        case actionTypes.SET_CURRENT_CAMPAIGN_NAME:
            return {
                ...state,
                currentCampaign: {
                    ...state.currentCampaign,
                    name: action.payload,
                }
            };
        case actionTypes.SET_CURRENT_CAMPAIGN_SETTINGS:
            return {
                ...state,
                currentCampaign: {
                    ...state.currentCampaign,
                    settings: action.payload,
                }
            };
        case actionTypes.SET_CURRENT_CAMPAIGN_DATA:
            return {
                ...state,
                currentCampaign: {
                    ...state.currentCampaign,
                    data: action.payload,
                }
            };
        case actionTypes.SET_CURRENT_CAMPAIGN_ERROR:
            return {
                ...state,
                currentCampaign: {
                    ...state.currentCampaign,
                    error: action.payload,
                }
            };
        default:
            return state;
    }
}
