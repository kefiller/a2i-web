import React from 'react';

import { faArchive, faBars, faSlidersH, faTable } from "@fortawesome/free-solid-svg-icons";
import { faPlayCircle, faStopCircle, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const iconStart = <FontAwesomeIcon icon={faPlayCircle} color="green" title="Start campaign" />;
const iconStop = <FontAwesomeIcon icon={faStopCircle} color="black" title="Stop campaign" />;
const iconTrash = <FontAwesomeIcon icon={faTrashAlt} color="tomato" title="Delete campaign" />;
const iconArchive = <FontAwesomeIcon icon={faArchive} color="brown" title="Archive campaign" />;
const iconSettings = <FontAwesomeIcon icon={faSlidersH} color="blue" title="Campaign settings" />;
const iconReport = <FontAwesomeIcon icon={faBars} color="green" title="Report" />;
const iconData = <FontAwesomeIcon icon={faTable} color="black" title="Campaign Data" />;

const CampaignListTable = ({
    campaigns,
    startCampaign,
    stopCampaign,
    goCampaignReport,
    goEditCampaignSettings,
    goCampaignData,
    archiveCampaign,
    dropCampaign
}) => {

    const onClick = (campaignName) => (evt) => {
        evt.preventDefault();
        goCampaignData(campaignName);
    }

    const makeLink = (elem, func) => {
        const style = {
            padding: '0.1em',
        };
        return (
            <a href="#do" onClick={func} style={style} >{elem}</a>
        );
    }

    const rows = campaigns.map(({ name, status, lastStatusUpdate, numbers_total, numbers_finished, campaign_progress_percent,
        calls_total, calls_success, calls_success_percent }) => {

        const fnStart = (campaign) => () => startCampaign(campaign);
        const fnStop = (campaign) => () =>  stopCampaign(campaign);

        const linkCmd = (status === 'running') ? makeLink(iconStop, fnStop(name)) : makeLink(iconStart, fnStart(name));

        return (
            <tr key={name}>
                <th scope="row"><a href="#rowData" className="nav-link" onClick={onClick(name)} >{name}</a> </th>
                <td>{status}</td>
                <td>{campaign_progress_percent} %</td>
                <td>{numbers_total}</td>
                <td>{numbers_finished}</td>
                <td>{calls_total}</td>
                <td>{calls_success}</td>
                <td>{calls_success_percent}</td>
                <td>{lastStatusUpdate}</td>
                <td>
                    {linkCmd}
                    {makeLink(iconReport, () => goCampaignReport(name))}
                    {makeLink(iconSettings, () => goEditCampaignSettings(name))}
                    {makeLink(iconData, () => goCampaignData(name))}
                    {makeLink(iconArchive, () => archiveCampaign(name))}
                    {makeLink(iconTrash, () => dropCampaign(name))}
                </td>
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
