import React from 'react';

const field2Html = (field) => {
    const { name, type, label, defaultValue, required, desc, validator } = field;

    return (
        <div className='form-group row' key={name}>
            <label htmlFor={name} className='col-sm-4 col-form-label col-form-label-sm' >{label}</label>
            <div className='col-sm-8'>
                <input type={type} className="form-control form-control-sm" id={name} name={name} defaultValue={defaultValue} required={required}
                    onChange={(e) => { validator(e.target.value.trim()) }}
                />
                <small className="form-text text-muted">{desc}</small>
            </div>
        </div>
    );
}

export default class EditCampaignSettings extends React.Component {
    state = {
    }

    render = () => {
        const { campaignName, settings, onSubmit, submitCaption } = this.props;

        const campaignNameHtml = field2Html(campaignName);
        const fieldsHtml = settings.map(field2Html);
        const onClickSubmit = (e) => {
            e.preventDefault();
            // console.log(e);
            onSubmit(e);
        }

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-5">
                        <form>
                            {campaignNameHtml}
                            {fieldsHtml}
                            <div className="form-group row">
                                <div className="col-sm-10">
                                    <button type="submit" className="btn btn-primary" onClick={onClickSubmit}>{submitCaption}</button>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        );

    }
}

