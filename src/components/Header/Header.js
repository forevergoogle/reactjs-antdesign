import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { filter } from 'lodash';
import { Icon, Badge, Avatar, Empty } from 'antd';
import { FormattedMessage, defineMessages } from 'react-intl';
import HeaderUser from './HeaderUser';
import { BASE_URL } from './../../constants/Config';
import { actChangeLanguage, actChangePage } from './../../actions';

const messages = defineMessages({
    langEn: {
        id: 'Header.Language.En.title',
        defaultMessage: 'English',
    },
    langVi: {
        id: 'Header.Language.Vi.title',
        defaultMessage: 'Vietnamese',
    },
    viewAll: {
        id: 'Header.Notify.ViewAll.title',
        defaultMessage: 'View all notification',
    }
});


class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lstNotify: []
        };
    }

    handleChange = (e, lang) => {
        e.preventDefault();
        this.props.onChangeLanguage(lang);
    }

    render() {
        var { lstNotify } = this.state;
        let { language } = this.props;
        let langName = language == 'en' ? 'usa-flag.png' : 'vn-flag.png'
        return (
            <header className="main-header">
                <Link to='/' className="logo">
                    <span className="logo-mini">
                        <img src={BASE_URL + "public/dist/img/icon/logo-small.png"} />
                    </span>
                    <span className="logo-lg">
                        <img src={BASE_URL + "public/dist/img/icon/logo.png"} />
                    </span>
                </Link>
                <nav className="navbar navbar-static-top">
                    <a href="#" className="sidebar-toggle" data-toggle="push-menu" role="button">
                        <Icon type="menu-fold" />
                    </a>
                    <div className="navbar-custom-menu">
                        <ul className="nav navbar-nav">
                            <li className="dropdown user user-menu">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <Avatar size="small" src={BASE_URL + "public/dist/img/icon/" + langName}></Avatar>
                                </a>
                                <ul className="dropdown-menu pb-10">
                                    <li className={`${language == 'en' ? 'active' : ''}`}>
                                        <a onClick={(e) => this.handleChange(e, 'en')}><FormattedMessage {...messages.langEn}/></a>
                                    </li>
                                    <li className={`${language == 'vi' ? 'active' : ''}`}>
                                        <a onClick={(e) => this.handleChange(e, 'vi')}><FormattedMessage {...messages.langVi}/></a>
                                    </li>
                                </ul>
                            </li>
                            <li className="dropdown notifications-menu messages-menu">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <Badge count={filter(lstNotify, { status_user_id: '1' }).length} showZero>
                                        <Icon type="bell" style={{ fontSize: '20px', lineHeight: '30px' }} />
                                    </Badge>
                                </a>
                                <ul className="dropdown-menu">
                                    {lstNotify.length == 0 ? <li className="header"><Empty /></li> :
                                        <React.Fragment>
                                            <li>
                                                <ul className="menu list-notify">
                                                    <li><Empty /></li>
                                                </ul>
                                            </li>
                                            <li className="footer">
                                                <Link to='/notification' replace>
                                                <FormattedMessage {...messages.viewAll}/>
                                                </Link>
                                            </li>
                                        </React.Fragment>
                                    }
                                </ul>
                            </li>
                            <HeaderUser></HeaderUser>
                        </ul>
                    </div>
                </nav>
            </header>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        listNotify: state.listNotify,
        language: state.language
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onChangeLanguage: (type) => {
            dispatch(actChangeLanguage(type));
            dispatch(actChangePage());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);