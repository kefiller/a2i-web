import React from 'react';

import { CcsApiServiceConsumer }  from '../../components/ccs-api-service-context';

const withCcsApiService = (Wrapped) => (props) => {
    return (
        <CcsApiServiceConsumer >
            {
                (ccsApiService) => {
                    return (
                        <Wrapped {...props} apiClient={ccsApiService} />
                    );
                }
            }
        </CcsApiServiceConsumer >
    )
};

export default withCcsApiService;