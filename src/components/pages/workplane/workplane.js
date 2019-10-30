import React from 'react';
import { Route } from "react-router-dom";

import './workplane.css';

import CampaignList from '../campaign-list';
import EditCampaignSettingsContainer from '../edit-campaign-settings';
import CampaignData from '../campaign-data/campaign-data-container';
import ErrorIndicator from '../../error-indicator';

const Workplane = ({ className }) => {
    return (
        <div className={`Workplane ${className}`}>
            <div>
                <Route path="/" exact component={CampaignList} />
                <Route path="/CampaignList" component={CampaignList} />
                <Route path="/CampaignData" component={CampaignData} />
                <Route path="/NewCampaign" component={EditCampaignSettingsContainer} />
                <Route path="/Logout" component={NotImplementedYet} />
                <Route path="/Error" component={ErrorIndicator} />
            </div>
        </div>
    );
}

function NotImplementedYet() {
    return <h2>Пока не готово.. :(</h2>;
}
export default Workplane;
