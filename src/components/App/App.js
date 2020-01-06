import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { LocaleProvider } from 'antd';
import { addLocaleData, IntlProvider } from 'react-intl';
import moment from 'moment';
import Home from '../Home/Home';
import Login from './../Login/Login';
import './App.css';
import viLocate from './../../entry/vi_VN';
import enLocate from './../../entry/en-US';

addLocaleData([...enLocate.data, ...viLocate.data]);

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            list_menu: [],
            lang: this.props.language == 'en' ? enLocate : viLocate
        };
    }

    componentDidMount() {
        $('body').removeClass('sidebar-mini');
        $('body').removeClass('skin-green-light');
        $('body').addClass('login-page');
        $('body').addClass('hold-transition');
        var token = localStorage.getItem('accessToken');
        let name = localStorage.getItem('login_name');
        if (token != null && token != '') {
            this.props.onSetLoginData({
                accessToken: token,
                user: {
                    login_name: name
                },
                isLoginPage: false
            });
        } else {
            this.props.onSetLoginData({
                accessToken: '',
                user: {
                    login_name: ''
                },
                isLoginPage: true
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        let { language } = nextProps;
        if (language) {
            this.setState({
                lang: language == 'en' ? enLocate : viLocate
            })
        }
    }

    render() {
        let { screen, data, onLogin, onLogout, onChangeScreen, onResetPassword, onChangePassword, onChangeRouter, language, onChangeLanguage } = this.props;
        let { lang } = this.state;
        if (data.isLoginPage === true) {
            $('body').removeClass('sidebar-mini');
            $('body').removeClass('skin-green-light');
            $('body').addClass('login-page');
            $('body').addClass('hold-transition');
        }
        if (language == 'en') {
            moment.locale("en");
        } else {
            moment.locale('vi');
        }
        
        let content;
        if (data.isLoginPage) {
            content =
                <LocaleProvider locale={lang.antd}>
                    <IntlProvider
                        locale={lang.locale}
                        messages={lang.messages}>
                        <Login
                            key={lang.locale}
                            onReloadForm={this.onReloadForm}
                            data={data}
                            screen={screen}
                            onLogin={onLogin}
                            onLogout={onLogout}
                            onChangeScreen={onChangeScreen}
                            onResetPassword={onResetPassword}
                            onChangePassword={onChangePassword} 
                            language={language} 
                            onChangeLanguage={onChangeLanguage}/>
                    </IntlProvider>
                </LocaleProvider>;
        } else {
            content = <LocaleProvider locale={lang.antd}>
                <IntlProvider
                    locale={lang.locale}
                    messages={lang.messages}>
                    <Router>
                        <Home key={lang.locale} onChangeRouter={onChangeRouter} language={language}/>
                    </Router>
                </IntlProvider>
            </LocaleProvider>
        }
        return (
            content
        );
    }

}

export default App;
