import axios from 'axios';

export default class HttpApiClient {

    url = {};

    constructor({ url }) {
        this.url = url;
    }

    ping = () => {
        return this.post({
            'method': 'system.ping'
        });
    }

    post = (request) => {
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        const req = JSON.stringify(request);

        var urlParams = new URLSearchParams();
        urlParams.append('request', req);

        return new Promise((resolve, reject) => {
            axios.post(this.url, urlParams, config)
                .then((response) => {
                    if (response.data.error) {
                        // console.log('response.data.error', response.data.error);
                        reject(response.data.error);
                        return;
                    }

                    if(!response.data.result.response) {
                        // console.log('empty response.data.result.response', response.data);
                        reject(response.data);
                        return;
                    }

                    if(response.data.result.response !== 'success') {
                        // console.log('bad request', response.data);
                        reject(response.data);
                        return;
                    }

                    resolve(response.data)
                })
                .catch(error => reject(error));
        });
    }
}