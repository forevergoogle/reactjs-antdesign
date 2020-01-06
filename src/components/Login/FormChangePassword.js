import React, { Component } from 'react';
import { Redireact } from 'react-router-dom';
import { Modal, Form, Icon, Input, Button } from 'antd';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import { LOGIN_STATUS_NORMAL, PASSWORD_PATTERN } from './../../constants/constants';
import { Redirect } from 'react-router-dom';

const messages = defineMessages({
    newPassPlaceholder: {
        id: 'Login.PageChangePass.NewPass.title',
        defaultMessage: 'New password',
    },
    oldPassPlaceholder: {
        id: 'Login.PageChangePass.OldPass.title',
        defaultMessage: 'Old password',
    },
    confirmPassPlaceholder: {
        id: 'Login.PageChangePass.ConfirmPass.title',
        defaultMessage: 'Confirm password',
    },
    returnLink: {
        id: 'Login.PageForgot.ReturnLink.title',
        defaultMessage: 'Return login'
    },
    buttonChangePass: {
        id: 'Login.PageChangePass.Button.title',
        defaultMessage: 'Change password'
    },
    newRequireError: {
        id: 'Login.PageChangePass.NewPassErrorRequire.title',
        defaultMessage: 'Please input your password!'
    },
    oldRequireError: {
        id: 'Login.PageChangePass.OldPassErrorRequire.title',
        defaultMessage: 'Please input your old password!'
    },
    newErrorType: {
        id: 'Login.PageChangePass.NewPassErrorType.title',
        defaultMessage: 'Please enter minimum eight characters, at least one uppercase letter, one lowercase letter and one number'
    },
    confirmError: {
        id: 'Login.PageChangePass.ConfirmPassError.title',
        defaultMessage: 'Please confirm your password!'
    },
    consistError: {
        id: 'Login.PageChangePass.ConsistError.title',
        defaultMessage: 'Two passwords that you enter is inconsistent!'
    }
});

class FormChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            visible: false
        };
    }

    componentDidMount() {
        // this.props.form.validateFields();
    }

    hasErrors = (fieldsError) => {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
    }

    compareToFirstPassword = (rule, value, callback) => {
        const { intl } = this.props;
        const form = this.props.form;
        if (value && value !== form.getFieldValue('new_password')) {
            callback(`${intl.formatMessage(messages.consistError)}`);
        } else {
            callback();
        }
    }

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm_new_password'], { force: true });
        }
        callback();
    }
    handleBackLogin = (e) => {
        e.preventDefault();
        this.props.handleChangeLoginScreen(LOGIN_STATUS_NORMAL);
    }

    setStatus = (loading, isMove) => {
        this.setState({loading});
        if(isMove) {
            return <Redirect to="/" />
        }
    }
    hideModal = () => {
        let { showModal, form } = this.props;
        showModal(false);
        form.resetFields();
        // this.setState({ isFirst: true });
    }
    showBtnSubmit = () => {
        let { loading } = this.state;
        let { form } = this.props;
        let { getFieldsError } = form;
            return (
                <Button
                    key="submit"
                    htmlType="submit"
                    type="primary"
                    loading={loading}
                    // disabled={this.hasErrors(getFieldsError())}
                    onClick={this.handleSubmit}
                >Submit</Button>
            )
    }


    handleSubmit = (e) => {
        e.preventDefault();
        let { form, onChangePassword, language } = this.props;
        // this.setState({ loading: true });
        form.validateFields((err, values) => {
            let token = localStorage.getItem('accessToken');
            let account = {
                ...values,
                token
            }

            if (!err) {
                onChangePassword(account, token, this.setStatus, language);
                this.hideModal();
            }

        });
    }
    showModal = () => {
        this.props.showModal(true);
    }


    render() {
        const { intl,visible } = this.props;
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
        } = this.props.form;
        const title = "Change Password";
        const pattern = new RegExp(PASSWORD_PATTERN);
        // Only show error after a field is touched.
        const passwordError = isFieldTouched('new_password') && getFieldError('new_password');
        const oldPasswordError = isFieldTouched('old_password') && getFieldError('old_password');
        const passwordConfirmError = isFieldTouched('confirm_new_password') && getFieldError('confirm_new_password');
        return (
           <React.Fragment>
                <Button type="primary" className="mb-10" onClick={this.showModal}><FormattedMessage {...messages.buttonChangePass} /></Button>
                <Form layout="vertical" onSubmit={this.handleSubmit} className="change-password-form">
                    <Modal
                        title={title}
                        visible={visible}
                        destroyOnClose={true}
                        keyboard={false}
                        autoFocusButton="ok"
                        style={{width: 300 +'px'}}
                        zIndex={1031}
                        onCancel = {this.hideModal}
                        footer={[
                            this.showBtnSubmit(),
                            <Button key="back" onClick={this.hideModal}>Cancel</Button>
                        ]}

                    >
                        <Form.Item label={intl.formatMessage(messages.oldPassPlaceholder)}>
                            {getFieldDecorator('old_password', {
                                rules: [{
                                    required: true, message: `${intl.formatMessage(messages.oldRequireError)}`,
                                },
                                ],
                            })(
                                <Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder={intl.formatMessage(messages.oldPassPlaceholder)} />
                            )}
                        </Form.Item>
                    <Form.Item
                        label={intl.formatMessage(messages.newPassPlaceholder)}
                    >
                        {getFieldDecorator('new_password', {
                            rules: [{
                                required: true, message: `${intl.formatMessage(messages.newRequireError)}`,
                            },{
                                pattern: pattern, message: `${intl.formatMessage(messages.newErrorType)}`,
                            }, {
                                validator: this.validateToNextPassword,
                            }],
                        })(
                            <Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder={intl.formatMessage(messages.newPassPlaceholder)} />
                        )}
                    </Form.Item>
                        <Form.Item
                            label={intl.formatMessage(messages.confirmPassPlaceholder)}
                        >
                            {getFieldDecorator('confirm_new_password', {
                                rules: [{
                                    required: true, message: `${intl.formatMessage(messages.confirmError)}`,
                                }, {
                                    validator: this.compareToFirstPassword,
                                }],
                            })(
                                <Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" onBlur={this.handleConfirmBlur} placeholder={intl.formatMessage(messages.confirmPassPlaceholder)} />
                            )}
                        </Form.Item>

                    </Modal>
            </Form>
            </React.Fragment>
        );
    }
}

const WrappedChangePassword = Form.create({ name: 'change_password' })(FormChangePassword);
export default injectIntl(WrappedChangePassword);