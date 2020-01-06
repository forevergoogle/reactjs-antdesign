import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import { LOGIN_STATUS_FORGET } from './../../constants/constants';

const messages = defineMessages({
    userPlaceHoder: {
        id: 'Login.Page.UserPlaceholder.title',
        defaultMessage: 'Email/ Phone number',
    },
    passPlaceHolder: {
        id: 'Login.Page.PassPlaceholder.title',
        defaultMessage: 'Password',
    },
    forgotLink: {
        id: 'Login.Page.ForgetLink.title',
        defaultMessage: 'Forgot password ?'
    },
    buttonLogin: {
        id: 'Login.Page.ButtonLogin.title',
        defaultMessage: 'Login'
    },
    userError: {
        id: 'Login.Page.UserError.title',
        defaultMessage: 'Please input your email or phone number!'
    },
    passError: {
        id: 'Login.Page.PassError.title',
        defaultMessage: 'Please input your password!'
    }
});

class FormLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }

    componentDidMount() {
        this.props.form.validateFields();
    }

    hasErrors = (fieldsError) => {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
    }

    handleForgetLogin = (e) => {
        e.preventDefault();
        this.props.handleChangeLoginScreen(LOGIN_STATUS_FORGET);
    }

    setStatus = (loading) => {
        this.setState({ loading });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let { onLogin, language } = this.props;
        this.setState({ loading: true });
        this.props.form.validateFields((err, values) => {
            if (!err) {
                onLogin(values, this.setStatus, language);
            }
        });
    }

    render() {
        const { intl } = this.props;
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        // Only show error after a field is touched.
        const userNameError = isFieldTouched('login_name') && getFieldError('login_name');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item
                    validateStatus={userNameError ? 'error' : ''}
                    help={userNameError || ''}
                >
                    {getFieldDecorator('login_name', {
                        rules: [{ required: true, message: `${intl.formatMessage(messages.userError)}` }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={intl.formatMessage(messages.userPlaceHoder)} />
                    )}
                </Form.Item>
                <Form.Item
                    validateStatus={passwordError ? 'error' : ''}
                    help={passwordError || ''}
                >
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: `${intl.formatMessage(messages.passError)}` }],
                    })(
                        <Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder={intl.formatMessage(messages.passPlaceHolder)} />
                    )}
                </Form.Item>
                <Form.Item>
                    <div className="text-center login-form-forgot">
                        <a onClick={this.handleForgetLogin}><FormattedMessage {...messages.forgotLink} /></a>
                    </div>
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        block
                        loading={this.state.loading}
                        disabled={this.hasErrors(getFieldsError())}
                    >
                        <FormattedMessage {...messages.buttonLogin} />
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedLoginForm = Form.create({ name: 'normal_login' })(FormLogin);
export default injectIntl(WrappedLoginForm);