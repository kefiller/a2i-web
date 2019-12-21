import React from 'react';
//faArrowUp 
import { faPlayCircle, faStopCircle, faTrashAlt, faArchive, faSlidersH, faBars, faTable } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const iconStart = <FontAwesomeIcon icon={faPlayCircle} color="green" />;
const iconStop = <FontAwesomeIcon icon={faStopCircle} color="black" />;
const iconTrash = <FontAwesomeIcon icon={faTrashAlt} color="tomato" />;
const iconArchive = <FontAwesomeIcon icon={faArchive} color="brown" />;
const iconSettings = <FontAwesomeIcon icon={faSlidersH} color="blue" />;
const iconReport = <FontAwesomeIcon icon={faBars} color="green" />;
const iconData = <FontAwesomeIcon icon={faTable} color="black" />;

const CampaignListTable = ({ campaigns, goCampaignData }) => {

    const onClick = (campaignName) => (evt) => {
        evt.preventDefault();
        goCampaignData(campaignName);
    }

    const rows = campaigns.map(({ name, status, lastStatusUpdate, numbers_total, numbers_finished, campaign_progress_percent,
        calls_total, calls_success, calls_success_percent }, index) => {
        const iconCmd = (status === 'running') ? iconStop : iconStart;
        return (
            <tr key={name}>
                <th scope="row"><a href="#" className="nav-link" onClick={onClick(name)} >{name}</a> </th>
                <td>{status}</td>
                <td>{campaign_progress_percent} %</td>
                <td>{numbers_total}</td>
                <td>{numbers_finished}</td>
                <td>{calls_total}</td>
                <td>{calls_success}</td>
                <td>{calls_success_percent}</td>
                <td>{lastStatusUpdate}</td>
                <td>{iconCmd} {iconReport} {iconSettings}  {iconData} {iconArchive} {iconTrash}</td>
            </tr>
        );
    });
    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Campaign</th>
                    <th scope="col">Status</th>
                    <th scope="col">Progress</th>
                    <th scope="col">NumTotal</th>
                    <th scope="col">NumFinished</th>
                    <th scope="col">CTotal</th>
                    <th scope="col">CSuccess</th>
                    <th scope="col">CSuccess%</th>
                    <th scope="col">LastUpdate</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    );
}

export default CampaignListTable;
