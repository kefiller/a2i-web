import React from 'react';
import {isEmpty} from 'ramda';


export default class EditCampaignSettings extends React.Component {
    state = {
    }

    componentDidMount = () => {
        const {campaignName:campaignField, settings:settingsFields} = this.props;
        const fieldsUnvalidated = [
            {...campaignField },
            ...settingsFields
        ];

        const fields = fieldsUnvalidated.map((fieldUnvalidated) => {
            const {validator, defaultValue = ''} = fieldUnvalidated;
            return  {
                ...fieldUnvalidated,
                value: defaultValue,
                valid: validator(defaultValue)
            }
        });

        this.setState({
            fields
        });
    }

    areAllFieldsValid = () => {
        return this.state.fields.filter(field => field.valid).length === this.state.fields.length;
    }

    setFieldValue = (fieldName, value) => {
        const {fields} = this.state;

        const changedField = fields.filter(field => field.name === fieldName)[0];
        const changedFieldIndex = fields.indexOf(changedField);
        changedField.valid = changedField.validator(value);
        changedField.value = value;

        const newFields = [
            ...fields.slice(0,changedFieldIndex),
            changedField,
            ...fields.slice(changedFieldIndex + 1),
        ]

        this.setState({
            fields: newFields
        });
    }

    field2Html = (field) => {
        const { name, type, label, defaultValue, required, desc } = field;
    
        return (
            <div className='form-group row' key={name}>
                <label htmlFor={name} className='col-sm-4 col-form-label col-form-label-sm' >{label}</label>
                <div className='col-sm-8'>
                    <input type={type} className="form-control form-control-sm" id={name} name={name} defaultValue={defaultValue} required={required}
                        onChange={(e) => { this.setFieldValue(name, e.target.value.trim()) }}
                    />
                    <small className="form-text text-muted">{desc}</small>
                </div>
            </div>
        );
    }

    getCampaignName = () => {
        return  this.state.fields.find(field => field.name === 'campaignName').value;
    }

    getSettings = () => {
        const settings = {};
        this.state.fields.filter(field => field.name !== 'campaignName').forEach(({name, value}) => {
            settings[name] = value;
        })
        return settings;
    }
    
    render = () => {
        if (isEmpty(this.state)) return null;

        const { fields } = this.state;
        const { onSubmit, submitCaption,  } = this.props;

        const fieldsHtml = fields.map(this.field2Html);
        const onClickSubmit = (e) => {
            e.preventDefault();
            onSubmit(this.getCampaignName(), this.getSettings());
        }

        const submitDisabled = this.areAllFieldsValid() ? null : "disabled";

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-5">
                        <form>
                            {fieldsHtml}
                            <div className="form-group row">
                                <div className="col-sm-10">
                                    <button type="submit" className="btn btn-primary" disabled={submitDisabled} onClick={onClickSubmit}>{submitCaption}</button>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        );

    }
}

