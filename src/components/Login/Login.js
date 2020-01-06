import React, { Component } from 'react';
import { Row, Col, Typography, Menu, Dropdown, Icon } from 'antd';
import { FormattedMessage, defineMessages } from 'react-intl';
import WrappedLoginForm from './FormLogin';
import FormForgetPassword from './FormForgetPassword';
import FormChangePassword from './FormChangePassword';
import { LOGIN_STATUS_NORMAL, LOGIN_STATUS_FORGET, LOGIN_STATUS_CHANGE_PASSWORD } from './../../constants/constants';
import './index.less';

const { Title, Paragraph, Text } = Typography;
const screenStatus = window.location.pathname;

const messages = defineMessages({
    pageTitle: {
        id: 'Login.Page.title',
        defaultMessage: 'Welcome to Customer Portal',
    },
    help: {
        id: 'Login.Page.Help.title',
        defaultMessage: `If you can not login to system or you don't have account. For support, please send email to`,
    },
    loginSubTitle: {
        id: 'Login.Page.SubTitle.title',
        defaultMessage: 'Sign in by entering the informations below'
    },
    forgotSubTitle: {
        id: 'Login.PageForgot.SubTitle.title',
        defaultMessage: 'Send a request by entering the informations below'
    },
    changeSubTitle: {
        id: 'Login.PageChangePass.SubTitle.title',
        defaultMessage: 'Send a password verification by entering the informations below'
    },
    langEn: {
        id: 'Header.Language.En.title',
        defaultMessage: 'English',
    },
    langVi: {
        id: 'Header.Language.Vi.title',
        defaultMessage: 'Vietnamese',
    },
});

class Login extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const status = screenStatus.substring(1, screenStatus.length);
        localStorage.setItem('language', this.props.language);
        if (status === LOGIN_STATUS_CHANGE_PASSWORD) {
            this.props.onChangeScreen(LOGIN_STATUS_CHANGE_PASSWORD);
        }
    }

    handleChangeLoginScreen = (screen) => {
        this.props.onChangeScreen(screen);
    }

    handleChangeLanguage = (lang) => {
        this.props.onChangeLanguage(lang);
    }

    render() {
        let { screen, language } = this.props;
        let langText = language == 'en' ? <FormattedMessage {...messages.langEn}/> : <FormattedMessage {...messages.langVi}/>;
        return (
            <Row>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 14 }} lg={{ span: 16 }}>
                    <div className="block-bg"></div>
                    <div className="lang-wrapper">
                        <Dropdown overlay={this.showLangList()} trigger={['click']}>
                            <a className="ant-dropdown-link pull-right" href="#">
                                {langText} <Icon type="down" />
                            </a>
                        </Dropdown>
                    </div>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 10 }} lg={{ span: 8 }}>
                    <div className="login-form-wrap">
                        <div className="login-logo">
                            <Title level={1} type="primary"><FormattedMessage {...messages.pageTitle} /></Title>
                            {this.showSubTitle(screen)}
                        </div>
                        <div className="login-box-body">
                            {this.showSreen(screen)}
                            <Paragraph type="block-help">
                                <FormattedMessage {...messages.help} />&nbsp;<Text type="danger" code>helpdesk@itlvn.com</Text>.
                            </Paragraph>
                            <div className="footer">
                                <p>Copyright &#169; 2018 ITL Corp. All right reserved</p>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        );
    }

    showSubTitle = (screen) => {
        let xhtml = null;
        if (screen == LOGIN_STATUS_NORMAL) {
            xhtml = <Text type="remind"><FormattedMessage {...messages.loginSubTitle} /></Text>;
        } else if (screen == LOGIN_STATUS_FORGET) {
            xhtml = <Text type="remind"><FormattedMessage {...messages.forgotSubTitle} /></Text>;
        } else if (screen == LOGIN_STATUS_CHANGE_PASSWORD) {
            xhtml = <Text type="remind"><FormattedMessage {...messages.changeSubTitle} /></Text>;
        }
        return xhtml;
    }

    showSreen = (screen) => {
        let xhtml = null;
        let { onLogin, onResetPassword, onChangePassword, language } = this.props;
        if (screen == LOGIN_STATUS_NORMAL) {
            xhtml = <WrappedLoginForm
                handleChangeLoginScreen={this.handleChangeLoginScreen}
                onLogin={onLogin}
                language={language}
            ></WrappedLoginForm>;
        } else if (screen == LOGIN_STATUS_FORGET) {
            xhtml = <FormForgetPassword
                handleChangeLoginScreen={this.handleChangeLoginScreen}
                onResetPassword={onResetPassword}
                language={language}
            ></FormForgetPassword>;
        } else if (screen == LOGIN_STATUS_CHANGE_PASSWORD) {
            xhtml = <FormChangePassword
                handleChangeLoginScreen={this.handleChangeLoginScreen}
                token={window.location.search.substring(7, window.location.search.length)}
                onChangePassword={onChangePassword}
                language={language}
            ></FormChangePassword>;
        }
        return xhtml;
    }

    showLangList = () => {
        let html = null;
        let { language } = this.props;
        html = <Menu>
            <Menu.Item key="0" onClick={() => this.handleChangeLanguage('en')} className={`${language == 'en' ? 'active' : ''}`}>
                <a href="javascript:;"><FormattedMessage {...messages.langEn}/></a>
            </Menu.Item>
            <Menu.Item key="1" onClick={() => this.handleChangeLanguage('vi')} className={`${language == 'vi' ? 'active' : ''}`}>
                <a href="javascript:;"><FormattedMessage {...messages.langVi}/></a>
            </Menu.Item>
        </Menu>
        return html;
    }
}
export default Login;