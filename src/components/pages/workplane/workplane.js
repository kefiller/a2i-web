import React from 'react';
import { Route } from "react-router-dom";

import './workplane.css';

import CampaignList from '../campaign-list';
import EditCampaignSettingsContainer from '../edit-campaign-settings';

const Workplane = ({ className }) => {
    const renderCampaignList = () => <CampaignList/>;
    return (
        <div className={`Workplane ${className}`}>
            <div>
                <Route path="/" exact render={renderCampaignList} />
                <Route path="/CampaignList" render={renderCampaignList} />
                <Route path="/NewCampaign" component={EditCampaignSettingsContainer} />
                <Route path="/Logout" component={NotImplementedYet} />
            </div>
        </div>
    );
}

function NotImplementedYet() {
    return <h2>Пока не готово.. :(</h2>;
}
export default Workplane;
