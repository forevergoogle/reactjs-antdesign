import React, { Component } from 'react';
import { Form, Icon, Input, Button, Alert } from 'antd';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import { LOGIN_STATUS_NORMAL } from './../../constants/constants';

const messages = defineMessages({
    emailPlaceholder: {
        id: 'Login.PageForgot.EmailPlaceholder.title',
        defaultMessage: 'Email',
    },
    returnLink: {
        id: 'Login.PageForgot.ReturnLink.title',
        defaultMessage: 'Return login'
    },
    buttonSend: {
        id: 'Login.PageForgot.ButtonSend.title',
        defaultMessage: 'Send'
    },
    emailError: {
        id: 'Login.PageForgot.EmailError.title',
        defaultMessage: 'Please input your e-mail!'
    },
    emailErrorValid: {
        id: 'Login.PageForgot.EmailErrorInValid.title',
        defaultMessage: 'The input is not valid e-mail!'
    }
});

class FormForgetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            notify: null,
        };
    }

    componentDidMount() {
        this.props.form.validateFields();
    }

    hasErrors = (fieldsError) => {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
    }

    handleBackLogin = (e) => {
        e.preventDefault();
        this.props.handleChangeLoginScreen(LOGIN_STATUS_NORMAL);
    }

    setStatus = (loading, notify) => {
        this.setState({ loading, notify });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let { language, form, onResetPassword } = this.props;
        this.setState({
            loading: true,
            notify: null
        });
        form.validateFields((err, values) => {
            if (!err) {
                onResetPassword(values, this.setStatus, language);
            }
        });
    }

    render() {
        let { notify } = this.state;
        const { form, intl } = this.props;
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = form;
        // Only show error after a field is touched.
        const userNameError = isFieldTouched('email') && getFieldError('email');
        return (
            <React.Fragment>
                <Form onSubmit={this.handleSubmit} className="login-forget-form">
                    <Form.Item
                        validateStatus={userNameError ? 'error' : ''}
                        help={userNameError || ''}
                    >
                        {getFieldDecorator('email', {
                            rules: [{
                                type: 'email', message: `${intl.formatMessage(messages.emailErrorValid)}`,
                            }, {
                                required: true, message: `${intl.formatMessage(messages.emailError)}`,
                            }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={intl.formatMessage(messages.emailPlaceholder)} />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <div className="text-center login-form-forgot">
                            <a onClick={this.handleBackLogin}><FormattedMessage {...messages.returnLink} /></a>
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
                            <FormattedMessage {...messages.buttonSend} />
                        </Button>
                    </Form.Item>
                </Form>
                {this.showAlertInfo(notify)}
            </React.Fragment>
        );
    }

    showAlertInfo = (notify) => {
        let xhtml = null;
        if (notify) {
            xhtml = <Alert
                message={notify}
                type="success"
                showIcon
                className="mb-10"
            />
        }
        return xhtml;
    }
}

const WrappedForgetPassword = Form.create({ name: 'normal_forget_password' })(FormForgetPassword);
export default injectIntl(WrappedForgetPassword);