import React from 'react';

const NewEditCampaign = (props) => {
    const fields = [
        {
            label: 'Имя кампании',
            name: 'campaignName',
            type: 'text',
            required: true,
            desc: 'Допустимые символы: a-z,0-9,_. Например mytestcampaign_01',
        },
        {
            label: 'msg-template',
            name: '',
            type: 'text',
            required: true, // eslint-disable-next-line
            desc: '"Привет ${number}, вы должны ${debt} денежек" - шаблон сообщения',
        },
        {
            label: 'callerid',
            name: 'callerid',
            type: 'text',
            required: true,
            desc: 'Номер телефона, отображаемый у абонента',
        },
        {
            label: 'Trunk',
            name: 'trunk',
            type: 'text',
            required: true,
            default: 'atk-lv',
            desc: 'Транк, через который делать исх. вызовы',
        },
        {
            label: 'channels',
            name: 'channels',
            type: 'text',
            required: true,
            default: '2',
            desc: 'Кол-во занимаемых каналов',
        },
        {
            label: 'interval-wtime',
            name: 'interval-wtime',
            type: 'text',
            required: true,
            default: '08:00:00-18:00:00',
            desc: 'Интервал времени, когда можно совершать звонки',
        },
        {
            label: 'interval-dow',
            name: 'interval-dow',
            type: 'text',
            required: true,
            default: 'mon-sun',
            desc: 'дни недели, когда можно совершать звонки',
        },
        {
            label: 'amount',
            name: 'amount',
            type: 'text',
            required: true,
            default: 'mon-sun',
            desc: 'общее кол-во звонков, которое должно быть совершено',
        },
        {
            label: 'retry',
            name: 'retry',
            type: 'text',
            required: true,
            default: '3',
            desc: 'Общее кол-во повторов',
        },
        {
            label: 'retry-secs',
            name: 'retry-secs',
            type: 'text',
            required: true,
            default: '900',
            desc: 'Интервал (в секундах) повторного набора при неудачном вызове',
        },
        {
            label: 'interval-send',
            name: 'interval-send',
            type: 'text',
            required: true,
            default: '3600',
            desc: 'Интервал (в секундах) повторного набора при удачном вызове',
        },
        {
            label: 'hear-secs',
            name: 'hear-secs',
            type: 'text',
            required: true,
            default: '15',
            desc: 'Кол-во секунд, после прослушивания которых сообщение считается прослушанным. 0 - должно быть прослушано полностью',
        },
        {
            label: 'tts-voice',
            name: 'tts-voice',
            type: 'text',
            required: true,
            default: 'zahar',
            desc: 'Модель голоса',
        },
        {
            label: 'tts-speed',
            name: 'tts-speed',
            type: 'text',
            required: false,
            default: '0.9',
            desc: 'Скорость речи',
        },
        {
            label: 'tts-emotion',
            name: 'tts-emotion',
            type: 'text',
            required: false,
            default: 'evil',
            desc: 'Эмоция голоса',
        },
        {
            label: 'emails',
            name: 'emails',
            type: 'text',
            required: false,
            default: 'erofeev@regenergy.ru,zaharov.i@domkominvest.ru,nikonov.ae@domkominvest.ru,grishkova.te@domkominvest.ru,nurutdinov.rr@domkominvest.ru',
            desc: 'куда отправлять уведомления об основных событиях кампании(старт/стоп)',
        },
    ];

    const fieldsHtml = fields.map((field) => {
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