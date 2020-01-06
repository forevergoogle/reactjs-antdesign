import callApi from './../utils/apiCaller';
import { actLogout } from './login';
import Helpers from './../utils/Helpers';
import * as Type from './../constants/constants';
import { FETCH_MANIFEST, SEARCH_MANIFEST, EDIT_MANIFEST } from './../constants/ActionTypes';
import { Modal } from 'antd';
import { defineMessages } from 'react-intl';
import axios from "axios/index";
import * as Config from "../constants/Config";

export const actSearchRequest = (query, lang) => {
    let params = `transport_model=${query.transport_model}&origin_branch_id=${query.origin_branch_id}&manifest_number=${query.manifest_number}&create_date_from=${query.create_date_from}&create_date_to=${query.create_date_to}&page=${query.page}&page_size=${query.page_size}`;
    let title = lang == 'en' ? Type.ERROR_TITLE_NOTIFY_EN : Type.ERROR_TITLE_NOTIFY_VI;
    let content = lang == 'en' ? Type.SEARCH_ERROR_NOTIFY_EN : Type.SEARCH_ERROR_NOTIFY_VI;
    return dispatch => {
        query.loading = true;
        dispatch(actChangeQuery(query));
        return callApi(`v2/manifest-data?${params}`, 'GET', null, { 'Authorization': localStorage.getItem('accessToken') }).then(res => {
            if (res.status && res.status == 9) {
                dispatch(actLogout(res));
            } else if (res.status && res.status == 1) {
                Helpers.showNotify('error', title, content);
            } else {
                query.total = res.total_items;
                query.loading = false;
                dispatch(actChangeQuery(query));
                dispatch(actFetch(res));
            }
        });
    };
}

export const actAddUpdateRequest = (type, item, query, setStateAction, form, onResetItem, lang, intl) => {
    let path = '', title = '', content = '';
    if (type == Type.API_TYPE_ADD) {
        path = 'v2/manifest-data';
        title = lang == 'en' ? Type.SUCCESS_TITLE_NOTIFY_EN : Type.SUCCESS_TITLE_NOTIFY_VI;
        content = lang == 'en' ? Type.ADD_SUCCESS_NOTIFY_EN : Type.ADD_SUCCESS_NOTIFY_VI;
    } else if (type == Type.API_TYPE_UPDATE) {
        path = `v2/manifest-data/${item.id}`;
        title = lang == 'en' ? Type.SUCCESS_TITLE_NOTIFY_EN : Type.SUCCESS_TITLE_NOTIFY_VI;
        content = lang == 'en' ? Type.EDIT_SUCCESS_NOTIFY_EN : Type.EDIT_SUCCESS_NOTIFY_VI;
    }
    let titleError = lang == 'en' ? Type.ERROR_TITLE_NOTIFY_EN : Type.ERROR_TITLE_NOTIFY_VI;
    return dispatch => {
        return callApi(path, type, item, { 'Authorization': localStorage.getItem('accessToken') }).then(res => {
            if (res.status && res.status == 9) {
                dispatch(actLogout(res));
            } else if (res.status && res.status == 1) {
                setStateAction(true, false, false);
                const messages = defineMessages({
                    askImport: {
                        id: 'Manifest.Modal.AskPublish.message',
                        defaultMessage: 'Manifest is having errors. Are you want to publish manifest?',
                    }});
                let title = `${intl.formatMessage(messages.askImport)}`
                Modal.confirm({
                    title,
                    zIndex: 1031,
                    onOk() {
                        item.confirm = true;
                        dispatch(actAddUpdateRequest(type, item, query, setStateAction, form, onResetItem, lang, intl));
                    },
                    onCancel() { 
                        Helpers.showNotify('error', titleError, res.error[0].error_message);
                    },
                });
            } else {
                query.page = 1;
                query.page_size = 10;
                dispatch(actSearchRequest(query));
                setStateAction(false, false, true);
                onResetItem();
                // Reset value in form
                form.resetFields();
                Helpers.showNotify('success', title, content);
            }
        });
    }
}

export const actGetDeleteRequest = (type, id, query = {}, loading = null, lang) => {
    let title = lang == 'en' ? Type.SUCCESS_TITLE_NOTIFY_EN : Type.SUCCESS_TITLE_NOTIFY_VI;
    let content = lang == 'en' ? Type.DELETE_SUCCESS_NOTIFY_EN : Type.DELETE_SUCCESS_NOTIFY_VI;
    let titleError = lang == 'en' ? Type.ERROR_TITLE_NOTIFY_EN : Type.ERROR_TITLE_NOTIFY_VI;
    return dispatch => {
        return callApi(`v2/manifest-data/${id}`, type, null, { 'Authorization': localStorage.getItem('accessToken') }).then(res => {
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
                    dispatch(actSearchRequest(query));
                }
                setTimeout(loading, 0);
            }
        })
    }
}

export const actFetch = (data) => {
    return {
        type: FETCH_MANIFEST,
        data: data
    }
}

export const actChangeQuery = (query) => {
    return {
        type: SEARCH_MANIFEST,
        query
    }
}

export const actGetItem = (data) => {
    return {
        type: EDIT_MANIFEST,
        data
    }
}

export const actGetExportRequest = (id, query = {}, lang) => {
    let url_link = Config.API_URL;

    return dispatch => {
            return axios({
                method: 'GET',
                url: `${url_link}/${`v2/manifest-export/${id}`.replace(/#/g, '%23')}`,
                data: null,
                headers: { 'Authorization': localStorage.getItem('accessToken') },
                responseType: 'blob'

            }).then(function (res) {
                let newDate = new Date()
                let date = newDate.getDate();
                let month = newDate.getMonth() + 1;
                let year = newDate.getFullYear();
                let hour = newDate.getHours();
                let minute = newDate.getMinutes();
                let second = newDate.getSeconds();
                let nameFile = date+''+month+''+year+''+hour+''+minute+''+second;

                const url = window.URL.createObjectURL(new Blob([res.data],{type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'ITL_Manifest_'+nameFile+'.xlsx'); //or any other extension
                document.body.appendChild(link);
                link.click();

            });


    }
}

