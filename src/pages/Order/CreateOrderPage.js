import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Icon, Typography } from 'antd';
import { FormattedMessage, defineMessages } from 'react-intl';
import CreateContainer from '../../containers/Order/CreateContainer';
// import ListContainer from '../../containers/Manifest/ListContainer';

const { Title } = Typography;

const messages = defineMessages({
    title: {
        id: 'CreateOrder.Page.title',
        defaultMessage: 'Create Order',
    },
    level2: {
        id: 'CreateOrder.PageBreadcrumb.level2',
        defaultMessage: 'Order',
    },
    level3: {
        id: 'CreateOrder.PageBreadcrumb.level3',
        defaultMessage: 'Create Order',
    },
});

class CreateOrderPage extends Component {

    render() {
        let { lstStatus, lstCountry, lstManifest, lstManifestImport , id} = this.props;

        return (
            <div className="content-wrapper min-height-home-page">
                    <section className="content-header clearfix">
                        <Title level={2} className="pull-left"><FormattedMessage {...messages.title} /></Title>
                        <Breadcrumb className="text-right">
                            <Breadcrumb.Item>
                                <Link to="/">
                                    <Icon type="home" />
                                </Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <Icon type="profile" />
                                <span> <FormattedMessage {...messages.level2} /></span>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <Icon type="profile" />
                                <span> <FormattedMessage {...messages.level3} /></span>
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </section>
                    <section className="content">
                       <CreateContainer
                            lstStatus={lstStatus}
                            lstCountry={lstCountry}
                            lstManifest={lstManifest}
                            lstManifestImport={lstManifestImport}
                            id={id}
                        />
                    </section>
            </div>
        );
    }
}

export default CreateOrderPage;
