import React from 'react';
import { CampaignSettintsTpl } from '../../../actions';

const NewEditCampaign = (props) => {
    const fieldsHtml = CampaignSettintsTpl.map((field) => {
        return (
            <div className='form-group row' key={field.name}>
                <label htmlFor={field.name} className='col-sm-4 col-form-label col-form-label-sm' >{field.label}</label>
                <div className='col-sm-8'>
                    <input type={field.type} className="form-control form-control-sm" id={field.name} name={field.name} defaultValue={field.default} required={field.required} />
                    <small className="form-text text-muted">{field.desc}</small>
                </div>
            </div>
        );
    });
    const onSubmit = (e) => {
        e.preventDefault();
        console.log(e);
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-5">
                    <form>
                        {fieldsHtml}
                        <div className="form-group row">
                            <div className="col-sm-10">
                                <button type="submit" className="btn btn-primary" onClick={onSubmit}>Создать</button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default NewEditCampaign;