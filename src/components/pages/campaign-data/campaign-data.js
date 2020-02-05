import React from 'react';
import Papa from 'papaparse';

export default class CampaignData extends React.Component {
    state = {
        hasError: true,
        msg: 'Выберите файл'
    }

    componentDidMount = () => {
    }

    render = () => {
        const { name: campaignName, numbersTotal, addDataToCampaign } = this.props;

        if (!campaignName) return null;

        const btnStyle = {
            marginRight: '0.5em',
            marginBottom: '0.5em',
        };

        if (this.state.hasError) {
            btnStyle.display = 'none';
        }

        // const errMsgStyle = this.state.hasError ? { display: 'block' } : { display: 'none' };

        const onFileChosen = (file) => {
            const fileReader = new FileReader();
            fileReader.onloadend = ({ target: { result } }) => {
                const { data } = Papa.parse(result, { header: true, skipEmptyLines: true });
                
                this.setState({
                    hasError: !data.length,
                    msg: `${data.length} записей в файле`,
                    data
                });
            };
            fileReader.readAsText(file);
        }

        const onUploadClick = () => {
            addDataToCampaign(campaignName, this.state.data);
        }

        return (
            <React.Fragment>
                <h2>{campaignName} : {numbersTotal} номеров</h2>
                <button className="btn btn-primary" style={btnStyle} onClick={onUploadClick}>Загрузить</button>
                <input type="file" name="file" onChange={(e) => onFileChosen(e.target.files[0])} />
                <br />
                <h4>{this.state.msg}</h4>
            </React.Fragment>
        );
    }


}

