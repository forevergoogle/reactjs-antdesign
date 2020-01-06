import React, { Component } from 'react';
import { find } from 'lodash';
import { defineMessages, injectIntl } from 'react-intl';
import { Table, Col, Row, Icon, Tabs, Button, Typography, Badge, Tooltip, Divider, message, Popconfirm } from 'antd';
import {
    API_TYPE_GET, API_TYPE_DELETE, STATUS_ORDER_NEW, STATUS_MANIFEST_NEW, STATUS_ORDER_ERROR
} from './../../constants/constants';
import printJS from 'print-js';

const { Text } = Typography;

const messages = defineMessages({
    searchTitle: {
        id: 'Genaral.Table.SearchTable.title',
        defaultMessage: 'Search Result',
    },
    orderNumber: {
        id: 'Transshipment.Table.OrderNumber.title',
        defaultMessage: 'Order Number',
    },
    partnerNumber: {
        id: 'Transshipment.Table.PartnerNumber.title',
        defaultMessage: 'Partner Order No',
    },
    trackingNoNumber: {
        id: 'Transshipment.OrderTrackingNo.title',
        defaultMessage: 'Order Tracking No',
    },
    manifestNumber: {
        id: 'Transshipment.ManifestNumber.title',
        defaultMessage: 'Manifest Number',
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
    },
    errorTitle: {
        id: 'OrderList.Error.title',
        defaultMessage: 'Error',
    },
    errorBagTranshipment: {
        id: 'OrderList.ErrorBagTranshipment.message',
        defaultMessage: 'Item bagged',
    },
    errorManifest: {
        id: 'OrderList.ErrorErrorManifest.message',
        defaultMessage: 'Manifest must the same',
    },
    buttonBagging: {
        id: 'OrderList.ButtonBagging.title',
        defaultMessage: 'Bagging',
    }

});

class OrderList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            link_print: '',
            disabled: true,
            checkbtn: "hide"
        }
        this.handleTableChange = this.handleTableChange.bind(this);
        let { intl } = props;
    }

    componentDidMount() {
        const {data, query} = this.props;
        this.fetch();
    }

    showTableAction = (record) => {
        const { intl, language } = this.props;
        let { link_print } = this.state;

        return <span>
            <a href={"create/" + record.key}>
                <Tooltip placement="top" title={`${intl.formatMessage(messages.tooltipEdit)}`}>
                    <Text type="warning">
                        <Icon type="edit" />
                    </Text>
                </Tooltip>
            </a><Divider type="vertical" />
            {record && (record.status_id == STATUS_ORDER_NEW || record.status_id == STATUS_ORDER_ERROR) && record.manifest_status_id == STATUS_MANIFEST_NEW ?
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
               
             {/* <a onClick={()=> this.printLabel(record.label_base64)} > */}
            <a href={record.label_base64} download  target= "_blank" > 
                <Tooltip placement="top" title={`${intl.formatMessage(messages.tooltipPrint)}`}>
                    <Icon type="printer" />
                </Tooltip>
            </a>

        </span >
    }

    printLabel = (label) => {
        if(label) {
            printJS(label, 'image');
        }
    }

    handleTableChange = (pagination) => {
        let { query, onChangeQuery } = this.props;
        this.setState({disabled:false});
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

    fetch = () => {
        let { query, onSearch, language } = this.props;
        onSearch(query, true, language);
        onSearch(query, false, language);

    }

    handleSubmit = (e) => {
        let { query, onBagging, language } = this.props;

        e.preventDefault();
        let data = {
            list_order_no: query.order_no
        };

        onBagging(data,language);
        // this.fetch();
    }
    componentWillReceiveProps (nexProps){
        const { data, query } = nexProps;

        if(data && data.length > 0){
            let flag = false, errors = [], arrManifest = [], manifesst, flag1 = false;
            if(query.chk_bagging){
                data.map((item, index) => {
                    arrManifest.push(item.manifest_data_id);
                    if(item.bag_transhipment_id)
                        flag = true;
                });
                if(data.length > 1){
                    for (var i=0; i < arrManifest.length; i++) {
                        manifesst = arrManifest[i];
                        if (arrManifest.indexOf(manifesst) >= 0) {
                            flag1 = true;
                        }
                    }
                    if(!flag){
                        this.setState({disabled: false});
                        this.setState({checkbtn: "hide"});
                    }
                    else{
                        this.setState({disabled: true});
                        this.setState({checkbtn: "showError"});
                    }
                }
                if (!flag ){
                    this.setState({disabled: false});
                    this.setState({checkbtn: "hide"});
                }else{
                    this.setState({disabled: true});
                    this.setState({checkbtn: "showError"});
                }

            }else{
                this.setState({checkbtn: "hide"});
                this.setState({disabled: true});
            }

        }

    }

    showErrorItem = (text, record, column) => {
        let title = '', arrManifest = [], flag = false, manifest, flag1 = false;
        const { intl, language, data, query } = this.props;
        if(query.chk_bagging){
            if (record.bag_transhipment_id != null)
                title = `${intl.formatMessage(messages.errorBagTranshipment)}`;
            data.map((item, index) => {
                arrManifest.push(item.manifest_data_id);
            });
            if(data.length > 1){
                for (var i=0; i < arrManifest.length; i++) {
                    manifest = arrManifest[i];
                    if (arrManifest.indexOf(manifest) >= 0) {
                        flag1 = true;
                    }
                }
                if (!flag1) {
                    if (title != '')
                        title += ', ';
                    title += `${intl.formatMessage(messages.errorManifest)}`;
                }
            }
        }
        return <Text className="test-color">{title}</Text>;

    }

    render() {
        const { data, query, orderCount } = this.props;

        return (
            <Row gutter={24}>
                <Col lg={{ span: 24 }} className="gutter-row">
                    <div className="gutter-box">
                        <div className="box">
                            <div className="box-body">
                                {this.showTables(data, query, orderCount)}
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        );
    }

    showTables = (source, query, orderCount) => {
        const { intl, language } = this.props;
        const columns = [
            {
                title: '#',
                align: 'center',
                dataIndex: 'idc',
                width: 20,
            }, {
                title: `${intl.formatMessage(messages.orderNumber)}`,
                dataIndex: 'order_no',
            }, {
                title: `${intl.formatMessage(messages.partnerNumber)}`,
                dataIndex: 'partner_no',
            }, {
                title: `${intl.formatMessage(messages.trackingNoNumber)}`,
                dataIndex: 'tracking_no',
            },{
                title: `${intl.formatMessage(messages.manifestNumber)}`,
                dataIndex: 'manifest_number',
            },{
                title: `${intl.formatMessage(messages.status)}`,
                dataIndex: 'status_name',
            }, {
                title: `${intl.formatMessage(messages.origin)}`,
                dataIndex: 'origin_country_name',
            }, {
                title: `${intl.formatMessage(messages.dest)}`,
                dataIndex: 'destination_country_name'
            },
            {
                title: `${intl.formatMessage(messages.pickupDate)}`,
                dataIndex: 'actual_date_of_pickup',
            }, {
                title: `${intl.formatMessage(messages.createdDate)}`,
                dataIndex: 'create_date',
            },
            {
                title: `${intl.formatMessage(messages.errorTitle)}`,
                fixed: 'right',
                key: 'error',
                className: this.state.checkbtn,
                width: 110,
                align: 'center',
                render: (text, record) => this.showErrorItem(text, record, '9')
            },

            {
                title: `${intl.formatMessage(messages.action)}`,
                fixed: 'right',
                key: 'action',
                width: 110,
                align: 'center',
                render: record => this.showTableAction(record),
            }
        ];
        return (
            <div>
                <div className="box-footer">
                    <Row gutter={24}>
                        <Col xs={{ span: 24 }} className="gutter-row">
                            <div className="gutter-box">
                                <Button
                                    key="submit"
                                    htmlType="submit"
                                    type="primary"
                                    loading={query.loading}
                                    disabled={this.state.disabled}
                                    onClick={this.handleSubmit}
                                >
                                    {intl.formatMessage(messages.buttonBagging)}
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </div>
                <Table
                    size="default"
                    bordered={true}
                    columns={columns}
                    rowKey={record => record.idc}
                    dataSource={source}
                    loading={query.loading}
                    onChange={this.handleTableChange}

                    scroll={{ x: 1300 }}
                    pagination={{
                        showSizeChanger: true,
                        showQuickJumper: true,
                        total: query.total,
                        current: query.page,
                        pageSize: query.page_size,
                        showTotal: (total, range) => `${range[0]} - ${range[1]} ${intl.formatMessage(messages.paginationTextOf)} ${total} ${intl.formatMessage(messages.paginationTextItem)}`,
                    }}
                />
            </div>
        );
    }
}
export default injectIntl(OrderList);