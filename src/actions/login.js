import callApi from '../utils/apiCaller';
import Helpers from './../utils/Helpers';
import * as Type from './../constants/constants';
import { LOGIN, CHANGE_LOGIN_SCREEN, LOGOUT } from './../constants/ActionTypes';

export const actLoginRequest = (account, setStatus, lang) => {
    let title = lang == 'en' ? Type.SUCCESS_TITLE_NOTIFY_EN : Type.SUCCESS_TITLE_NOTIFY_VI;
    let content = lang == 'en' ? Type.LOGIN_SUCCESS_NOTIFY_EN : Type.LOGIN_SUCCESS_NOTIFY_VI;
    let titleError = lang == 'en' ? Type.ERROR_TITLE_NOTIFY_EN : Type.ERROR_TITLE_NOTIFY_VI;
    return dispatch => {
        return callApi('authentication', 'POST', account, null).then(res => {
            if (res.status != 1 && res.status != 9) {
                localStorage.setItem('accessToken', res.data.accessToken);
                localStorage.setItem('login_name', res.data.user.login_name);
                localStorage.setItem('language', localStorage.getItem('language'));
                Helpers.showNotify('success', title, content);
                setStatus(false);
                dispatch(actLogin({ ...res.data, isLoginPage: false }));
            } else {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('login_name');
                Helpers.showNotify('error', titleError, res.error[0].error_message);
                setStatus(false);
            }
        });
    };
}

export const actResetPasswordRequest = (email, setStatus, lang) => {
    let data = {
        ...email,
        flgAction: 'forget-password'
    }
    let title = lang == 'en' ? Type.SUCCESS_TITLE_NOTIFY_EN : Type.SUCCESS_TITLE_NOTIFY_VI;
    let content = lang == 'en' ? Type.SENDPASS_SUCCESS_NOTIFY_EN : Type.SENDPASS_SUCCESS_NOTIFY_VI;
    let titleError = lang == 'en' ? Type.ERROR_TITLE_NOTIFY_EN : Type.ERROR_TITLE_NOTIFY_VI;
    let contentCheck = lang == 'en' ? Type.CHECKMAIL_SUCCESS_NOTIFY_EN : Type.CHECKMAIL_SUCCESS_NOTIFY_VI;
    return dispatch => {
        return callApi(`customer`, 'POST', data, null).then(res => {
            if (res.status != 1 && res.status != 9) {
                Helpers.showNotify('success', title, content);
                setStatus(false, contentCheck);
            } else {
                Helpers.showNotify('error', titleError, res.error[0].error_message);
                setStatus(false, null);
            }
        });
    }
}

export const actChangePasswordRequest = (account, token, setStatus, lang) => {
    let data = {
        ...account,
        flgAction: 'change-password'
    }
    let title = lang == 'en' ? Type.SUCCESS_TITLE_NOTIFY_EN : Type.SUCCESS_TITLE_NOTIFY_VI;
    let content = lang == 'en' ? Type.CHANGEPASS_SUCCESS_NOTIFY_EN : Type.CHANGEPASS_SUCCESS_NOTIFY_VI;
    let titleError = lang == 'en' ? Type.ERROR_TITLE_NOTIFY_EN : Type.ERROR_TITLE_NOTIFY_VI;
    return dispatch => {
        return callApi(`customer/${token}`, 'PUT', data, null).then(res => {
            if (res.status != 1 && res.status != 9) {
                Helpers.showNotify('success', title, content);
                setStatus(false, true);
                dispatch(actChangeLoginScreen(Type.LOGIN_STATUS_NORMAL));
            } else {
                Helpers.showNotify('error', titleError, res.error[0].error_message);
                setStatus(false, false);
            }
        });
    };
}

export const actLogin = (data) => {
    return {
        type: LOGIN,
        data
    }
}

export const actChangeLoginScreen = (screen) => {
    return {
        type: CHANGE_LOGIN_SCREEN,
        screen
    }
}

export const actLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user_name');
    return {
        type: LOGOUT
    }
}