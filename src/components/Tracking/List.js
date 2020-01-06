import React, { Component } from 'react';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import { Table, Col, Row, Icon, Timeline, Tabs, Typography, Tag, Badge } from 'antd';
import { trackTables_EN, trackTables_VI } from './../../constants/constants';

const { Text } = Typography;
const TabPane = Tabs.TabPane;

const messages = defineMessages({
    vnpost: {
        id: 'Tracking.Table.VnPost.title',
        defaultMessage: 'VnPost/ Status',
    },
    origin: {
        id: 'Tracking.Table.OriginName.title',
        defaultMessage: 'Origin Country/ Post Name',
    },
    destination: {
        id: 'Tracking.Table.DestName.title',
        defaultMessage: 'Destination Country/ Post Name',
    },
    status: {
        id: 'Tracking.Table.Status.title',
        defaultMessage: 'Status',
    },
    searchTitle: {
        id: 'Genaral.Table.SearchTable.title',
        defaultMessage: 'Search Result',
    },
    originContent: {
        id: 'Tracking.Table.OriginContent.title',
        defaultMessage: 'Origin',
    },
    destContent: {
        id: 'Tracking.Table.DestContent.title',
        defaultMessage: 'Destination',
    },
    paginationTextOf: {
        id: 'Genaral.PaginationText.of',
        defaultMessage: 'of',
    },
    paginationTextItem: {
        id: 'Genaral.PaginationText.item',
        defaultMessage: 'item',
    },
});

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
        let { intl } = props;
        this.columns = [
            {
                title: `${intl.formatMessage(messages.vnpost)}`,
                dataIndex: 'vnpost_no',
                render: (text, record) => (
                    <React.Fragment>
                        {record.vnpost_no}&nbsp;
                        <Tag color={record.color}>{record.status_name}</Tag>
                    </React.Fragment>
                )
            }, {
                title: `${intl.formatMessage(messages.origin)}`,
                dataIndex: 'origin_country_name',
                render: (text, record) => (`${record.origin_country_name}/ ${record.origin_country_name} Post`)
            }, {
                title: `${intl.formatMessage(messages.destination)}`,
                dataIndex: 'destination_country_name',
                render: (text, record) => (`${record.destination_country_name}/ ${record.destination_country_name} Post`)
            }, {
                title: `${intl.formatMessage(messages.status)}`,
                dataIndex: 'list_transit',
                render: (text, record) => (
                    `${record.list_transit.length > 0 ? record.list_transit[0].date ? record.list_transit[0].date + ' - ' : '' : ''}${record.list_transit.length > 0 ? record.list_transit[0].status_name ? record.list_transit[0].status_name : '' : ''}`
                )
            }
        ];
    }

    componentDidMount() {
        let { query, onChangeQuery } = this.props;
        query.search_status_id = '';
        onChangeQuery(query);
        this.fetch();
    }

    handleTableChange = (pagination) => {
        let { query, onChangeQuery } = this.props;
        query.page_size = pagination.pageSize;
        query.page = pagination.current;
        onChangeQuery(query);
        this.fetch();
    }

    onChangeTab = (key) => {
        let { query, onChangeQuery } = this.props;
        if (key == 0) {
            query.search_status_id = '';
        } else if (key == 1) {
            query.search_status_id = '1,2,3';
        } else if (key == 2) {
            query.search_status_id = '4,5,6';
        } else if (key == 3) {
            query.search_status_id = '7,8';
        } else if (key == 4) {
            query.search_status_id = '9,10,11';
        } else if (key == 5) {
            query.search_status_id = '12';
        }
        query.page_size = 10;
        query.page = 1;
        onChangeQuery(query);
        this.fetch();
    }

    fetch = () => {
        let { query, onSearch, language } = this.props;
        onSearch(query, true, language);
        onSearch(query, false, language);
    }

    render() {
        const { data, query, trackingCount } = this.props;

        return (
            <Row gutter={24}>
                <Col lg={{ span: 24 }} className="gutter-row">
                    <div className="gutter-box">
                        <div className="box">
                            <div className="box-body">
                                {this.showData(data, query, trackingCount)}
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        );
    }

    showData = (source, query, trackingCount) => {
        let { intl, language } = this.props;
        let xhtml = null;
        let trackTables = language == 'en' ? trackTables_EN : trackTables_VI;
        xhtml = trackTables.map(item => {
            item.count = 0;
            if (Object.keys(trackingCount).length > 0) {
                if (item.key == 0) {
                    item.count = trackingCount.count_all;
                } else if (item.key == 1) {
                    item.count = trackingCount.count_booking;
                } else if (item.key == 2) {
                    item.count = trackingCount.count_truck_transit;
                } else if (item.key == 3) {
                    item.count = trackingCount.count_flying;
                } else if (item.key == 4) {
                    item.count = trackingCount.count_dest_country;
                } else if (item.key == 5) {
                    item.count = trackingCount.count_delivered;
                }
            }
            return (
                <TabPane
                    tab={<Badge count={item.count} style={{ backgroundColor: '#bae7ff' }} overflowCount={999999}>
                        <a style={{ color: item.color, lineHeight: 30 + 'px' }}>
                            <span className={`iconfont ${item.icon}`} style={{ color: item.color }}></span> {item.name}
                        </a>
                    </Badge>
                    } key={item.key}>
                    <Table
                        size="default"
                        bordered={true}
                        columns={this.columns}
                        rowKey={record => record.key}
                        dataSource={source}
                        loading={query.loading}
                        scroll={{ x: 767 }}
                        expandRowByClick={true}
                        onChange={this.handleTableChange}
                        expandedRowRender={record => this.showDetail(record)}
                        title={() => `${intl.formatMessage(messages.searchTitle)}`}
                        pagination={{
                            showSizeChanger: true,
                            showQuickJumper: true,
                            total: query.total,
                            current: query.page,
                            pageSize: query.page_size,
                            showTotal: (total, range) => `${range[0]} - ${range[1]} ${intl.formatMessage(messages.paginationTextOf)} ${total} ${intl.formatMessage(messages.paginationTextItem)}`,
                        }}
                    />
                </TabPane>
            );
        });
        return <Tabs defaultActiveKey="0" onChange={(key) => this.onChangeTab(key)}>{xhtml}</Tabs>;
    }

    showDetail = (record) => {
        let xhtml = null, rs = null;
        if (record.list_transit.length > 0) {
            xhtml = record.list_transit.map((item, index) => {
                if (index === 0) {
                    return (
                        <Timeline.Item key={index} dot={<Icon type="clock-circle-o" />} >
                            <Text strong>
                                <span style={{ marginRight: 20 + 'px' }}>{item.date}</span>{`${item.status_name ? item.status_name : ''} - ${item.status_description ? item.status_description : ''}`}
                            </Text>
                        </Timeline.Item>
                    )
                } else {
                    return (
                        <Timeline.Item key={index} dot={<Icon type="check-circle" style={{ color: '#52c41a' }} />}>
                            <Text>
                                <span style={{ marginRight: 25 + 'px' }}>{item.date}</span>{`${item.status_name ? item.status_name : ''} - ${item.status_description ? item.status_description : ''}`}
                            </Text>
                        </Timeline.Item>
                    )
                }
            });
        }
        rs = <React.Fragment>
            <Text className='d-block' style={{ marginBottom: '20px' }}>
                <FormattedMessage {...messages.destContent} />
                <Text strong>{record.destination_country_name}</Text>
            </Text>
            <Text className='d-block' style={{ marginBottom: '30px' }}>
                <FormattedMessage {...messages.originContent} />
                <Text strong>{record.origin_country_name}</Text>
            </Text>
            <Timeline>{xhtml}</Timeline>
        </React.Fragment>
        return rs;
    }
}
export default injectIntl(List);