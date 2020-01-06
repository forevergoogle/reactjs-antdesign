import callApi from './../utils/apiCaller';
import { actLogout } from './login';
import Helpers from './../utils/Helpers';
import * as Type from './../constants/constants';
import { FETCH_ORDER, SEARCH_ORDER, EDIT_ORDER, FETCH_ORDER_COUNT, FETCH_ORDER_IMPORT } from './../constants/ActionTypes';
import React from 'react'
import { Redirect } from 'react-router-dom';
import { Modal } from 'antd';
import renderEmpty from 'antd/lib/config-provider/renderEmpty';
import { defineMessages } from 'react-intl';

export const actSearchRequest = (query, isCount, lang) => {
    let params = 'order_no=' + query.order_no + '&status_id=' + query.status_id + '&search_status_id=' + query.search_status_id
        + '&origin_country_id=' + query.origin_country_id + '&destination_country_id=' + query.destination_country_id
        + '&actual_date_of_pickup=' + query.actual_date_of_pickup + '&actual_date_of_delivery=' + query.actual_date_of_delivery
        + '&origin_branch_id=' + query.origin_branch_id + '&destination_branch_id=' + query.destination_branch_id
        + '&tracking_no=' + query.tracking_no + '&receiver_name=' + query.receiver_name + '&receiver_address=' + query.receiver_address
        + '&create_date_from=' + query.create_date_from + '&create_date_to=' + query.create_date_to + '&manifest_data_id=' + query.manifest_data_id
        + '&chk_bagging=' + query.chk_bagging
        + '&page=' + query.page + '&page_size=' + query.page_size;
    if (isCount == true) {
        params += '&count_order=1';
    }
    let title = lang == 'en' ? Type.ERROR_TITLE_NOTIFY_EN : Type.ERROR_TITLE_NOTIFY_VI;
    let content = lang == 'en' ? Type.SEARCH_ERROR_NOTIFY_EN : Type.SEARCH_ERROR_NOTIFY_VI;
    return dispatch => {
        query.loading = true;

        dispatch(actChangeQuery(query));
        return callApi(`v2/order?${params}`, 'GET', null, { 'Authorization': localStorage.getItem('accessToken') }).then(res => {
            if (res.status && res.status == 9) {
                dispatch(actLogout(res));
            } else if (res.status && res.status == 1) {
                query.loading = false;
                dispatch(actChangeQuery(query));
                if(res.error[0] && res.error[0].error_message) {
                    let xhtml = null;
                    if(res.error[0].item_error && res.error[0].item_error.length > 0) {
                        xhtml = res.error[0].item_error.map((item, i) => {
                            return (<li style={{paddingLeft: '0px'}} key={i}>{item}</li>);
                        });
                    }
                    console.log('a');
                    content = <React.Fragment>{res.error[0].error_message}<ul style={{listStyleType: 'none',paddingLeft: '0px'}}>{xhtml}</ul></React.Fragment>
                }
                Helpers.showNotify('error', title, content);
            } else {
                query.total = res.total_items;
                query.loading = false;

                dispatch(actChangeQuery(query));
                if (isCount == true) {
                    dispatch(actFetchCount(res));
                } else {
                    dispatch(actFetch(res));
                }
            }
        });
    };
}

export const actAddUpdateRequest = (type, item, query, setStateAction, form, onResetItem, lang, intl) => {
    let path = '', title = '', content = '';
    if (type == Type.API_TYPE_ADD) {
        path = 'v2/order';
        title = lang == 'en' ? Type.SUCCESS_TITLE_NOTIFY_EN : Type.SUCCESS_TITLE_NOTIFY_VI;
        content = lang == 'en' ? Type.ADD_SUCCESS_NOTIFY_EN : Type.ADD_SUCCESS_NOTIFY_VI;
    } 
    // else if (type == Type.API_TYPE_UPDATE) {
    //     path = `v2/order/${item.id}`;
    //     title = lang == 'en' ? Type.SUCCESS_TITLE_NOTIFY_EN : Type.SUCCESS_TITLE_NOTIFY_VI;
    //     content = lang == 'en' ? Type.EDIT_SUCCESS_NOTIFY_EN : Type.EDIT_SUCCESS_NOTIFY_VI;
    // }
    let titleError = lang == 'en' ? Type.ERROR_TITLE_NOTIFY_EN : Type.ERROR_TITLE_NOTIFY_VI;
    return dispatch => {
        return callApi(path, type, item, { 'Authorization': localStorage.getItem('accessToken') }).then(res => {
            if (res.status && res.status == 9) {
                dispatch(actLogout(res));
            } else if (res.status && res.status == 1) {
                let error_message = '';
                let error_list = [];
                if(res.error[0] && res.error[0].validation_messages && res.error[0].validation_messages.tracking_no){
                    error_message = 'Tracking Number already exists';
                    error_list.push({ item_name: 'tracking_no', message: 'Tracking No has already exists' });
                } else if(res.error[0] && res.error[0].validation_messages && res.error[0].validation_messages.weight){
                    error_message = 'Commodity total weight must be less than package weight';
                    error_list.push({ item_name: 'volume', message: 'Weight is invalid' });
                } else if(res.error[0] && res.error[0].validation_messages && res.error[0].validation_messages.service_type){
                    error_message = 'Service must be the same manifest\'s service type';
                    error_list.push({ item_name: 'service_type', message: 'Service type is invalid' });
                } else if(res.error[0] && res.error[0].validation_messages && res.error[0].validation_messages.transport_model){
                    error_message = 'Transport model must be the same manifest\'s transport model';
                    error_list.push({ item_name: 'transport_model', message: 'Transport model is invalid' });
                } else if (res.error[0] && res.error[0].error_message
                    && res.error[0].error_message == 'Destination: Suburb/City/Postcode is not valid'){
                    error_message = res.error[0].error_message;
                    error_list.push({ item_name: 'destination_state', message: 'Destination State is invalid' });
                    error_list.push({ item_name: 'destination_city', message: 'Destination City is invalid' });
                    error_list.push({ item_name: 'destination_zip_code', message: 'Destination PostalCode is invalid' });
                } else {
                    error_message = res.error[0].error_message;
                }
                setStateAction(false, error_list, 1, null, Type.lstPackageTypeECForUS);
                Helpers.showNotify('error', titleError, error_message);
            } else {
                setStateAction(false, [], 1, null, Type.lstPackageTypeECForUS);
                const messages = defineMessages({
                    askDownload: {
                        id: 'CreateOrder.Modal.AskDownload.message',
                        defaultMessage: 'Do you want to download label image ?',
                    },
                    buttonDownload: {
                        id: 'Genaral.ButtonDownload.title',
                        defaultMessage: 'Download'
                    }
                });
                let titleMessage = `${intl.formatMessage(messages.askDownload)}`;
                let buttonOKText = `${intl.formatMessage(messages.buttonDownload)}`
                onResetItem();
                Modal.confirm({
                    title: titleMessage,
                    zIndex: 1031,
                    okButtonProps: {
                        href: res.connote,
                        target: "_blank",    
                        className: "button-ok" 

                    },
                    okText: buttonOKText,
                    onOk() {
                        
                    },
                    onCancel() {},
                });
                // Reset value in form
                form.resetFields();
                Helpers.showNotify('success', title, content);
                return <Redirect to='/order/list' />
            }
        });
    }
}

export const actGetDeleteRequest = (type, id, query = {}, loading = null, lang) => {
    let title = lang == 'en' ? Type.SUCCESS_TITLE_NOTIFY_EN : Type.SUCCESS_TITLE_NOTIFY_VI;
    let content = lang == 'en' ? Type.DELETE_SUCCESS_NOTIFY_EN : Type.DELETE_SUCCESS_NOTIFY_VI;
    let titleError = lang == 'en' ? Type.ERROR_TITLE_NOTIFY_EN : Type.ERROR_TITLE_NOTIFY_VI;
    return dispatch => {
        return callApi(`v2/order/${id}`, type, null, { 'Authorization': localStorage.getItem('accessToken') }).then(res => {
            if (res.status && res.status == 9) {
                dispatch(actLogout(res));
                setTimeout(loading, 0);
            } else if (res.status && res.status == 1) {
                Helpers.showNotify('error', titleError, res.error[0].error_message);
                setTimeout(loading, 0);
            } else {
                if (type == Type.API_TYPE_GET) {
                    dispatch(actGetItem(res));
                } else if (type == Type.API_TYPE_DELETE) {
                    query.page = 1;
                    query.page_size = 10;
                    Helpers.showNotify('success', title, content);
                    dispatch(actSearchRequest(query, true));
                    dispatch(actSearchRequest(query, false));
                }
                setTimeout(loading, 0);
            }
        })
    }
}

export const actImportRequest = (type, orders) => {
    return callApi('v2/order', type, orders, { 'Authorization': localStorage.getItem('accessToken') }).then(res => {
        return res;
    });
}

export const actBagging = (data , lang) => {
    let titleError = lang == 'en' ? Type.ERROR_TITLE_NOTIFY_EN : Type.ERROR_TITLE_NOTIFY_VI;
    let titleSuccess = lang == 'en' ? Type.BAGNO_SUCCESS_NOTIFY_EN : Type.BAGNO_SUCCESS_NOTIFY_VI;
    return callApi('v2/bagging', 'POST', data, { 'Authorization': localStorage.getItem('accessToken') }).then(res => {
       if (res.status && res.status == 'Error') {
               Helpers.showNotify('error', titleError, res.error_message[0]);
            // setTimeout(loading, 0);
        } else {
           // Reset value in form
           // form.resetFields();
           Helpers.showNotifyBagging('success', titleSuccess, res.bag_no);
           // setTimeout(loading, 0);
       }
    });
}

export const actGetOrderRequest = (id) => {
    return dispatch => {
        return callApi(`v2/order/${id}`, Type.API_TYPE_GET, null, { 'Authorization': localStorage.getItem('accessToken') }).then(res => {
            if (res.status && res.status == 9) {
                dispatch(actLogout(res));
            } else {
                dispatch(actGetItem(res));
            }
        });
    };
}

export const actFetch = (data) => {
    return {
        type: FETCH_ORDER,
        data
    }
}

export const actFetchCount = (data) => {
    return {
        type: FETCH_ORDER_COUNT,
        data
    }
}

export const actFetchImport = (data) => {
    return {
        type: FETCH_ORDER_IMPORT,
        data
    }
}

export const actChangeQuery = (query) => {
    return {
        type: SEARCH_ORDER,
        query
    }
}

export const actGetItem = (data) => {
    return {
        type: EDIT_ORDER,
        data
    }
}