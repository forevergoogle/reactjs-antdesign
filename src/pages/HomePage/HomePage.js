import React, { Component } from 'react';
import { Breadcrumb, Icon, Typography } from 'antd';
import { FormattedMessage, defineMessages } from 'react-intl';
import DashBoardContainer from '../../containers/Dashboard/DashboardContainer';
const { Title } = Typography;

const messages = defineMessages({
    dashboard: {
        id: 'Dashboard.Page.title',
        defaultMessage: 'Dashboard',
    }
});

class HomePage extends Component {
    render() {
        return (
            <div className="content-wrapper min-height-home-page" >
                <section className="content-header clearfix">
                    <Title level={2} className="pull-left"><FormattedMessage {...messages.dashboard}/></Title>
                    <Breadcrumb className="text-right">
                        <Breadcrumb.Item>
                                <Icon type="home" />
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </section>
                <section className="content">
                    <DashBoardContainer></DashBoardContainer>
                </section>
            </div>
        );
    }
}

export default HomePage;
