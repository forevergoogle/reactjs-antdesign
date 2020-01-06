import callApi from './../utils/apiCaller';
import { actLogout } from './login';
import Helpers from './../utils/Helpers';
import { FETCH_ORDER_TRACKING, SEARCH_ORDER, FETCH_ORDER_TRACKING_COUNT } from './../constants/ActionTypes';
import { ERROR_TITLE_NOTIFY_EN, ERROR_TITLE_NOTIFY_VI, SEARCH_ERROR_NOTIFY_EN, SEARCH_ERROR_NOTIFY_VI } from './../constants/constants';

export const actSearchRequest = (query, isCount, lang) => {
    let params = 'order_no=' + query.order_no + '&status_id=' + query.status_id + '&search_status_id=' + query.search_status_id
        + '&origin_country_id=' + query.origin_country_id + '&destination_country_id=' + query.destination_country_id
        + '&actual_date_of_pickup=' + query.actual_date_of_pickup + '&actual_date_of_delivery=' + query.actual_date_of_delivery
        + '&origin_branch_id=' + query.origin_branch_id + '&destination_branch_id=' + query.destination_branch_id
        + '&tracking_no=' + query.tracking_no + '&receiver_name=' + query.receiver_name + '&receiver_address=' + query.receiver_address
        + '&create_date_from=' + query.create_date_from + '&create_date_to=' + query.create_date_to + '&manifest_data_id=' + query.manifest_data_id + '&transport_model=' + query.transport_model
        + '&page=' + query.page + '&page_size=' + query.page_size;
    if (isCount == true) {
        params += '&count_order=1';
    }
    let title = lang == 'en' ? ERROR_TITLE_NOTIFY_EN : ERROR_TITLE_NOTIFY_VI;
    let content = lang == 'en' ? SEARCH_ERROR_NOTIFY_EN : SEARCH_ERROR_NOTIFY_VI;
    return dispatch => {
        query.loading = true;
        dispatch(actChangeQuery(query));
        return callApi(`tracking?${params}`, 'GET', null, { 'Authorization': localStorage.getItem('accessToken') }).then(res => {
            if (res.status && res.status == 9) {
                dispatch(actLogout(res));
            } else if (res.status && res.status == 1) {
                Helpers.showNotify('error', title, content);
            } else {
                query.loading = false;
                dispatch(actChangeQuery(query));
                if (isCount == true) {
                    dispatch(actFetchCount(res));
                } else {
                    query.total = res.total_items;
                    dispatch(actFetch(res));
                }
            }
        });
    };
}

export const actFetch = (data) => {
    return {
        type: FETCH_ORDER_TRACKING,
        data: data
    }
}

export const actFetchCount = (data) => {
    return {
        type: FETCH_ORDER_TRACKING_COUNT,
        data
    }
}

export const actChangeQuery = (query) => {
    return {
        type: SEARCH_ORDER,
        query
    }
}