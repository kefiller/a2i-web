import React from 'react';
import { NavLink } from "react-router-dom";
import { compose } from 'redux';
import { connect } from 'react-redux';

import { setCurrentNewCampaign } from '../../../actions';

import './sidebar.css'

const Sidebar = ({ className, setCurrentNewCampaign }) => {
    const onClickNewCampaign = () => {
        setCurrentNewCampaign();
    }
    return (
        <div className={`Sidebar ${className}`}>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <NavLink className="nav-link" onClick={onClickNewCampaign} to="/NewCampaign/">Новая кампания</NavLink>
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

const mapStateToProps = (props) => { return {} };
const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentNewCampaign: setCurrentNewCampaign(dispatch),
    };
}

// export default Sidebar;
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(Sidebar);