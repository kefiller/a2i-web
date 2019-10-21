import React from 'react';

const EditCampaignSettings = (props) => {
    const {settings, onSubmit, mode} = props;

    const fieldsHtml = settings.map((field) => {
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
    const onClickSubmit = (e) => {
        e.preventDefault();
        // console.log(e);
        onSubmit(e);
    }

    const submitBtnCaption = mode === 'new'?'Создать':'Изменить';

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-5">
                    <form>
                        {fieldsHtml}
                        <div className="form-group row">
                            <div className="col-sm-10">
                                <button type="submit" className="btn btn-primary" onClick={onClickSubmit}>{submitBtnCaption}</button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default EditCampaignSettings;
