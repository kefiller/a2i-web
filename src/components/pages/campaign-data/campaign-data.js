import React from 'react';
//faArrowUp
// import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class CampaignData extends React.Component {
    state = {}

    componentDidMount = () => {
        console.log(this.props);
        //const {name:campaignName} = this.props;
        const {onMount} = this.props;
        const campaignName = 'kstovo_prioksky_debt_30102019';
        // onMount(campaignName);
    }

    render = () => {
        // const arrowDown = <FontAwesomeIcon icon={faArrowDown} color="green" />;

        // const rows = campaigns.map(({ name, status, lastStatusUpdate}, index) => {
        //     return (
        //         <tr key={name}>
        //             <th scope="row">{name}</th>
        //             <td>{status}</td>
        //             <td>{lastStatusUpdate}</td>
        //             <td>{arrowDown}</td>
        //         </tr>
        //     );
        // });
        const rows = null;
        return (
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
        );
    }


}

