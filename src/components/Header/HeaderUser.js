import React, { Component } from 'react';
import { Avatar, Button, Modal,  Icon, message } from 'antd';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import { actLogout } from './../../actions/login';
import { connect } from 'react-redux';
import FormChangePassword from './../Login/FormChangePassword'
import {actChangePasswordRequest} from "../../actions/login";

const messages = defineMessages({
    buttonProfile: {
        id: 'Header.User.ButtonProfile.title',
        defaultMessage: 'Profile',
    },
    buttonSignout: {
        id: 'Header.User.ButtonSignout.title',
        defaultMessage: 'Signout',
    },
    txtSignout: {
        id: 'Header.User.TextSignout.title',
        defaultMessage: 'Logout success!!',
    },
    buttonChangePass: {
        id: 'Login.PageChangePassword.Button.title',
        defaultMessage: 'Change Pass',
    }
});

class HeaderUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user_name: '',
            visible: false,
            confirmLoading: false
        };
    }

    componentWillMount() {
        if (this.props.data.user) {
            var user_name = this.props.data.user.login_name;
            this.setState({
                user_name: user_name
            })
        } else {
            var user_name = localStorage.getItem('login_name');
            this.setState({
                user_name: user_name
            })
        }
    }

    onLogout = () => {
        const { intl } = this.props;
        message.success(intl.formatMessage(messages.txtSignout));
        this.props.onLogout();
    }
    showModal = (visible) => {
        this.setState({ visible });
    }

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    render() {
        var { user_name } = this.state;
        const { onChangePassword, onResetItem, intl, query, language } = this.props;
        return (
            <li className="dropdown user user-menu">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                    <Avatar style={{ backgroundColor: '#1890ff' }} icon="user" size="small" />&nbsp;
                    <span className="hidden-xs">{user_name}</span>
                </a>
                <ul className="dropdown-menu">
                    <li className="user-header">
                        <Avatar style={{ backgroundColor: '#1890ff' }} icon="user" size={80} />&nbsp;
                        <p>{user_name}</p>
                    </li>
                    <li className="user-footer">
                        <div className="pull-left">
                            <FormChangePassword
                                token={window.location.search.substring(7, window.location.search.length)}
                                onChangePassword={onChangePassword}
                                visible={this.state.visible}
                                showModal={this.showModal}
                                language={language}
                            ></FormChangePassword>
                        </div>
                        <div className="pull-right">
                            <Button onClick={this.onLogout} type="danger"><Icon type="logout" /> <FormattedMessage {...messages.buttonSignout}/></Button>
                        </div>
                    </li>
                </ul>
            </li>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.login
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onLogout: () => {
            dispatch(actLogout());
        },
        onChangePassword: (value, token, setStatus, lang) => {
            dispatch(actChangePasswordRequest(value, token, setStatus, lang));
        },
    }

}
export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(HeaderUser));