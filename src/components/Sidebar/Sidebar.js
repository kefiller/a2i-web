import React from 'react';
import { Link } from "react-router-dom";

import './Sidebar.css'

const Sidebar = ({ className }) => {
    return (
        <div className={`Sidebar ${className}`}>
            <br />
            <ul className="nav flex-column">
                <li className="nav-item">
                    <Link className="nav-link" to="/NewCampaign/">Новая кампания</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link active" to="/CampaignList/">Список кампаний</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/Logout/">Выход</Link>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;