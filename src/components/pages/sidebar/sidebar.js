import React from 'react';
import { NavLink } from "react-router-dom";

import './sidebar.css'

const Sidebar = ({ className }) => {
    return (
        <div className={`Sidebar ${className}`}>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <NavLink className="nav-link" to="/NewCampaign/">Новая кампания</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/CampaignList/">Список кампаний</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/Logout/">Выход</NavLink>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;