import React from 'react';
import { Route } from "react-router-dom";

import './Workplane.css';

import CampaignList from '../CampaignList';

const Workplane = ({ className }) => {
    return (
        <div className={`Workplane ${className}`}>
            <div>
                <Route path="/" exact component={CampaignList} />
                <Route path="/CampaignList" component={CampaignList} />
                <Route path="/NewCampaign" component={NotImplementedYet} />
                <Route path="/Logout" component={NotImplementedYet} />
            </div>
        </div>
    );
}

function NotImplementedYet() {
    return <h2>Пока не готово.. :(</h2>;
}
export default Workplane;
