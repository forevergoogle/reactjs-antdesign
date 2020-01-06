import axios from 'axios';
import * as Config from './../constants/Config';

export default function callDownloadApi(endpoint, method = 'GET', body, headers = null) {
    return axios({
        method: method,
        url: `${Config.API_URL}/${endpoint}`,
        data: body,
        headers: headers,
        responseType: 'blob',
    }).then(function (res) {
        return res;
    }).catch(error => {
            var data_error = {
                'status': 1,
                'error':
                    [{ 'error_message': 'Server Error!' }]
            };
            return data_error;
        });
};