import * as Types from '../constants/ActionTypes';
import callApi from '../utils/apiCaller';
import { ECBS_TOKEN } from '../constants/Config';
import { actLogout } from './login';

export const actFetchMenu = () => {
    return callApi('permission', 'GET', null, { 'Authorization': localStorage.getItem('accessToken') }).then(res => {
        return res;
    });
}

// Change page
export const actChangePage = () => {
    return {
        type: Types.CHANGE_PAGE,
    }
}

// Get branch list
export const actFetchListRequest = (type) => {
    let path = '';
    let params = `encroach_to_read=true&page_size=-1&order_by=name`;
    let linkType = true;
    if (type === Types.FETCH_BRANCH_LIST) {
        path = 'branch';
        linkType = true;
    } else if (type === Types.FETCH_COUNTRY_LIST) {
        path = 'country';
        linkType = true;
    } else if (type === Types.FETCH_MANIFEST_LIST) {
        path = 'v2/manifest-data';
        linkType = false;
    } else if (type === Types.FETCH_CUSTOMER_LIST) {
        path = 'customer';
        linkType = true;
    } else if (type === Types.FETCH_STATUS_LIST) {
        path = 'status';
        linkType = true;
    } else if (type === Types.FETCH_FEE_LIST) {
        path = 'fee';
        linkType = true;
    } else if (type === Types.FETCH_IMPORT_MANIFEST_LIST) {
        path = 'v2/manifest-data';
        params += '&used=1';
        linkType = false;
    }
    
    let token = linkType == true ? ECBS_TOKEN : localStorage.getItem('accessToken');
    return dispatch => {
        return callApi(`${path}?${params}`, 'GET', null, { 'Authorization': token }, linkType).then(res => {
            if (res.status && res.status == 9) {
                dispatch(actLogout(res));
            } else {
                dispatch(actFetchList(res, type));
            }
        });
    };
}

export const actFetchList = (data, type) => {
    return {
        type,
        data
    }
}

// Change language
export const actChangeLanguage = (data) => {
    return {
        type: Types.CHANGE_LANGUAGE,
        data
    }
}