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
                <tr className="row" key={index}>
                    <th className="col-sm-1" scope="row"><input type="checkbox" /></th>
                    <th className="col-sm-11" scope="row">{number}</th>
                    {/* <td>{status}</td> */}
                </tr>
            );
        });

        return (
            <React.Fragment>
                <h2>{campaignName}</h2>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-4">
                            <table className="table">
                                <thead>
                                    <tr className="row">
                                        <th scope="col" className="col-sm-1" ><input type="checkbox" /></th>
                                        <th scope="col" className="col-sm-11">Number</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows}
                                </tbody>
                            </table>
                        </div>
                        <div className="col-sm-8"></div>
                    </div>
                </div>
            </React.Fragment>
        );
    }


}

