import React, { Component } from 'react';
import { connect } from 'react-redux';
import App from './../../components/App/App';
import { actChangePage, actChangeLanguage } from '../../actions';
import { actLogout, actLoginRequest, actChangeLoginScreen, actResetPasswordRequest, actChangePasswordRequest, actLogin } from '../../actions/login';

class AppContainer extends Component {

    render() {
        let { screen, data, onLogin, onLogout, onChangeScreen, onResetPassword, onChangePassword, onChangeRouter, onSetLoginData, language, onChangeLanguage } = this.props;
        return (
            <App
                data={data}
                screen={screen}
                onLogin={onLogin}
                onLogout={onLogout}
                language={language}
                onChangeScreen={onChangeScreen}
                onResetPassword={onResetPassword}
                onChangePassword={onChangePassword}
                onChangeRouter={onChangeRouter}
                onSetLoginData={onSetLoginData}
                onChangeLanguage={onChangeLanguage}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        screen: state.loginScreen,
        data: state.login,
        language: state.language,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (account, setStatus, lang) => {
            dispatch(actLoginRequest(account, setStatus, lang));
        },
        onLogout: () => {
            dispatch(actLogout());
        },
        onResetPassword: (email, setStatus, lang) => {
            dispatch(actResetPasswordRequest(email, setStatus, lang));
        },
        onChangePassword: (value, token, setStatus, lang) => {
            dispatch(actChangePasswordRequest(value, token, setStatus, lang));
        },
        onChangeScreen: (status) => {
            dispatch(actChangeLoginScreen(status));
        },
        onChangeRouter: () => {
            dispatch(actChangePage());
        },
        onSetLoginData: (data) => {
            dispatch(actLogin(data));
        },
        onChangeLanguage: (type) => {
            dispatch(actChangeLanguage(type));
            dispatch(actChangePage());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);