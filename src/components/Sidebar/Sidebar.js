import React from 'react';
import { Link } from "react-router-dom";

import './Sidebar.css'

const Sidebar = ({ className }) => {
    return (
        <div className={`Sidebar ${className}`}>
            <br />
            <ul class="nav flex-column">
                <li class="nav-item">
                    <Link class="nav-link" to="/NewCampaign/">Новая кампания</Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link active" to="/CampaignList/">Список кампаний</Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link" to="/Logout/">Выход</Link>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;