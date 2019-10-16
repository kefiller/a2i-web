import React from 'react';
import { Route } from "react-router-dom";

import './workplane.css';

import CampaignList from '../campaign-list';
import NewEditCampaign from '../new-edit-campaign';

const Workplane = ({ className, apiClient }) => {
    const renderCampaignList = () => <CampaignList apiClient={apiClient}/>;
    return (
        <div className={`Workplane ${className}`}>
            <div>
                <Route path="/" exact render={renderCampaignList} />
                <Route path="/CampaignList" render={renderCampaignList} />
                <Route path="/NewCampaign" component={NewEditCampaign} />
                <Route path="/Logout" component={NotImplementedYet} />
            </div>
        </div>
    );
}

function NotImplementedYet() {
    return <h2>Пока не готово.. :(</h2>;
}
export default Workplane;
