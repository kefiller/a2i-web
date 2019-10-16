import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './components/app';
import ErrorBoundry from './components/error-boundry';
import CcsApiService from './services/ccs-api-service';
import { CcsApiServiceProvider } from './components/ccs-api-service-context';

import { store } from './store';

import './index.css';

const ccsApiService = new CcsApiService ({
    url: '/api/v1/',
    auth: 'uyLH5PA0MngNyRaPQvr386SOSUiXU8'
});

ReactDOM.render((
    <Provider store={store} >
        <ErrorBoundry>
            <CcsApiServiceProvider value={ccsApiService}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </CcsApiServiceProvider>
        </ErrorBoundry>
    </Provider>
),
    document.getElementById('root'));
