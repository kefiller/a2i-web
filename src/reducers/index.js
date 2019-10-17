import * as actionTypes from '../actions/actionTypes';

const initialState = {
    campaigns: {
        list: [],
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
        default:
            return state;
    }
}
