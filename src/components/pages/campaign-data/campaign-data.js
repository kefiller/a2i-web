import React from 'react';
import Papa from 'papaparse';

export default class CampaignData extends React.Component {
    state = {}

    componentDidMount = () => {
    }

    render = () => {
        const { name: campaignName, numbersTotal } = this.props;

        if (!campaignName) return null;

        // const arrowDown = <FontAwesomeIcon icon={faArrowDown} color="green" />;

        // const rows = Object.keys(data).map((number, index) => {
        //     return (
        //         <tr className="row" key={index}>
        //             <th className="col-sm-1" scope="row"><input type="checkbox" /></th>
        //             <th className="col-sm-11" scope="row">{number}</th>
        //             {/* <td>{status}</td> */}
        //         </tr>
        //     );
        // });
        const style = {
            marginRight: '0.5em',
            marginBottom: '0.5em',
        };
        const onFileUpload = (file) => {
            const fileReader = new FileReader();
            fileReader.onloadend = (e) => {
                const result = Papa.parse(e.target.result, {header: true});
                console.log(result);
            };
            fileReader.readAsText(file);
        }
        return (
            <React.Fragment>
                <h2>{campaignName}</h2>
                <h3>{numbersTotal} номеров</h3>
                <button className="btn btn-primary" style={style}>Загрузить из файла</button>
                <input type="file" name="file" onChange={(e) => onFileUpload(e.target.files[0])} />
                <br />
                <button className="btn btn-danger" disabled style={style}>Удалить все номера</button>
                {/* <div className="container-fluid">
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
                </div> */}
            </React.Fragment>
        );
    }


}

