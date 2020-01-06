import React, { Component } from 'react';
import { Table, Col, Row, Tag, Statistic, Card, Button, Icon, Typography } from 'antd';
import NumberFormat from 'react-number-format';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';

const { Text } = Typography;

const messages = defineMessages({
    trackingNo: {
        id: 'OrderImport.Table.TrackingNo.title',
        defaultMessage: 'ID of items',
    },
    originCountry: {
        id: 'OrderImport.Table.OriginCountryName.title',
        defaultMessage: 'Origin Country',
    },
    destinationCountry: {
        id: 'OrderImport.Table.DestCountryName.title',
        defaultMessage: 'Destination Country',
    },
    originSuburb: {
        id: 'OrderImport.Table.OriginSuburbName.title',
        defaultMessage: 'Origin Suburb',
    },
    destinationSuburb: {
        id: 'OrderImport.Table.DestSuburbName.title',
        defaultMessage: 'Destination Suburb',
    },
    originCity: {
        id: 'OrderImport.Table.OriginCityName.title',
        defaultMessage: 'Origin City',
    },
    destinationCity: {
        id: 'OrderImport.Table.DestCityName.title',
        defaultMessage: 'Destination City',
    },
    pickupAddress: {
        id: 'OrderImport.Table.PickupAddress.title',
        defaultMessage: 'Addresses of senders',
    },
    receiverBuildingName: {
        id: 'OrderImport.Table.ReceiverBuildingName.title',
        defaultMessage: 'Building name of recipients',
    },
    receiverName: {
        id: 'OrderImport.Table.ReceiverName.title',
        defaultMessage: 'Name of recipients',
    },
    receiverAddress: {
        id: 'OrderImport.Table.ReceiverAddress.title',
        defaultMessage: 'Addresses of recipients',
    },
    receiverContactName: {
        id: 'OrderImport.Table.ReceiverContactName.title',
        defaultMessage: 'Contact name of recipients',
    },
    receiverPhone: {
        id: 'OrderImport.Table.ReceiverPhone.title',
        defaultMessage: 'Phone of recipients',
    },
    receiverEmail: {
        id: 'OrderImport.Table.ReceiverEmail.title',
        defaultMessage: 'Email of recipients',
    },
    note: {
        id: 'OrderImport.Table.Note.title',
        defaultMessage: 'Note',
    },
    declaredValue: {
        id: 'OrderImport.Table.DeclareValue.title',
        defaultMessage: 'Declared value of contents',
    },
    originZipcode: {
        id: 'OrderImport.Table.OriginZipCode.title',
        defaultMessage: 'Origin ZipCode',
    },
    destZipcode: {
        id: 'OrderImport.Table.DestZipCode.title',
        defaultMessage: 'Destination ZipCode',
    },
    serviceType: {
        id: 'OrderImport.Table.ServiceType.title',
        defaultMessage: 'Service Type',
    },
    trackingType: {
        id: 'OrderImport.Table.TrackingType.title',
        defaultMessage: 'Tracking Type',
    },
    package: {
        id: 'OrderImport.Table.Package.title',
        defaultMessage: 'Package',
    },
    commodities: {
        id: 'OrderImport.Table.Commodity.title',
        defaultMessage: 'Commodities',
    },
    payment: {
        id: 'OrderImport.Table.Payment.title',
        defaultMessage: 'Payment method',
    },
    content: {
        id: 'OrderImport.Table.Content.title',
        defaultMessage: 'Content'
    },
    check: {
        id: 'OrderImport.Table.Check.title',
        defaultMessage: 'Check',
    },
    tableTitle: {
        id: 'OrderImport.Table.OrderTable.title',
        defaultMessage: 'Order List',
    },
    paginationTextOf: {
        id: 'Genaral.PaginationText.of',
        defaultMessage: 'of',
    },
    paginationTextItem: {
        id: 'Genaral.PaginationText.item',
        defaultMessage: 'item',
    },
    valid: {
        id: 'OrderImport.Table.Check.valid',
        defaultMessage: 'Valid',
    },
    inValid: {
        id: 'OrderImport.Table.Check.invalid',
        defaultMessage: 'In Valid',
    },
    ordersText: {
        id: 'OrderImport.Table.Check.ordertext',
        defaultMessage: 'Order(s)',
    },
    buttonTogglePackage: {
        id: 'OrderImport.Table.ButtonTogglePackage.title',
        defaultMessage: 'Show/Hide',
    },
    buttonToggleCommodity: {
        id: 'OrderImport.Table.ButtonToggleCommodity.title',
        defaultMessage: 'Show/Hide Commodity',
    },
    detail: {
        id: 'OrderImport.Icon.Detail.title',
        defaultMessage: 'Detail'
    }
});

class List extends Component {
    constructor(props) {
        super(props);
        let { intl } = props;
        this.columns = [
            {
                title: '#',
                dataIndex: 'stt',
                width: 20,
                align: 'center',
            }, {
                title: `${intl.formatMessage(messages.trackingNo)}`,
                dataIndex: 'tracking_no',
                render: (text, record, index) => this.showErrorItem(text, record, index,'0'),
            }, {
                title: `${intl.formatMessage(messages.originCountry)}`,
                dataIndex: 'origin_country',
                render: (text, record, index) => this.showErrorItem(text, record, index, '1'),
            }, {
                title: `${intl.formatMessage(messages.originCity)}`,
                dataIndex: 'origin_city',
                render: (text, record, index) => this.showErrorItem(text, record, index, '2'),
            }, {
                title: `${intl.formatMessage(messages.destinationCountry)}`,
                dataIndex: 'destination_country',
                render: (text, record, index) => this.showErrorItem(text, record, index, '3'),
            },{
                title: `${intl.formatMessage(messages.destinationSuburb)}`,
                dataIndex: 'destination_suburb',
                render: (text, record, index) => this.showErrorItem(text, record, index, '4'),
            }, {
                title: `${intl.formatMessage(messages.destinationCity)}`,
                dataIndex: 'destination_city',
                render: (text, record, index) => this.showErrorItem(text, record, index, '5'),
            }, {
                title: `${intl.formatMessage(messages.pickupAddress)}`,
                dataIndex: 'pickup_address',
                render: (text, record, index) => this.showErrorItem(text, record, index, '6'),
            }, {
                title: `${intl.formatMessage(messages.originZipcode)}`,
                dataIndex: 'origin_zipcode',
                render: (text, record, index) => this.showErrorItem(text, record, index, '7'),
            }, {
                title: `${intl.formatMessage(messages.receiverBuildingName)}`,
                dataIndex: 'receiver_building_name',
                render: (text, record, index) => this.showErrorItem(text, record, index, '8'),
            }, {
                title: `${intl.formatMessage(messages.receiverAddress)}`,
                dataIndex: 'receiver_address',
                render: (text, record, index) => this.showErrorItem(text, record, index, '9'),
            }, {
                title: `${intl.formatMessage(messages.receiverName)}`,
                dataIndex: 'receiver_name',
                render: (text, record, index) => this.showErrorItem(text, record, index, '10'),
            }, {
                title: `${intl.formatMessage(messages.receiverContactName)}`,
                dataIndex: 'receiver_contact_name',
                render: (text, record, index) => this.showErrorItem(text, record, index, '11'),
            }, {
                title: `${intl.formatMessage(messages.receiverPhone)}`,
                dataIndex: 'receiver_phone',
                render: (text, record, index) => this.showErrorItem(text, record, index, '12'),
            }, {
                title: `${intl.formatMessage(messages.receiverEmail)}`,
                dataIndex: 'receiver_email',
                render: (text, record, index) => this.showErrorItem(text, record, index, '13'),
            }, {
                title: `${intl.formatMessage(messages.destZipcode)}`,
                dataIndex: 'dest_zipcode',
                render: (text, record, index) => this.showErrorItem(text, record, index, '14'),
            }, {
                title: `${intl.formatMessage(messages.serviceType)}`,
                dataIndex: 'service_type',
                render: (text, record, index) => this.showErrorItem(text, record, index, '15'),
            }, {
                title: `${intl.formatMessage(messages.trackingType)}`,
                dataIndex: 'tracking_type',
                render: (text, record, index) => this.showErrorItem(text, record, index, '16'),
            }, {
                title: `${intl.formatMessage(messages.package)}`,
                dataIndex: 'package',
                width: 60,
                render: (text, record, index) => this.showErrorItem(text, record, index, '18,19,20,21,22'),
            }, {
                title: `${intl.formatMessage(messages.commodities)}`,
                dataIndex: 'commodities',
                width: 60,
                render: (text, record, index) => this.showErrorItem(text, record, index, '23,24,25,26'),
            }, {
                title: `${intl.formatMessage(messages.note)}`,
                dataIndex: 'note',
                render: (text, record, index) => this.showErrorItem(text, record, index, '28'),
            }, {
                title: `${intl.formatMessage(messages.payment)}`,
                dataIndex: 'payment_method',
                render: (text, record, index) => this.showErrorItem(text, record, index, '29'),
            }, {
                title: `${intl.formatMessage(messages.content)}`,
                dataIndex: 'content',
                render: (text, record, index) => this.showErrorItem(text, record, index, '30'),
            }, {
                title: `${intl.formatMessage(messages.check)}`,
                fixed: 'right',
                width: 80,
                dataIndex: 'check',
                render: record => this.showCheck(record)    ,
            }
        ];

        this.state = {
            displayIndex: null,
            display: 'none',
            type: 1,
        };
    }

    showCheck = (record) => {
        let xhtml = null;
        if (record) {
            xhtml = <Tag color='#87d068'>
                <FormattedMessage {...messages.valid} />
            </Tag>;
        } else {
            xhtml = <Tag color='#f50'>
                <FormattedMessage {...messages.inValid} />
            </Tag>;
        }
        return xhtml;
    }

    toggleDisplay = (index, type) => {
        let { orderImport, onFetchImport } = this.props;
        let orders = [];
        if(type == 'package') {
            orderImport.orders.map((item, i) => {
                if(i == index) {
                    item.show_package = !item.show_package
                }
                orders.push(item);
            });
        } else if (type == 'commodity') {
            orderImport.orders.map((item, i) => {
                if(i == index) {
                    item.show_commodity = !item.show_commodity
                }
                orders.push(item);
            });
        }

        let response = {
            orders: orders,
            valid: orderImport.valid,
            inValid: orderImport.inValid
        }

        onFetchImport(response);
      };

    showErrorItem = (text, record, rowIndex, column) => {
        let xhtml = null, title = '';
        if (record && record.error_message && record.error_message.length > 0) {
            let arrColumn = column.split(',');
            xhtml = arrColumn.map((item, index) => {
                for(let i = 0; i < record.error_message.length; i++){
                    if (record.error_message[i].column == item) {
                        return (<Tag className="mb-5" color='volcano' key={index}>{`${record.error_message[i].message}`}</Tag>);
                    }
                }
            });
            if (column == '18,19,20,21,22') {
                let packageText = '';
                if(text[0].name) {
                    packageText += text[0].name;
                }
                if (text[0].length) {
                    if(packageText != '') {
                        packageText += ',';
                    }
                    packageText += text[0].length + 'cm';
                }
                if (text[0].width) {
                    packageText += 'x' + text[0].width + 'cm';
                }
                if (text[0].height) {
                    packageText += 'x' + text[0].height + 'cm';
                }
                if (text[0].kg) {
                    packageText += ',' + text[0].kg + 'kg';
                }
                if (text[0].type) {
                    packageText += ',' + text[0].type;
                } 
                title = 
                <React.Fragment>
                    <Icon type={record.show_package == true ? "minus-square" : "plus-square"} onClick={()=>this.toggleDisplay(rowIndex, 'package')}/><Text><FormattedMessage {...messages.detail} /></Text>
                    <div style={{ background: '#ECECEC', width: 605, padding: 2, textAlign: 'center', display: record.show_package == true ? 'block' : 'none' }}>
                        <Row gutter={16} style={{margin: 0}}>
                        <Col span={8} style={{ paddingLeft: 0, paddingRight: 1 }}>
                            <Card title="Name" bordered={false} className="custom-card-import">
                                <Card.Grid style={{width: '100%'}}>{text[0].name}&nbsp;</Card.Grid>
                            </Card>
                        </Col>
                        <Col span={3} style={{ paddingLeft: 0, paddingRight: 1 }}>
                            <Card title="Length" bordered={false} className="custom-card-import">
                                <Card.Grid style={{width: '100%'}}>{text[0].length}&nbsp;</Card.Grid>
                            </Card>
                        </Col>
                        <Col span={3} style={{ paddingLeft: 0, paddingRight: 1 }}>
                            <Card title="Width" bordered={false} className="custom-card-import">
                                <Card.Grid style={{width: '100%'}}>{text[0].width}&nbsp;</Card.Grid>
                            </Card>
                        </Col>
                        <Col span={3} style={{ paddingLeft: 0, paddingRight: 1 }}>
                            <Card title="Height" bordered={false} className="custom-card-import">
                                <Card.Grid style={{width: '100%'}}>{text[0].height}&nbsp;</Card.Grid>
                            </Card>
                        </Col>
                        <Col span={3} style={{ paddingLeft: 0, paddingRight: 1 }}>
                            <Card title="Kg" bordered={false} className="custom-card-import">
                                <Card.Grid style={{width: '100%'}}>{text[0].kg}&nbsp;</Card.Grid>
                            </Card>
                        </Col>
                        <Col span={4} style={{ paddingLeft: 0, paddingRight: 1 }}>
                            <Card title="Type" bordered={false} className="custom-card-import">
                                <Card.Grid style={{width: '100%'}}>{text[0].type}&nbsp;</Card.Grid>
                            </Card>
                        </Col>
                        </Row>
                    </div>
                </React.Fragment>
            } else if (column == '23,24,25,26') {
                let arrDescription = [], arrUnitValue = [], arrUnitKg = [], arrCurrency = [], arrCountry = [];
                for(let i=0; i < text.length; i++) {
                    if(text[0].description) {
                        arrDescription.push(text[0].description);
                    }
                    if (text[0].unit_value) {
                        arrUnitValue.push(text[0].unit_value);
                    }
                    if (text[0].unit_kg) {
                        arrUnitKg.push(text[0].unit_kg);
                    }
                    if (text[0].currency) {
                        arrCurrency.push(text[0].currency);
                    }
                    if (text[0].country) {
                        arrCountry.push(text[0].country);
                    }
                }
                
                title = 
                <React.Fragment>
                    <Icon type={record.show_commodity == true ? "minus-square" : "plus-square"} onClick={()=>this.toggleDisplay(rowIndex, 'commodity')}/><Text><FormattedMessage {...messages.detail} /></Text>
                    <div style={{ background: '#ECECEC', width: 750, padding: 2, textAlign: 'center', display: record.show_commodity == true ? 'block' : 'none' }}>
                        <Row gutter={16} style={{margin: 0}}>
                        <Col span={10} style={{ paddingLeft: 0, paddingRight: 1 }}>
                            <Card title="Description" bordered={false} className="custom-card-import">
                                {
                                    arrDescription.map(function(element,i) {
                                        return <Card.Grid key={i} style={{width: '100%'}}>{element}&nbsp;</Card.Grid>;
                                    })
                                }
                            </Card>
                        </Col>
                        <Col span={3} style={{ paddingLeft: 0, paddingRight: 1 }}>
                            <Card title="UnitValue" bordered={false} className="custom-card-import">
                                {
                                    arrUnitValue.map(function(element,i) {
                                        return <Card.Grid key={i} style={{width: '100%'}}>{element}&nbsp;</Card.Grid>
                                    })
                                }
                            </Card>
                        </Col>
                        <Col span={3} style={{ paddingLeft: 0, paddingRight: 1 }}>
                            <Card title="UnitKg" bordered={false} className="custom-card-import">
                                {
                                    arrUnitKg.map(function(element,i) {
                                        return <Card.Grid key={i} style={{width: '100%'}}>{element}&nbsp;</Card.Grid>
                                    })
                                }
                            </Card>
                        </Col>
                        <Col span={4} style={{ paddingLeft: 0, paddingRight: 1 }}>
                            <Card title="Currency" bordered={false} className="custom-card-import">
                                {
                                    arrCurrency.map(function(element,i) {
                                        return <Card.Grid key={i} style={{width: '100%'}}>{element}&nbsp;</Card.Grid>
                                    })
                                }
                            </Card>
                        </Col>
                        <Col span={4} style={{ paddingLeft: 0, paddingRight: 1 }}>
                            <Card title="Country" bordered={false} className="custom-card-import">
                                {
                                    arrCountry.map(function(element,i) {
                                        return <Card.Grid key={i} style={{width: '100%'}}>{element}&nbsp;</Card.Grid>
                                    })
                                }
                            </Card>
                        </Col>
                        </Row>
                    </div>
                </React.Fragment>
            } else {
                title = text;
            }
            return (
                <React.Fragment>
                    <div style={{ minWidth: 60 }}>
                        {title}
                        {xhtml}
                    </div>
                </React.Fragment>
            )
        } else {
            if (column == '18,19,20,21,22') {
                let packageText = '';
                if(text[0].name) {
                    packageText += text[0].name;
                }
                if (text[0].length) {
                    if(packageText != '') {
                        packageText += ',';
                    }
                    packageText += text[0].length + 'cm';
                }
                if (text[0].width) {
                    packageText += 'x' + text[0].width + 'cm';
                }
                if (text[0].height) {
                    packageText += 'x' + text[0].height + 'cm';
                }
                if (text[0].kg) {
                    packageText += ',' + text[0].kg + 'kg';
                }
                if (text[0].type) {
                    packageText += ',' + text[0].type;
                } 
                title = 
                <React.Fragment>
                    <Icon type={record.show_package == true ? "minus-square" : "plus-square"} onClick={()=>this.toggleDisplay(rowIndex, 'package')}/><Text><FormattedMessage {...messages.detail} /></Text>
                    <div style={{ background: '#ECECEC', width: 605, padding: 2, textAlign: 'center', display: record.show_package == true ? 'block' : 'none' }}>
                        <Row gutter={16} style={{margin: 0}}>
                        <Col span={8} style={{ paddingLeft: 0, paddingRight: 1 }}>
                            <Card title="Name" bordered={false} className="custom-card-import">
                                <Card.Grid style={{width: '100%'}}>{text[0].name}&nbsp;</Card.Grid>
                            </Card>
                        </Col>
                        <Col span={3} style={{ paddingLeft: 0, paddingRight: 1 }}>
                            <Card title="Length" bordered={false} className="custom-card-import">
                                <Card.Grid style={{width: '100%'}}>{text[0].length}&nbsp;</Card.Grid>
                            </Card>
                        </Col>
                        <Col span={3} style={{ paddingLeft: 0, paddingRight: 1 }}>
                            <Card title="Width" bordered={false} className="custom-card-import">
                                <Card.Grid style={{width: '100%'}}>{text[0].width}&nbsp;</Card.Grid>
                            </Card>
                        </Col>
                        <Col span={3} style={{ paddingLeft: 0, paddingRight: 1 }}>
                            <Card title="Height" bordered={false} className="custom-card-import">
                                <Card.Grid style={{width: '100%'}}>{text[0].height}&nbsp;</Card.Grid>
                            </Card>
                        </Col>
                        <Col span={3} style={{ paddingLeft: 0, paddingRight: 1 }}>
                            <Card title="Kg" bordered={false} className="custom-card-import">
                                <Card.Grid style={{width: '100%'}}>{text[0].kg}&nbsp;</Card.Grid>
                            </Card>
                        </Col>
                        <Col span={4} style={{ paddingLeft: 0, paddingRight: 1 }}>
                            <Card title="Type" bordered={false} className="custom-card-import">
                                <Card.Grid style={{width: '100%'}}>{text[0].type}&nbsp;</Card.Grid>
                            </Card>
                        </Col>
                        </Row>
                    </div>
                </React.Fragment>
            } else if (column == '23,24,25,26') {
                let arrDescription = [], arrUnitValue = [], arrUnitKg = [], arrCurrency = [], arrCountry = [];
                for(let i=0; i < text.length; i++) {
                    if(text[0].description) {
                        arrDescription.push(text[0].description);
                    }
                    if (text[0].unit_value) {
                        arrUnitValue.push(text[0].unit_value);
                    }
                    if (text[0].unit_kg) {
                        arrUnitKg.push(text[0].unit_kg);
                    }
                    if (text[0].currency) {
                        arrCurrency.push(text[0].currency);
                    }
                    if (text[0].country) {
                        arrCountry.push(text[0].country);
                    }
                }
                
                title = 
                <React.Fragment>
                    <Icon type={record.show_commodity == true ? "minus-square" : "plus-square"} onClick={()=>this.toggleDisplay(rowIndex, 'commodity')}/><Text><FormattedMessage {...messages.detail} /></Text>
                    <div style={{ background: '#ECECEC', width: 750, padding: 2, textAlign: 'center', display: record.show_commodity == true ? 'block' : 'none' }}>
                        <Row gutter={16} style={{margin: 0}}>
                        <Col span={10} style={{ paddingLeft: 0, paddingRight: 1 }}>
                            <Card title="Description" bordered={false} className="custom-card-import">
                                {
                                    arrDescription.map(function(element,i) {
                                        return <Card.Grid key={i} style={{width: '100%'}}>{element}&nbsp;</Card.Grid>;
                                    })
                                }
                            </Card>
                        </Col>
                        <Col span={3} style={{ paddingLeft: 0, paddingRight: 1 }}>
                            <Card title="UnitValue" bordered={false} className="custom-card-import">
                                {
                                    arrUnitValue.map(function(element,i) {
                                        return <Card.Grid key={i} style={{width: '100%'}}>{element}&nbsp;</Card.Grid>
                                    })
                                }
                            </Card>
                        </Col>
                        <Col span={3} style={{ paddingLeft: 0, paddingRight: 1 }}>
                            <Card title="UnitKg" bordered={false} className="custom-card-import">
                                {
                                    arrUnitKg.map(function(element,i) {
                                        return <Card.Grid key={i} style={{width: '100%'}}>{element}&nbsp;</Card.Grid>
                                    })
                                }
                            </Card>
                        </Col>
                        <Col span={4} style={{ paddingLeft: 0, paddingRight: 1 }}>
                            <Card title="Currency" bordered={false} className="custom-card-import">
                                {
                                    arrCurrency.map(function(element,i) {
                                        return <Card.Grid key={i} style={{width: '100%'}}>{element}&nbsp;</Card.Grid>
                                    })
                                }
                            </Card>
                        </Col>
                        <Col span={4} style={{ paddingLeft: 0, paddingRight: 1 }}>
                            <Card title="Country" bordered={false} className="custom-card-import">
                                {
                                    arrCountry.map(function(element,i) {
                                        return <Card.Grid key={i} style={{width: '100%'}}>{element}&nbsp;</Card.Grid>
                                    })
                                }
                            </Card>
                        </Col>
                        </Row>
                    </div>
                </React.Fragment>
            } else {
                title = text;
            }
            return <div style={{ minWidth: 60 }}>{title}</div>;
        }
    }

    render() {
        let { orderImport, intl } = this.props;
        return (
            <React.Fragment>
                {orderImport.orders.length > 0 ?
                    <Row gutter={24}>
                        <Col lg={{ span: 24 }} className="gutter-row">
                            <div className="gutter-box">
                                <div className="box">
                                    <div className="box-body">
                                        <Col xs={{ span: 12 }} sm={{ span: 12 }} lg={{ span: 4 }} className="gutter-row">
                                            <Statistic
                                                title={`${intl.formatMessage(messages.ordersText)} ${intl.formatMessage(messages.valid).toLowerCase()}`}
                                                value={orderImport.valid}
                                                style={{ color: '#52c41a' }} />
                                        </Col>
                                        <Col xs={{ span: 12 }} sm={{ span: 12 }} lg={{ span: 4 }} className="gutter-row">
                                            <Statistic
                                                title={`${intl.formatMessage(messages.ordersText)} ${intl.formatMessage(messages.inValid).toLowerCase()}`}
                                                value={orderImport.inValid}
                                                style={{ color: '#faad14' }} />
                                        </Col>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row> : null}
                <Row gutter={24}>
                    <Col lg={{ span: 24 }} className="gutter-row">
                        <div className="gutter-box">
                            <div className="box">
                                <div className="box-body">
                                    <Table
                                        size="default"
                                        bordered={true}
                                        rowKey={record => record.stt}
                                        columns={this.columns}
                                        dataSource={orderImport.orders}
                                        loading={false}
                                        scroll={{ x: 1300 }}
                                        title={() => `${intl.formatMessage(messages.tableTitle)}`}
                                        pagination={{
                                            showSizeChanger: true,
                                            showQuickJumper: true,
                                            showTotal: (total, range) => `${range[0]} - ${range[1]} ${intl.formatMessage(messages.paginationTextOf)} ${total} ${intl.formatMessage(messages.paginationTextItem)}`,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}
export default injectIntl(List);