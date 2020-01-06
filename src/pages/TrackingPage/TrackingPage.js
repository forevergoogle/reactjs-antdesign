import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Icon, Typography } from 'antd';
import { FormattedMessage, defineMessages } from 'react-intl';
import SearchContainer from '../../containers/Tracking/SearchContainer';
import ListContainer from '../../containers/Tracking/ListContainer';

const { Title } = Typography;
const messages = defineMessages({
    title: {
        id: 'Tracking.Page.title',
        defaultMessage: 'Tracking',
    },
    level2: {
        id: 'Tracking.PageBreadcrumb.level2',
        defaultMessage: 'Order',
    },
    level3: {
        id: 'Tracking.PageBreadcrumb.level3',
        defaultMessage: 'Tracking',
    },
});
class TrackingPage extends Component {

    render() {
        let { lstBranch, lstCountry, lstManifest, lstShipper, lstStatus } = this.props;

        return (
            <div className="content-wrapper min-height-home-page" >
                <section className="content-header clearfix">
                    <Title level={2} className="pull-left"><FormattedMessage {...messages.title} /></Title>
                    <Breadcrumb className="text-right">
                        <Breadcrumb.Item>
                            <Link to="/">
                                <Icon type="home" />
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to="/operation">
                                <Icon type="setting" />
                                <span> <FormattedMessage {...messages.level2} /></span>
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <FormattedMessage {...messages.level3} />
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </section>
                <section className="content">
                    <SearchContainer
                        lstBranch={lstBranch}
                        lstCountry={lstCountry}
                        lstManifest={lstManifest}
                        lstShipper={lstShipper}
                        lstStatus={lstStatus}
                    />
                    <ListContainer
                        lstBranch={lstBranch}
                    />
                </section>
            </div>
        );
    }
}

export default TrackingPage;
