import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Icon, Typography } from 'antd';
import { FormattedMessage, defineMessages } from 'react-intl';
import SearchContainer from '../../containers/Manifest/SearchContainer';
import ListContainer from '../../containers/Manifest/ListContainer';

const { Title } = Typography;

const messages = defineMessages({
    title: {
        id: 'Manifest.Page.title',
        defaultMessage: 'Manifest',
    },
    level2: {
        id: 'Manifest.PageBreadcrumb.level2',
        defaultMessage: 'Manifest',
    },
});

class ManifestPage extends Component {

    render() {
        let { lstBranch } = this.props;

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
                        </Breadcrumb>
                    </section>
                    <section className="content">
                        <SearchContainer
                            lstBranch={lstBranch}
                        />
                        <ListContainer
                            lstBranch={lstBranch}
                        />
                    </section>
            </div>
        );
    }
}

export default ManifestPage;
