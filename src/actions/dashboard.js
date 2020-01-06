import callApi from '../utils/apiCaller';
import { actLogout } from './login';
import Helpers from './../utils/Helpers';
import { FETCH_DASHBOARD } from './../constants/ActionTypes';
import { ERROR_TITLE_NOTIFY_EN, ERROR_TITLE_NOTIFY_VI, SEARCH_ERROR_NOTIFY_EN, SEARCH_ERROR_NOTIFY_VI } from './../constants/constants';
//Get data analysis
export const actGetDataAnalysisRequest = (lang) => {
    let title = lang == 'en' ? ERROR_TITLE_NOTIFY_EN : ERROR_TITLE_NOTIFY_VI;
    let content = lang == 'en' ? SEARCH_ERROR_NOTIFY_EN : SEARCH_ERROR_NOTIFY_VI;
    return dispatch => {
        return callApi(`dashboard`, 'GET', null, { 'Authorization': localStorage.getItem('accessToken') }).then(res => {
            if (res.status && res.status == 9) {
                dispatch(actLogout(res));
            } else if (res.status && res.status == 1) {
                Helpers.showNotify('error', `${title}`, `${content}`);
            } else {
                dispatch(actFetch(res));
            }
        });
    }
}
export const actFetch = (data) => {
    return {
        type: FETCH_DASHBOARD,
        data: data
    }
}