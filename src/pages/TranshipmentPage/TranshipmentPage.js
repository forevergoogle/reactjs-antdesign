import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Icon, Typography } from 'antd';
import { FormattedMessage, defineMessages } from 'react-intl';
import SearchContainer from '../../containers/Transhipment/SearchContainer';
import ListContainer from '../../containers/Transhipment/ListContainer';

const { Title } = Typography;
const messages = defineMessages({
    title: {
        id: 'Transshipment.Page.title',
        defaultMessage: 'Transshipment',
    },
    level2: {
        id: 'Transshipment.PageBreadcrumb.level2',
        defaultMessage: 'Order',
    },
    level3: {
        id: 'Transshipment.PageBreadcrumb.level3',
        defaultMessage: 'Transshipment',
    },
});
class TranshipmentPage extends Component {

    render() {
        let { lstBranch, lstCountry, lstManifest, lstShipper, lstStatus, lstFee } = this.props;

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
                    <SearchContainer
                        lstStatus={lstStatus}
                        lstBranch={lstBranch}
                        lstCountry={lstCountry}
                        lstManifest={lstManifest}
                        lstShipper={lstShipper}
                    />
                    <ListContainer
                        lstFee={lstFee}
                        lstBranch={lstBranch}
                        lstStatus={lstStatus}
                        lstCountry={lstCountry}
                        lstManifest={lstManifest}
                    />
                </section>
            </div>
        );
    }
}

export default TranshipmentPage;
