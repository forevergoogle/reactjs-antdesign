import axios from 'axios';
import * as Config from './../constants/Config';
import * as code from './../constants/StatusCode';

export default function callApi(endpoint, method = 'GET', body, headers = null, ecbs_url = false) {
    let url_link = ecbs_url ? Config.ECBS_API_URL : Config.API_URL;
    return axios({
        method: method,
        url: `${url_link}/${endpoint.replace(/#/g, '%23')}`,
        data: body,
        headers: headers,
    }).then(function (res) {
        if (res.status == code.STATUS_200 || res.status == code.STATUS_201 || res.status == code.STATUS_202 || res.status == code.STATUS_204) {
            return res.data;
        } else if(res.status == code.STATUS_203) {
            var data_error = {
                'status': 9,
                'error':
                    [{ 'error_message': res.data.error.error_message}]
            };
            return data_error;
        }
    }).catch(error => {
            var data_error = {
                'status': 1,
                'error':
                    [{ 'error_message': 'Unknown error' }]
            };
            return data_error;
        });
};