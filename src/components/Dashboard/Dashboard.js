import React, { Component } from 'react';
import NumberFormat from 'react-number-format';
import { Table, Col, Row } from 'antd';
import { defineMessages, injectIntl } from 'react-intl';

const messages = defineMessages({
    transportModel: {
        id: 'Dashboard.Table.TransportModel.title',
        defaultMessage: 'Transport Model',
    },
    processing: {
        id: 'Dashboard.Table.Processing.title',
        defaultMessage: 'Processing',
    },
    done: {
        id: 'Dashboard.Table.Done.title',
        defaultMessage: 'Done',
    },
    canceled: {
        id: 'Dashboard.Table.Canceled.title',
        defaultMessage: 'Canceled',
    },
    total: {
        id: 'Dashboard.Table.Total.title',
        defaultMessage: 'Total',
    },
    transportFee: {
        id: 'Dashboard.Table.TransportFee.title',
        defaultMessage: 'Transport Fee',
    }
});

class Dashboard extends Component {
    //test
    constructor(props) {
        super(props);
        this.state = {
            pagination: null
        }
        let { intl } = props;
        this.columns = [{
            title: `${intl.formatMessage(messages.transportModel)}`,
            dataIndex: 'transportModel'
        }, {
            title: `${intl.formatMessage(messages.processing)}`,
            align: 'right',
            dataIndex: 'total_orders_processing',
            render: (text, record) => (
                <NumberFormat
                    value={record.total_orders_processing}
                    displayType={'text'}
                    thousandSeparator={true}
                    decimalScale={0}
                    fixedDecimalScale={true}
                    renderText={value => <div>{value}</div>}
                />
            )
        }, {
            title: `${intl.formatMessage(messages.done)}`,
            align: 'right',
            dataIndex: 'total_orders_closed',
            render: (text, record) => (
                <NumberFormat
                    value={record.total_orders_closed}
                    displayType={'text'}
                    thousandSeparator={true}
                    decimalScale={0}
                    fixedDecimalScale={true}
                    renderText={value => <div>{value}</div>}
                />
            )
        }, {
            title: `${intl.formatMessage(messages.canceled)}`,
            align: 'right',
            dataIndex: 'total_orders_canceled',
            render: (text, record) => (
                <NumberFormat
                    value={record.total_orders_canceled}
                    displayType={'text'}
                    thousandSeparator={true}
                    decimalScale={0}
                    fixedDecimalScale={true}
                    renderText={value => <div>{value}</div>}
                />
            )
        }, {
            title: `${intl.formatMessage(messages.total)}`,
            align: 'right',
            dataIndex: 'total_orders',
            render: (text, record) => (
                <NumberFormat
                    value={record.total_orders}
                    displayType={'text'}
                    thousandSeparator={true}
                    decimalScale={0}
                    fixedDecimalScale={true}
                    renderText={value => <div>{value}</div>}
                />
            )
        }, {
            title: `${intl.formatMessage(messages.transportFee)}`,
            align: 'right',
            dataIndex: 'transport_fee',
            render: (text, record) => (
                <NumberFormat
                    value={record.transport_fee}
                    displayType={'text'}
                    thousandSeparator={true}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    renderText={value => <div>{value}</div>}
                />
            )
        },
        ];
    }

    render() {
        const { rs } = this.props;
        return (
            <Row gutter={24}>
                <Col lg={{ span: 24 }} className="gutter-row">
                    <div className="gutter-box">
                        <div className="box">
                            <div className="box-body">
                                <Table
                                    bordered={true}
                                    loading={rs.loading}
                                    columns={this.columns}
                                    pagination={false}
                                    dataSource={rs.data} 
                                    scroll={{ x: 768 }}/>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        );
    }
}

export default injectIntl(Dashboard);