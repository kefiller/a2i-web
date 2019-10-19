import React from 'react';
//faArrowUp
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const CampaignListTable = ({campaigns}) => {

    const arrowDown = <FontAwesomeIcon icon={faArrowDown} color="green" />;

    const rows = campaigns.map(({ name, status, lastStatusUpdate}, index) => {
        return (
            <tr key={name}>
                <th scope="row">{name}</th>
                <td>{status}</td>
                <td>{lastStatusUpdate}</td>
                <td>{arrowDown}</td>
            </tr>
        );
    });
    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Campaign</th>
                    <th scope="col">Status</th>
                    <th scope="col">LastStatusUpdate</th>
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
