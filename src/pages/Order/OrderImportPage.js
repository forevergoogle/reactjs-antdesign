import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Icon, Typography } from 'antd';
import { FormattedMessage, defineMessages } from 'react-intl';
import ImportContainer from '../../containers/Order/ImportContainer';
import List from '../../components/Order/Import/List';

const { Title } = Typography;

const messages = defineMessages({
    title: {
        id: 'OrderImport.Page.title',
        defaultMessage: 'Import',
    },
    level2: {
        id: 'OrderImport.PageBreadcrumb.level2',
        defaultMessage: 'Order',
    },
    level3: {
        id: 'OrderImport.PageBreadcrumb.level3',
        defaultMessage: 'Order Import',
    },
});

class OrderImportPage extends Component {

    render() {
        let { lstManifest, orderImport, onFetchList, onFetchImport } = this.props;

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
                            <Link to="/order">
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
                    <ImportContainer lstManifest={lstManifest} onFetchList={onFetchList} onFetchImport={onFetchImport} />
                    <List orderImport={orderImport} onFetchImport={onFetchImport} />
                </section>
            </div>
        );
    }
}

export default OrderImportPage;
