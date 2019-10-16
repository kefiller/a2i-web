import React from 'react';
import { connect } from 'react-redux';
//faArrowUp
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Spinner from '../../spinner';

import withCcsApiService from '../../hoc';

class CampaignList extends React.Component {

    arrowDown = <FontAwesomeIcon icon={faArrowDown} color="green" />;

    campaignsWhenLoading = [{
        name: <Spinner/>,
        status: <Spinner/>,
        lastStatusUpdate: <Spinner/>,
        actions: this.arrowDown
    }];

    state = {
        campaigns: this.campaignsWhenLoading,
        isLoading: true,
        isError: false
    }

    loadCampaignListComplete = (data) => {
        // console.log('loadCampaignListComplete', data);
        const { campaigns: receivedCampaigns } = data;

        receivedCampaigns.forEach(campaign => {
            this.props.apiClient.a2iCampaignStatus(campaign).then((statusData) => {
                this.loadCampaignStatusComplete(campaign, statusData);
            });
        });

        const campaigns = receivedCampaigns.map((campaign) => {
            return {
                name: campaign,
                status: <Spinner/>,
                lastStatusUpdate: <Spinner/>,
                actions: this.arrowDown
            }
        });
        this.setState({
            campaigns
        });
    }

    loadCampaignStatusComplete = (campaignName, statusData) => {
        // console.log('loadCampaignsStatusComplete', campaign, status, lastStatusUpdate);
        const { campaigns } = this.state;

        const newCampaigns = campaigns.map((campaign) => {
            const {status, lastStatusUpdate, ...rest} = campaign;
            if(campaign.name !== campaignName ) {
                return campaign;
            }
            return {
                status: statusData.status,
                lastStatusUpdate: statusData.lastStatusUpdate,
                ...rest
            }
        });
        this.setState({
            campaigns: newCampaigns
        });
    }

    loadCampaignListError = (error) => {
        console.log('loadCampaignListError', error);
    }

    componentDidMount() {
        const { apiClient } = this.props;

        apiClient.a2iCampaignList()
            .then(this.loadCampaignListComplete)
            .catch(this.loadCampaignListError);
    }

    render() {
        const { campaigns } = this.state;

        return (
            <CampaignListTable campaigns={campaigns} />
        );
    }
}

const CampaignListTable = ({ campaigns = [] }) => {
    if (!campaigns) return null;

    const rows = campaigns.map(({ name, status, lastStatusUpdate, actions }, index) => {
        return (
            <tr key={name}>
                <th scope="row">{name}</th>
                <td>{status}</td>
                <td>{lastStatusUpdate}</td>
                <td>{actions}</td>
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

const mapStateToProps = (state) => {
    return {
        campaigns: state.campaigns 
    };
}

export default withCcsApiService(connect(mapStateToProps)(CampaignList));
