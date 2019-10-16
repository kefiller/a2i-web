export const campaignsLoaded = (newCampaigns) => {
    return {
        type: 'CAMPAIGNS_LOADED',
        payload: newCampaigns
    };
}
