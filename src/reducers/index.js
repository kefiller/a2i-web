const initialState = {
    campaigns: [
        {
            name: 'test1'
        }
    ]
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CAMPAIGNS_LOADED':
            return {
                campaigns: action.payload
            };
        default:
            return state;
    }
}
