import React from 'react';
//faArrowUp
// import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class CampaignData extends React.Component {
    state = {}

    componentDidMount = () => {
    }

    render = () => {
        const { name: campaignName, data } = this.props;

        // const arrowDown = <FontAwesomeIcon icon={faArrowDown} color="green" />;

        const rows = Object.keys(data).map((number, index) => {
            return (
                <tr key={index}>
                    <th scope="row">{number}</th>
                    {/* <td>{status}</td> */}
                </tr>
            );
        });

        return (
            <React.Fragment>
                <h2>{campaignName}</h2>
                <table className="table">
                    {/* <thead>
                    <tr>
                        <th scope="col">Campaign</th>
                        <th scope="col">Status</th>
                        <th scope="col">LastStatusUpdate</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead> */}
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </React.Fragment>
        );
    }


}

