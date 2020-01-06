import React, { Component } from 'react';
import { find } from 'lodash';
import { defineMessages, injectIntl } from 'react-intl';
import { Table, Col, Row, Icon, Tabs, Typography, Badge, Tooltip, Divider, message, Popconfirm } from 'antd';
import ModalForm from './ModalForm';
import { PPI_REPORT_URL } from './../../constants/Config';
import { transhipmentTables_EN, transhipmentTables_VI, initIdStatusCreatedByCustomer, 
    API_TYPE_GET, API_TYPE_DELETE, CREATED_BY_CUSTOMER } from './../../constants/constants';

const { Text } = Typography;
const TabPane = Tabs.TabPane;

const messages = defineMessages({
    searchTitle: {
        id: 'Genaral.Table.SearchTable.title',
        defaultMessage: 'Search Result',
    },
    orderNumber: {
        id: 'Transshipment.Table.OrderNumber.title',
        defaultMessage: 'Order Number',
    },
    vnPostNumber : {
        id: 'Transshipment.Table.VnpostNumber.title',
        defaultMessage: 'VNPost Number',
    },
    status: {
        id: 'Transshipment.Table.Status.title',
        defaultMessage: 'Status',
    },
    origin: {
        id: 'Transshipment.Table.Origin.title',
        defaultMessage: 'Status',
    },
    dest: {
        id: 'Transshipment.Table.Destination.title',
        defaultMessage: 'Status',
    },
    note: {
        id: 'Transshipment.Table.Note.title',
        defaultMessage: 'Status',
    },
    pickupDate: {
        id: 'Transshipment.Table.PickupDate.title',
        defaultMessage: 'Status',
    },
    createdDate: {
        id: 'Genaral.Table.CreatedDate.title',
        defaultMessage: 'Created Date',
    },
    action: {
        id: 'Genaral.Table.Action.title',
        defaultMessage: 'Action',
    },
    paginationTextOf: {
        id: 'Genaral.PaginationText.of',
        defaultMessage: 'of',
    },
    paginationTextItem: {
        id: 'Genaral.PaginationText.item',
        defaultMessage: 'item',
    },
    tooltipEdit: {
        id: 'Genaral.TooltipEdit.text',
        defaultMessage: 'Edit',
    },
    tooltipDelete: {
        id: 'Genaral.TooltipDelete.text',
        defaultMessage: 'Delete',
    },
    tooltipPrint: {
        id: 'Genaral.TooltipPrint.text',
        defaultMessage: 'Print',
    },
    loading: {
        id: 'Genaral.Loading.title',
        defaultMessage: 'Action in process....',
    },
    confirmDelete: {
        id: 'Genaral.ConfirmDelete.text',
        defaultMessage: 'Are you sure to delete?',
    }
});

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            link_print: ''
        }
        let { intl } = props;
        this.columns = [
            {
                title: '#',
                align: 'center',
                dataIndex: 'idc',
                width: 20,
            }, {
                title: `${intl.formatMessage(messages.orderNumber)}`,
                dataIndex: 'order_no',
            }, {
                title: `${intl.formatMessage(messages.vnPostNumber)}`,
                dataIndex: 'vnpost_no',
            }, {
                title: `${intl.formatMessage(messages.status)}`,
                dataIndex: 'status_name',
            }, {
                title: `${intl.formatMessage(messages.origin)}`,
                dataIndex: 'origin_country_name',
            }, {
                title: `${intl.formatMessage(messages.dest)}`,
                dataIndex: 'destination_country_name',
            }, {
                title: `${intl.formatMessage(messages.note)}`,
                dataIndex: 'item_content',
            }, {
                title: `${intl.formatMessage(messages.pickupDate)}`,
                dataIndex: 'actual_date_of_pickup',
            }, {
                title: `${intl.formatMessage(messages.createdDate)}`,
                dataIndex: 'create_date',
            }, {
                title: `${intl.formatMessage(messages.action)}`,
                fixed: 'right',
                key: 'action',
                width: 110,
                align: 'center',
                render: record => this.showTableAction(record),
            }
        ];
    }

    componentDidMount() {
        this.fetch();
    }

    showTableAction = (record) => {
        const { intl, language } = this.props;
        let { link_print } = this.state;
        return <span>
            <a href="javascript:;" onClick={() => this.onEdit(record.key)}>
                <Tooltip placement="top" title={`${intl.formatMessage(messages.tooltipEdit)}`}>
                    <Text type="warning">
                        <Icon type="edit" />
                    </Text>
                </Tooltip>
            </a><Divider type="vertical" />
            {record && record.status_value == CREATED_BY_CUSTOMER ?
                <React.Fragment>
                    <a href="javascript:;">
                        <Popconfirm title={intl.formatMessage(messages.confirmDelete)} onConfirm={() => this.props.onGetDeleteRequest(API_TYPE_DELETE, record.key, this.props.query, message.loading(`${intl.formatMessage(messages.loading)}`, 0), language)}>
                            <Tooltip placement="bottom" title={`${intl.formatMessage(messages.tooltipDelete)}`}>
                                <Text type="danger">
                                    <Icon type="delete" />
                                </Text>
                            </Tooltip>
                        </Popconfirm>
                    </a>
                    <Divider type="vertical" />
                </React.Fragment> : null}
            <a href={link_print} onClick={() => this.onPrint(record.key)} target="_blank">
                <Tooltip placement="top" title={`${intl.formatMessage(messages.tooltipPrint)}`}>
                    <Icon type="printer" />
                </Tooltip>
            </a>
        </span >
    }

    onChangeTab = (key) => {
        let { query, onChangeQuery } = this.props;
        if (key == 0) {
            query.search_status_id = initIdStatusCreatedByCustomer;
        } else if (key == 1) {
            query.search_status_id = '1,2';
        } else if (key == 2) {
            query.search_status_id = '3';
        } else if (key == 3) {
            query.search_status_id = '4';
        } else if (key == 4) {
            query.search_status_id = '5';
        } else if (key == 5) {
            query.search_status_id = '6';
        } else if (key == 6) {
            query.search_status_id = '7,8';
        } else if (key == 7) {
            query.search_status_id = '9';
        } else if (key == 8) {
            query.search_status_id = '10,11';
        } else if (key == 9) {
            query.search_status_id = '12';
        }
        query.page_size = 10;
        query.page = 1;
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

    showModal = (visible) => {
        this.setState({ visible });
    }

    onEdit = (key) => {
        const { intl, language } = this.props;
        const hide = message.loading(`${intl.formatMessage(messages.loading)}`, 0);
        this.props.onGetDeleteRequest(API_TYPE_GET, key, {}, hide, language);
    }

    onPrint = (key) => {
        let data = find(this.props.data, { key: key });
        if (data && data.key) {
            let params = 'order_no=' + (data.order_no ? data.order_no : '') + '&vnpost_no=' + (data.vnpost_no ? data.vnpost_no : '')
                + '&sender_id=' + (data.sender_id ? data.sender_id : '') + '&destination_country=' + (data.destination_country_name ? data.destination_country_name : '')
                + '&actual_date_of_pickup=' + (data.actual_date_of_pickup ? data.actual_date_of_pickup : '')
                + '&actual_date_of_delivery=' + (data.actual_date_of_delivery ? data.actual_date_of_delivery : '')
                + '&origin_country=' + (data.origin_country_name ? data.origin_country_name : '') + '&item_content=' + (data.item_content ? data.item_content : '')
                + '&receiver_name=' + (data.receiver_name ? data.receiver_name : '') + '&receiver_address=' + (data.receiver_address ? data.receiver_address : '')
                + '&receiver_phone=' + (data.receiver_phone ? data.receiver_phone : '')
                + '&weight=' + (data.weight ? data.weight : '') + '&declared_value=' + (data.declared_value ? data.declared_value : '');
            let url_pirnt = PPI_REPORT_URL + params;
            this.setState({
                link_print: url_pirnt
            });
        }
    }

    fetch = () => {
        let { query, onSearch, language } = this.props;
        onSearch(query, true, language);
        onSearch(query, false, language);
    }

    render() {
        const { data, query, order, orderCount, lstBranch, lstCountry, lstManifest, lstStatus, lstFee,
            onChangeQuery, onAddUpdateItem, onResetItem, onUpdateItem, language } = this.props;
        return (
            <Row gutter={24}>
                <Col lg={{ span: 24 }} className="gutter-row">
                    <div className="gutter-box">
                        <div className="box">
                            <div className="box-body">
                                <ModalForm
                                    order={order}
                                    lstFee={lstFee}
                                    lstBranch={lstBranch}
                                    lstStatus={lstStatus}
                                    lstCountry={lstCountry}
                                    lstManifest={lstManifest}
                                    query={query}
                                    visible={this.state.visible}
                                    onChangeQuery={onChangeQuery}
                                    onAddUpdateItem={onAddUpdateItem}
                                    showModal={this.showModal}
                                    onResetItem={onResetItem}
                                    onUpdateItem={onUpdateItem}
                                    language={language}
                                />
                                {this.showTables(data, query, orderCount)}
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        );
    }

    showTables = (source, query, orderCount) => {
        let xhtml = null;
        const { intl, language } = this.props;
        let tables = language == 'en' ? transhipmentTables_EN : transhipmentTables_VI;
        
        xhtml = tables.map(item => {
            item.count = 0;
            let count_1_2 = 0, count_7_8 = 0, count_10_11 = 0;
            if (orderCount.length > 0) {
                orderCount.map(obj => {
                    if (item.key == 0 && obj.status_id && obj.status_id == initIdStatusCreatedByCustomer) {
                        item.count = obj.count;
                    } else if (item.key == 1 && obj.status_id && (obj.status_id == '1' || obj.status_id == '2')) {
                        item.count = count_1_2 + obj.count;
                    } else if (item.key == 2 && obj.status_id && obj.status_id == '3') {
                        item.count = obj.count;
                    } else if (item.key == 3 && obj.status_id && obj.status_id == '4') {
                        item.count = obj.count;
                    } else if (item.key == 4 && obj.status_id && obj.status_id == '5') {
                        item.count = obj.count;
                    } else if (item.key == 5 && obj.status_id && obj.status_id == '6') {
                        item.count = obj.count;
                    } else if (item.key == 6 && obj.status_id && (obj.status_id == '7' || obj.status_id == '8')) {
                        item.count = count_7_8 + obj.count;
                    } else if (item.key == 7 && obj.status_id && obj.status_id == '9') {
                        item.count = obj.count;
                    } else if (item.key == 8 && obj.status_id && (obj.status_id == '10' || obj.status_id == '11')) {
                        item.count = count_10_11 + obj.count;
                    } else if (item.key == 9 && obj.status_id && obj.status_id == '12') {
                        item.count = obj.count;
                    }
                });
            }
            return (
                <TabPane
                    tab={<Badge count={item.count} style={{ backgroundColor: '#bae7ff' }} overflowCount={999999}>
                        <a style={{ color: item.color, lineHeight: 30 + 'px' }}>{item.name}</a>
                    </Badge>
                    } key={item.key}>
                    <Table
                        size="default"
                        bordered={true}
                        columns={this.columns}
                        rowKey={record => record.idc}
                        dataSource={source}
                        loading={query.loading}
                        onChange={this.handleTableChange}
                        scroll={{ x: 1300 }}
                        title={() => intl.formatMessage(messages.searchTitle)}
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
}
export default injectIntl(List);