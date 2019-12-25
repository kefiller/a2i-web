import React from 'react';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';

const CampaignReport = ({ name, report = [] }) => {
    if (!report.length) return null;

    const fields = report[0];
    const data = report.slice(1);

    const onClickDownloadReport = () => {
        const reportCsv = Papa.unparse({
            fields,
            data
        });
        const blob = new Blob([reportCsv], { type: "text/plain;charset=utf-8" });
        saveAs(blob, `report_${name}.csv`);
    }

    const headerRows = fields.map( (el, idx) => {
        
        return (
            <th className="col-sm-1" key={idx} scope="row">{el}</th>
        );
    });

    const column = (row) => {
        return row.map((col, idx) => {
            return (
                <td className="col-sm-1" key={idx} >{col}</td>
            );
        });
    }

    const dataRows = data.map((row, index) => {
        return (
            <tr className="row" key={index}>
                {column(row)}
            </tr>
        );
    });

    const btnStyle = {
        marginRight: '0.5em',
        marginBottom: '0.5em',
    };

    return (
        <React.Fragment>
            <h2>Отчет по кампании {name}</h2>
            <button className="btn btn-primary" style={btnStyle} onClick={onClickDownloadReport}>Скачать</button>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-11">
                        <table className="table">
                            <thead>
                                <tr className="row">
                                {headerRows}
                                </tr>
                            </thead>
                            <tbody>
                                {dataRows}
                            </tbody>
                        </table>
                    </div>
                    <div className="col-sm-1"></div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default CampaignReport;