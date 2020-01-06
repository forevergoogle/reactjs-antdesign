import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import { defineMessages, injectIntl } from 'react-intl';
import { Table, Col, Row, Divider, Icon, Tooltip, Popconfirm, Typography, message } from 'antd';
import ModalForm from './ModalForm';
import { actGetExportRequest } from '../../actions/manifest';
import { API_TYPE_DELETE, API_TYPE_GET, listCustomerManifest, PUBLISH_MANIFEST } from './../../constants/constants';

const { Text } = Typography;

const messages = defineMessages({
    searchTitle: {
        id: 'Genaral.Table.SearchTable.title',
        defaultMessage: 'Search Result',
    },
    manifestNumber: {
        id: 'Manifest.Table.ManifestNumber.title',
        defaultMessage: 'Manifest Number',
    },
    statusId: {
        id: 'Manifest.Table.StatusId.title',
        defaultMessage: 'Status'
    },
    totalOrder: {
        id: 'Manifest.Table.TotalOrder.title',
        defaultMessage: 'Total Orders',
    },
    grossWeight: {
        id: 'Manifest.Table.GrossWeight.title',
        defaultMessage: 'Gross Weight (Kg)',
    },
    totalPCS: {
        id: 'Manifest.Table.TotalPCS.title',
        defaultMessage: 'Total PCS',
    },
    note: {
        id: 'Manifest.Table.Note.title',
        defaultMessage: 'Note',
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
    tooltipImport: {
        id: 'Genaral.TooltipImport.text',
        defaultMessage: 'Import',
    },
    tooltipExport: {
        id: 'Genaral.TooltipExport.text',
        defaultMessage: 'Export',
    },    loading: {
        id: 'Genaral.Loading.title',
        defaultMessage: 'Action in process....',
    },
    confirmDelete: {
        id: 'Genaral.ConfirmDelete.text',
        defaultMessage: 'Are you sure to delete?',
    },
    confirmExport: {
        id: 'Genaral.ConfirmExport.text',
        defaultMessage: 'Manifest not bagging, Do you want to export file?',
    }
});

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            checkExport:false
        }
        let { intl, language } = props;
        this.columns = [
            {
                title: '#',
                align: 'center',
                dataIndex: 'idc',
                width: 20,
            }, {
                title: `${intl.formatMessage(messages.manifestNumber)}`,
                dataIndex: 'manifest_number',
            }, {
                title: `${intl.formatMessage(messages.statusId)}`,
                dataIndex: 'status_id',
            }, {
                title: `${intl.formatMessage(messages.totalOrder)}`,
                align: 'right',
                dataIndex: 'order_count',
                render: (text, record) => (
                    <NumberFormat
                        value={record.order_count}
                        displayType={'text'}
                        thousandSeparator={true}
                        decimalScale={0}
                        fixedDecimalScale={true}
                        renderText={value => <div>{value}</div>}
                    />)
            }, {
                title: `${intl.formatMessage(messages.grossWeight)}`,
                align: 'right',
                dataIndex: 'gross_weight',
                render: (text, record) => (
                    <NumberFormat
                        value={record.gross_weight}
                        displayType={'text'}
                        thousandSeparator={true}
                        decimalScale={3}
                        fixedDecimalScale={true}
                        renderText={value => <div>{value}</div>}
                    />)
            }, {
                title: `${intl.formatMessage(messages.totalPCS)}`,
                align: 'right',
                dataIndex: 'pcs',
                render: (text, record) => (
                    <NumberFormat
                        value={record.pcs}
                        displayType={'text'}
                        thousandSeparator={true}
                        decimalScale={0}
                        fixedDecimalScale={true}
                        renderText={value => <div>{value}</div>}
                    />)
            }, {
                title: `${intl.formatMessage(messages.note)}`,
                dataIndex: 'note',
            }, {
                title: `${intl.formatMessage(messages.createdDate)}`,
                dataIndex: 'create_date',
            }, {
                title: `${intl.formatMessage(messages.action)}`,
                align: 'center',
                fixed: 'right',
                key: 'action',
                width: 140,
                render: (text, record) => (
                    <span>
                        <a href="javascript:;" onClick={() => this.onEdit(record.key)}>
                            <Tooltip placement="top" title={`${intl.formatMessage(messages.tooltipEdit)}`}>
                                <Text type="warning">
                                    <Icon type="edit" />
                                </Text>
                            </Tooltip>
                        </a>
                        <Divider type="vertical" />
                        {record && record.status_id == PUBLISH_MANIFEST ? null : 
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
                        </React.Fragment>
                        }
                        {
                            !record.attactment_link ?
                                <Link to={'/order/import/' + record.key}>
                                    <Tooltip placement="top" title={`${intl.formatMessage(messages.tooltipImport)}`}>
                                        <Icon type="upload" />
                                    </Tooltip>
                                </Link> :
                                <Link to='' disabled>
                                    <Tooltip placement="top" title={"Imported"}>
                                        <Icon type="upload" />
                                    </Tooltip>
                                </Link>
                        }
                        <Divider type="vertical" />

                        {record && record.flag_export == 0 ?
                            <a href="javascript:;" onClick={() => this.exportManifest(record.key)}>
                                <Tooltip placement="top" title={`${intl.formatMessage(messages.tooltipExport)}`}>
                                    <Text type="warning">
                                        <Icon type="export"/>
                                    </Text>
                                </Tooltip>
                            </a>
                            :
                            <React.Fragment>
                                <a href="javascript:;">
                                    <Popconfirm title={intl.formatMessage(messages.confirmExport)} onConfirm={() => this.exportManifest(record.key)}>
                                        <Tooltip placement="bottom" title={`${intl.formatMessage(messages.tooltipExport)}`}>
                                            <Text type="warning">
                                                <Icon type="export"/>
                                            </Text>
                                        </Tooltip>
                                    </Popconfirm>
                                </a>
                                <Divider type="vertical" />
                            </React.Fragment>
                        }
                    </span >
                ),
            }
        ];
    }

    componentDidMount() {
        this.fetch();

    }
    exportManifest = (id) => {
        let { query, onExportManifest, language } = this.props;
        onExportManifest(id, query, language);



    }
    handleTableChange = (pagination) => {
        let { query, onChangeQuery } = this.props;
        query.page_size = pagination.pageSize;
        query.page = pagination.current;
        onChangeQuery(query);
        this.fetch();
    }

    fetch = () => {
        let { query, onSearch, language } = this.props;
        onSearch(query, language);
    }

    showModal = (visible) => {
        this.setState({ visible });
    }

    onEdit = (key) => {
        const { intl, language } = this.props;
        const hide = message.loading(`${intl.formatMessage(messages.loading)}`, 0);
        this.props.onGetDeleteRequest(API_TYPE_GET, key, {}, hide, language);
    }

    setNameForStatus = (data) => {
        for(let i= 0 ; i< data.length; i++){
            if(data[i].status_id === 1){
                data[i].status_id = listCustomerManifest[0].label;
            }else if (data[i].status_id === 2){
                data[i].status_id = listCustomerManifest[1].label;
            }
        }
    }
    
    render() {
        const { lstBranch, data, query, manifest, onAddUpdateItem, onChangeQuery, onResetItem, intl, language } = this.props;
        this.setNameForStatus(data);
        return (
            <Row gutter={24}>
                <Col lg={{ span: 24 }} className="gutter-row">
                    <div className="gutter-box">
                        <div className="box">
                            <div className="box-body">
                                <ModalForm
                                    manifest={manifest}
                                    lstBranch={lstBranch}
                                    query={query}
                                    visible={this.state.visible}
                                    onChangeQuery={onChangeQuery}
                                    onAddUpdateItem={onAddUpdateItem}
                                    showModal={this.showModal}
                                    onResetItem={onResetItem}
                                    language={language}
                                />
                                <Table
                                    size="default"
                                    bordered={true}
                                    columns={this.columns}
                                    rowKey={record => record.idc}
                                    dataSource={data}
                                    loading={query.loading}
                                    onChange={this.handleTableChange}
                                    scroll={{ x: 1300 }}
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
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        );
    }
}
export default injectIntl(List);