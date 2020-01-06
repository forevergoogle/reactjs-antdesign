import React, { Component } from 'react';
import moment from 'moment';
import { filter, find, sumBy } from 'lodash';
import NumberFormat from 'react-number-format';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import { Drawer, Button, Row, Col, Form, Select, Input, DatePicker, Card, Cascader, Typography, Icon, Statistic } from 'antd';
import Fee from './Fee';
import { cardsFee_EN, cardsFee_VI, listTransportModal as lstTransport, lstTracking, lstService, API_TYPE_UPDATE } from './../../constants/constants';

const Option = Select.Option;
const { TextArea } = Input;
const { Text } = Typography;

const messages = defineMessages({
    slcHolder: {
        id: 'Genaral.Select.placeholder',
        defaultMessage: 'Select...',
    },
    ipHolder: {
        id: 'Genaral.Input.placeholder',
        defaultMessage: 'Please input...',
    },
    slcError: {
        id: 'Genaral.SelectError.text',
        defaultMessage: 'Please select this field',
    },
    ipError: {
        id: 'Genaral.InputError.text',
        defaultMessage: 'Please input this field',
    },
    modalTitle: {
        id: 'Transshipment.Modal.title',
        defaultMessage: 'Edit order',
    },
    buttonSubmit: {
        id: 'Genaral.ButtonSubmit.title',
        defaultMessage: 'Submit',
    },
    buttonCancel: {
        id: 'Genaral.ButtonCancel.title',
        defaultMessage: 'Cancel',
    },
    orderNumber: {
        id: 'Transshipment.Modal.OrderNumber',
        defaultMessage: 'Order Number',
    },
    vnpostNumber: {
        id: 'Transshipment.Modal.VNPostNumber.title',
        defaultMessage: 'VNPost Number',
    },
    orderTrackingNo: {
        id: 'Transshipment.Modal.OrderTrackingNo.title',
        defaultMessage: 'Order Tracking No',
    },
    manifestNumber: {
        id: 'Transshipment.Modal.ManifestNumber.title',
        defaultMessage: 'Manifest Number',
    },
    transportModel: {
        id: 'Transshipment.Modal.TransportModel.title',
        defaultMessage: 'Transport Model',
    },
    status: {
        id: 'Transshipment.Modal.Status.title',
        defaultMessage: 'Status',
    },
    pickupDate: {
        id: 'Transshipment.Modal.PickupDate.title',
        defaultMessage: 'Pickup - Date',
    },
    deliveryDate: {
        id: 'Transshipment.Modal.DeliveryDate.title',
        defaultMessage: 'Delivery - Date',
    },
    origin: {
        id: 'Transshipment.Modal.Origin.title',
        defaultMessage: 'Origin Country - Branch',
    },
    dest: {
        id: 'Transshipment.Modal.Destination.title',
        defaultMessage: 'Destination Country- Branch',
    },
    service: {
        id: 'Transshipment.Modal.Service.title',
        defaultMessage: 'Service',
    },
    trackingType: {
        id: 'Transshipment.Modal.TrackingType.title',
        defaultMessage: 'Tracking Type',
    },
    receiverName: {
        id: 'Transshipment.Modal.ReceiverName.title',
        defaultMessage: 'Receiver Name',
    },
    receiverAddress: {
        id: 'Transshipment.Modal.ReceiverAddress.title',
        defaultMessage: 'Receiver Address',
    },
    receiverPhone: {
        id: 'Transshipment.Modal.ReceiverPhone.title',
        defaultMessage: 'Receiver Phone',
    },
    deliveryAddress: {
        id: 'Transshipment.Modal.DeliveryAddress.title',
        defaultMessage: 'Delivery Address',
    },
    oZipcode: {
        id: 'Transshipment.Modal.OriginZipcode.title',
        defaultMessage: 'Origin Zipcode',
    },
    dZipcode: {
        id: 'Transshipment.Modal.DestZipcode.title',
        defaultMessage: 'Dest Zipcode',
    },
    weight: {
        id: 'Transshipment.Modal.Weight.title',
        defaultMessage: 'Weight (kgs)',
    },
    pcs: {
        id: 'Transshipment.Modal.PCS.title',
        defaultMessage: 'PCS',
    },
    value: {
        id: 'Transshipment.Modal.Value.title',
        defaultMessage: 'Value (USD)',
    },
    orderNote: {
        id: 'Transshipment.Modal.OrderNote.title',
        defaultMessage: 'Order Note',
    },
    internalNote: {
        id: 'Transshipment.Modal.InternalNote.title',
        defaultMessage: 'Internal Notes',
    },
    totalCost: {
        id: 'Transshipment.Modal.TotalFee.title',
        defaultMessage: 'Total Cost',
    },
    emptyFee: {
        id: 'Transshipment.Modal.EmptyFee.title',
        defaultMessage: 'This list is empty',
    },
    zipcodeError: {
        id: 'Transshipment.Modal.ZipCodeError.title',
        defaultMessage: 'Must have length 6 characters'
    },
    validateTime: {
        id: 'Transshipment.Modal.ErrorTime.title',
        defaultMessage: 'Pickup Date can not after the Delivery Date'
    }
});

class ModalForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            loading: false,
            isFirst: true,
            disabled: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        const { order } = nextProps;
        this.getData(order);
    }

    getData = (data) => {
        const { setFieldsValue } = this.props.form;
        if (data && data.id) {
            if (this.state.isFirst) {
                setFieldsValue({
                    id: data.id,
                    order_no: data.order_no,
                    vnpost_no: data.vnpost_no,
                    tracking_no: data.tracking_no,
                    manifest_data_id: data.manifest_data_id ? data.manifest_data_id : undefined,
                    transport_model: data.transport_model ? data.transport_model : undefined,
                    origin_country_branch: data.origin_country_id && data.origin_branch_id ? [data.origin_country_id, data.origin_branch_id] : undefined,
                    destination_country_branch: data.destination_country_id && data.destination_branch_id ? [data.destination_country_id, data.destination_branch_id] : undefined,
                    status_id: data.status_id ? data.status_id : undefined,
                    service_type: data.service_type ? data.service_type : undefined,
                    sender_id: data.sender_id ? data.sender_id : undefined,
                    tracking_type: data.tracking_type ? data.tracking_type : undefined,
                    receiver_name: data.receiver_name,
                    receiver_phone: data.receiver_phone,
                    receiver_address: data.receiver_address,
                    pickup_date: data.actual_date_of_pickup ? moment(data.actual_date_of_pickup, 'DD/MM/YYYY HH:mm') : null,
                    delivery_date: data.actual_date_of_delivery ? moment(data.actual_date_of_delivery, 'DD/MM/YYYY HH:mm') : null,
                    origin_zipcode: data.origin_zipcode,
                    dest_zipcode: data.dest_zipcode,
                    pcs: data.pcs,
                    weight: data.weight,
                    declared_value: data.declared_value,
                    item_content: data.item_content,
                    internal_note: data.internal_note,
                });
                this.props.showModal(true);
                this.setState({ isFirst: false, disabled: true });
            }
        }
    }

    hasErrors = (fieldsError) => {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
    }

    validateTime = (rule, value, callback) => {
        const { intl } = this.props;
        const form = this.props.form;
        if (form.getFieldValue('delivery_date') !== null && value > form.getFieldValue('delivery_date')) {
            callback(`${intl.formatMessage(messages.validateTime)}`);
        } else {
            callback();
        }
    }

    showModal = () => {
        this.props.showModal(true);
    }

    hideModal = () => {
        let { showModal, onResetItem, form } = this.props;
        showModal(false);
        onResetItem();
        form.resetFields();
        this.setState({ isFirst: true });
    }

    fillterSelect = (input, option) => {
        return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }

    setStateAction = (visible, loading, isFirst) => {
        this.props.showModal(visible);
        this.setState({ loading, isFirst });
    }

    onChangeManifest = async (e) => {
        let { lstManifest, form } = this.props;
        let mItem = find(lstManifest, { value: e });
        if (!e) {
            form.setFieldsValue({
                transport_model: undefined,
                origin_country_branch: undefined
            });
            this.setState({ disabled: false });
        } else {
            form.setFieldsValue({
                transport_model: mItem.transport_model,
                origin_country_branch: [mItem.origin_country_id, mItem.origin_branch_id]
            });
            this.setState({ disabled: true });
        }
    }

    handleAdd = (type, orders) => {
        let item = {
            fee_type: null,
            value: null
        }
        if (type == 'buy') {
            orders.buying_fees.push(item);
        } else if (type == 'sell') {
            orders.selling_fees.push(item);
        }
        this.props.onUpdateItem(orders);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let { query, onAddUpdateItem, onResetItem, order, form, language } = this.props;
        this.setState({ loading: true });
        form.validateFields((err, values) => {
            if (!err) {
                let item = {
                    id: order.id,
                    order_no: values.order_no,
                    vnpost_no: values.vnpost_no,
                    tracking_no: values.tracking_no ? values.tracking_no.toString().trim() : '',
                    manifest_data_id: values.manifest_data_id ? values.manifest_data_id : '',
                    transport_model: values.transport_model ? values.transport_model : '',
                    origin_country_id: values.origin_country_branch && values.origin_country_branch[0] ? values.origin_country_branch[0].toString() : '',
                    origin_branch_id: values.origin_country_branch && values.origin_country_branch[1] ? values.origin_country_branch[1].toString() : '',
                    destination_country_id: values.destination_country_branch && values.destination_country_branch[0] ? values.destination_country_branch[0].toString() : '',
                    destination_branch_id: values.destination_country_branch && values.destination_country_branch[1] ? values.destination_country_branch[1].toString() : '',
                    status_id: values.status_id ? values.status_id : '',
                    service_type: values.service_type ? values.service_type : '',
                    sender_id: values.sender_id ? values.sender_id : '',
                    tracking_type: values.tracking_type ? values.tracking_type : '',
                    receiver_name: values.receiver_address ? values.receiver_address.toString().trim() : '',
                    receiver_phone: values.receiver_phone ? values.receiver_phone.toString().trim() : '',
                    receiver_address: values.receiver_address ? values.receiver_address.toString().trim() : '',
                    actual_date_of_pickup: values.pickup_date && values.pickup_date ? values.pickup_date.format('DD/MM/YYYY HH:mm') : '',
                    actual_date_of_delivery: values.delivery_date && values.delivery_date ? values.delivery_date.format('DD/MM/YYYY HH:mm') : '',
                    origin_zipcode: values.origin_zipcode,
                    dest_zipcode: values.dest_zipcode,
                    pcs: values.pcs,
                    weight: values.weight && typeof values.weight != 'number' ? parseFloat(values.weight.replace(/(,*)/g, '')) : values.weight,
                    declared_value: values.declared_value && typeof values.declared_value != 'number' ? parseFloat(values.declared_value.replace(/(,*)/g, '')) : values.declared_value,
                    item_content: values.item_content ? values.item_content.toString().trim() : '',
                    internal_note: values.internal_note ? values.internal_note.toString().trim() : '',
                    buying_fees: order.buying_fees,
                    selling_fees: order.selling_fees,
                }
                onAddUpdateItem(API_TYPE_UPDATE, item, query, this.setStateAction, form, onResetItem, language);
            } else {
                this.setState({ loading: false });
            }
        });
    }

    render() {
        let { loading, disabled } = this.state;
        const { visible, lstBranch, lstCountry, lstManifest, lstStatus, form, intl } = this.props;
        const { getFieldDecorator, getFieldsError } = form;
        const title = <FormattedMessage {...messages.modalTitle} />;
        let arrC_B = [];
        // // load country with branch in one list
        // arrC_B = lstCountry.map(c => {
        //     let children = [];
        //     children = filter(lstBranch, { country_id: c.value });
        //     return ({
        //         ...c,
        //         children
        //     })
        // });

        return (
            <Drawer
                title={title}
                visible={visible}
                maskClosable={false}
                closable={true}
                onClose={this.hideModal}
                width='95%'
                zIndex={1031}
                placement="left"
            >
                <Form layout="vertical" onSubmit={this.handleSubmit}>
                    <Row gutter={24}>
                        <Col sm={{ span: 12 }} lg={{ span: 6 }} className="gutter-row">
                            <div className="gutter-box">
                                <Form.Item label={intl.formatMessage(messages.orderNumber)}>
                                    {getFieldDecorator('order_no')(
                                        <Input disabled={true} />
                                    )}
                                </Form.Item>
                            </div>
                        </Col>
                        <Col sm={{ span: 12 }} lg={{ span: 6 }} className="gutter-row">
                            <div className="gutter-box">
                                <Form.Item label={intl.formatMessage(messages.vnpostNumber)}>
                                    {getFieldDecorator('vnpost_no')(
                                        <Input disabled={true} />
                                    )}
                                </Form.Item>
                            </div>
                        </Col>
                        <Col sm={{ span: 12 }} lg={{ span: 6 }} className="gutter-row">
                            <div className="gutter-box">
                                <Form.Item label={intl.formatMessage(messages.orderTrackingNo)}>
                                    {getFieldDecorator('tracking_no', {
                                        rules: [{ whitespace: true, required: true, message: `${intl.formatMessage(messages.ipError)}` }],
                                    })(<Input allowClear placeholder={intl.formatMessage(messages.ipHolder)} />)}
                                </Form.Item>
                            </div>
                        </Col>
                        <Col sm={{ span: 12 }} lg={{ span: 6 }} className="gutter-row">
                            <div className="gutter-box">
                                <Form.Item label={intl.formatMessage(messages.manifestNumber)}>
                                    {getFieldDecorator('manifest_data_id')(<Select
                                        showSearch
                                        allowClear
                                        style={{ width: 100 + "%" }}
                                        placeholder={intl.formatMessage(messages.slcHolder)}
                                        optionFilterProp="children"
                                        onChange={this.onChangeManifest}
                                        filterOption={(input, option) => this.fillterSelect(input, option)}
                                    >
                                        {this.showSelectList(lstManifest, false)}
                                    </Select>)}
                                </Form.Item>
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col sm={{ span: 12 }} lg={{ span: 6 }} className="gutter-row">
                            <div className="gutter-box">
                                <Form.Item label={intl.formatMessage(messages.transportModel)}>
                                    {getFieldDecorator('transport_model', {
                                        rules: [{ required: true, message: `${intl.formatMessage(messages.slcError)}` }],
                                    })(<Select
                                        showSearch
                                        allowClear
                                        style={{ width: 100 + "%" }}
                                        placeholder={intl.formatMessage(messages.slcHolder)}
                                        optionFilterProp="children"
                                        disabled={disabled}
                                        filterOption={(input, option) => this.fillterSelect(input, option)}
                                    >
                                        {this.showSelectList(lstTransport, false)}
                                    </Select>)}
                                </Form.Item>
                            </div>
                        </Col>
                        <Col sm={{ span: 12 }} lg={{ span: 6 }} className="gutter-row">
                            <div className="gutter-box">
                                <Form.Item label={intl.formatMessage(messages.status)}>
                                    {getFieldDecorator('status_id', {
                                        rules: [{ required: true, message: `${intl.formatMessage(messages.slcError)}` }],
                                    })(<Select
                                        showSearch
                                        allowClear
                                        style={{ width: 100 + "%" }}
                                        placeholder={intl.formatMessage(messages.slcHolder)}
                                        optionFilterProp="children"
                                        filterOption={(input, option) => this.fillterSelect(input, option)}
                                    >
                                        {this.showSelectList(lstStatus, false)}
                                    </Select>)}
                                </Form.Item>
                            </div>
                        </Col>
                        <Col sm={{ span: 12 }} lg={{ span: 6 }} className="gutter-row">
                            <div className="gutter-box">
                                <Form.Item label={intl.formatMessage(messages.pickupDate)}>
                                    {getFieldDecorator('pickup_date', {
                                        rules: [ {
                                            validator: this.validateTime,
                                        }],
                                    })
                                        (<DatePicker
                                            allowClear
                                            showTime={{ format: 'HH:mm' }}
                                            format="DD/MM/YYYY HH:mm"
                                            style={{ width: 100 + "%" }} />)}
                                </Form.Item>
                            </div>
                        </Col>
                        <Col sm={{ span: 12 }} lg={{ span: 6 }} className="gutter-row">
                            <div className="gutter-box">
                                <Form.Item label={intl.formatMessage(messages.deliveryDate)}>
                                    {getFieldDecorator('delivery_date')
                                        (<DatePicker
                                            allowClear
                                            showTime={{ format: 'HH:mm' }}
                                            format="DD/MM/YYYY HH:mm"
                                            style={{ width: 100 + "%" }} />)}
                                </Form.Item>
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col sm={{ span: 12 }} lg={{ span: 6 }} className="gutter-row">
                            <div className="gutter-box">
                                <Form.Item label={intl.formatMessage(messages.origin)}>
                                    {getFieldDecorator('origin_country_branch', {
                                        rules: [{ type: 'array', required: true, message: `${intl.formatMessage(messages.slcError)}` }],
                                    })
                                        (<Cascader
                                            options={arrC_B}
                                            placeholder={intl.formatMessage(messages.slcHolder)}
                                            disabled={disabled}
                                            showSearch={() => this.filter(input, option)}
                                        />)}
                                </Form.Item>
                            </div>
                        </Col>
                        <Col sm={{ span: 12 }} lg={{ span: 6 }} className="gutter-row">
                            <div className="gutter-box">
                                <Form.Item label={intl.formatMessage(messages.dest)}>
                                    {getFieldDecorator('destination_country_branch', {
                                        rules: [{ type: 'array', required: true, message: `${intl.formatMessage(messages.slcError)}` }],
                                    })
                                        (<Cascader
                                            options={arrC_B}
                                            placeholder={intl.formatMessage(messages.slcHolder)}
                                            showSearch={() => this.filter(input, option)}
                                        />)}
                                </Form.Item>
                            </div>
                        </Col>
                        <Col sm={{ span: 12 }} lg={{ span: 6 }} className="gutter-row">
                            <div className="gutter-box">
                                <Form.Item label={intl.formatMessage(messages.service)}>
                                    {getFieldDecorator('service_type', {
                                        rules: [{ required: true, message: `${intl.formatMessage(messages.slcError)}` }],
                                    })
                                        (<Select
                                            showSearch
                                            allowClear
                                            style={{ width: 100 + "%" }}
                                            placeholder={intl.formatMessage(messages.slcHolder)}
                                            optionFilterProp="children"
                                            filterOption={(input, option) => this.fillterSelect(input, option)}
                                        >
                                            {this.showSelectList(lstService, false)}
                                        </Select>)}
                                </Form.Item>
                            </div>
                        </Col>
                        <Col sm={{ span: 12 }} lg={{ span: 6 }} className="gutter-row">
                            <div className="gutter-box">
                                <Form.Item label={intl.formatMessage(messages.trackingType)}>
                                    {getFieldDecorator('tracking_type', {
                                        rules: [{ required: true, message: `${intl.formatMessage(messages.slcError)}` }],
                                    })
                                        (<Select
                                            showSearch
                                            allowClear
                                            style={{ width: 100 + "%" }}
                                            placeholder={intl.formatMessage(messages.slcHolder)}
                                            optionFilterProp="children"
                                            filterOption={(input, option) => this.fillterSelect(input, option)}
                                        >
                                            {this.showSelectList(lstTracking, false)}
                                        </Select>)}
                                </Form.Item>
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col sm={{ span: 12 }} lg={{ span: 6 }} className="gutter-row">
                            <div className="gutter-box">
                                <Form.Item label={intl.formatMessage(messages.receiverName)}>
                                    {getFieldDecorator('receiver_name')
                                        (<Input allowClear placeholder={intl.formatMessage(messages.ipHolder)} />)}
                                </Form.Item>
                            </div>
                        </Col>
                        <Col sm={{ span: 12 }} lg={{ span: 6 }} className="gutter-row">
                            <div className="gutter-box">
                                <Form.Item label={intl.formatMessage(messages.receiverPhone)}>
                                    {getFieldDecorator('receiver_phone')
                                        (<Input allowClear placeholder={intl.formatMessage(messages.ipHolder)} />)}
                                </Form.Item>
                            </div>
                        </Col>
                        <Col sm={{ span: 12 }} lg={{ span: 6 }} className="gutter-row">
                            <div className="gutter-box">
                                <Form.Item label={intl.formatMessage(messages.receiverAddress)}>
                                    {getFieldDecorator('receiver_address')
                                        (<Input allowClear placeholder={intl.formatMessage(messages.ipHolder)} />)}
                                </Form.Item>
                            </div>
                        </Col>
                        <Col sm={{ span: 6 }} lg={{ span: 3 }} className="gutter-row">
                            <div className="gutter-box">
                                <Form.Item label={intl.formatMessage(messages.oZipcode)}>
                                    {getFieldDecorator('origin_zipcode', {
                                        rules: [
                                            { len: 6, message: `${intl.formatMessage(messages.zipcodeError)}` }
                                        ],
                                        initialValue: null
                                    })
                                        (<NumberFormat
                                            className="ant-input"
                                            placeholder={intl.formatMessage(messages.ipHolder)}
                                            format={"######"}
                                            renderText={value => <div>{value}</div>}
                                            decimalScale={0}
                                            allowNegative={false} />)}
                                </Form.Item>
                            </div>
                        </Col>
                        <Col sm={{ span: 6 }} lg={{ span: 3 }} className="gutter-row">
                            <div className="gutter-box">
                                <Form.Item label={intl.formatMessage(messages.dZipcode)}>
                                    {getFieldDecorator('dest_zipcode', {
                                        rules: [
                                            { len: 6, message: `${intl.formatMessage(messages.ipError)}` }
                                        ],
                                        initialValue: null
                                    })
                                        (<NumberFormat
                                            className="ant-input"
                                            placeholder={intl.formatMessage(messages.ipHolder)}
                                            format={"######"}
                                            renderText={value => <div>{value}</div>}
                                            decimalScale={0}
                                            allowNegative={false} />)}
                                </Form.Item>
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col sm={{ span: 6 }} lg={{ span: 3 }} className="gutter-row">
                            <div className="gutter-box">
                                <Form.Item label={intl.formatMessage(messages.weight)}>
                                    {getFieldDecorator('weight', {
                                        rules: [{ required: true, message: `${intl.formatMessage(messages.ipError)}` }],
                                        initialValue: null
                                    })
                                        (<NumberFormat
                                            className="ant-input"
                                            placeholder={intl.formatMessage(messages.ipHolder)}
                                            thousandSeparator={true}
                                            renderText={value => <div>{value}</div>}
                                            decimalScale={3}
                                            fixedDecimalScale={true}
                                            allowNegative={false} />)}
                                </Form.Item>
                            </div>
                        </Col>
                        <Col sm={{ span: 6 }} lg={{ span: 3 }} className="gutter-row">
                            <div className="gutter-box">
                                <Form.Item label={intl.formatMessage(messages.pcs)}>
                                    {getFieldDecorator('pcs', {
                                        rules: [{ required: true, message: `${intl.formatMessage(messages.ipError)}` }],
                                        initialValue: null
                                    })
                                        (<NumberFormat
                                            className="ant-input"
                                            placeholder={intl.formatMessage(messages.ipHolder)}
                                            renderText={value => <div>{value}</div>}
                                            decimalScale={0}
                                            allowNegative={false} />)}
                                </Form.Item>
                            </div>
                        </Col>
                        <Col sm={{ span: 12 }} lg={{ span: 6 }} className="gutter-row">
                            <div className="gutter-box">
                                <Form.Item label={intl.formatMessage(messages.value)}>
                                    {getFieldDecorator('declared_value', {
                                        initialValue: null
                                    })
                                        (<NumberFormat
                                            className="ant-input"
                                            placeholder={intl.formatMessage(messages.ipHolder)}
                                            thousandSeparator={true}
                                            renderText={value => <div>{value}</div>}
                                            decimalScale={2}
                                            fixedDecimalScale={true}
                                            allowNegative={false} />)}
                                </Form.Item>
                            </div>
                        </Col>
                        <Col sm={{ span: 12 }} lg={{ span: 6 }} className="gutter-row">
                            <div className="gutter-box">
                                <Form.Item label={intl.formatMessage(messages.orderNote)}>
                                    {getFieldDecorator('item_content')
                                        (<TextArea placeholder={intl.formatMessage(messages.ipHolder)} autosize={{ minRows: 2, maxRows: 4 }} />)}
                                </Form.Item>
                            </div>
                        </Col>
                        <Col sm={{ span: 12 }} lg={{ span: 6 }} className="gutter-row">
                            <div className="gutter-box">
                                <Form.Item label={intl.formatMessage(messages.internalNote)}>
                                    {getFieldDecorator('internal_note')
                                        (<TextArea placeholder={intl.formatMessage(messages.ipHolder)} autosize={{ minRows: 2, maxRows: 4 }} />)}
                                </Form.Item>
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        {this.showFeeContainer()}
                    </Row>
                    <div
                        style={{
                            position: 'absolute',
                            left: 0,
                            bottom: 0,
                            width: '100%',
                            borderTop: '1px solid #e9e9e9',
                            padding: '10px 16px',
                            background: '#fff',
                            textAlign: 'right',
                        }}
                    >
                        <Row gutter={24}>
                            <Col sm={{ span: 24 }} className="gutter-row">
                                <div className="gutter-box">
                                    <Button
                                        onClick={this.hideModal}
                                        className="mr-10">
                                        <FormattedMessage {...messages.buttonCancel} />
                                    </Button>
                                    <Button
                                        disabled={this.hasErrors(getFieldsError())}
                                        onClick={this.handleSubmit}
                                        loading={loading}
                                        type="primary">
                                        <FormattedMessage {...messages.buttonSubmit} />
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Form>
            </Drawer>
        );
    }

    showSelectList = (lstObj, status) => {
        let xhtml = null;
        let { manifest } = this.props;
        if (lstObj && lstObj.length > 0) {
            xhtml = lstObj.map((item, index) => {
                return (
                    <Option
                        key={index}
                        value={item.value}
                        disabled={status && item.id == 2 && manifest && manifest.id == null ? true : false}>
                        {item.label}
                    </Option>
                );
            });
        }
        return xhtml;
    }

    showFeeContainer = () => {
        let xhtml = null;
        let { order, intl, language } = this.props;
        let cardsFee = language == 'en' ? cardsFee_EN : cardsFee_VI;
        xhtml = cardsFee.map(item => {
            let sum = item.type == 'buy' ? order && order.buying_fees ? sumBy(order.buying_fees, function (o) { return o.value == null ? 0 : parseFloat(o.value) }) : 0 : order && order.selling_fees ? sumBy(order.selling_fees, function (o) { return o.value == null ? 0 : parseFloat(o.value) }) : 0;
            return (<Col sm={{ span: 24 }} lg={{ span: 12 }} className="gutter-row" key={item.key}>
                <div className="gutter-box">
                    <Card
                        title={item.title}
                        actions={[<Button block onClick={() => this.handleAdd(item.type, order)}><Icon type="plus" />{item.action}</Button>]}>
                        {item.type == 'buy' ? this.showFeeItem((order && order.buying_fees ? order.buying_fees : []), item.key) : this.showFeeItem((order && order.selling_fees ? order.selling_fees : []), item.key)}
                    </Card>
                    <Card>
                        <Statistic
                            title={intl.formatMessage(messages.totalCost)}
                            value={sum}
                            precision={2}
                            valueStyle={{ color: '#1890ff' }}
                            suffix="USD"
                        />
                    </Card>
                </div>
            </Col>)
        })
        return xhtml;
    }

    showFeeItem = (listFee, key) => {
        let xhtml = null;
        let { form, lstFee, onUpdateItem, order } = this.props;
        if (listFee.length > 0) {
            xhtml = listFee.map((item, index) => {
                return (<Fee
                    type={key}
                    item={item}
                    key={index}
                    form={form}
                    index={index}
                    order={order}
                    lstFee={lstFee}
                    listFee={[...listFee]}
                    onUpdateItem={onUpdateItem}
                />);
            });
        } else {
            xhtml = <Text><FormattedMessage {...messages.emptyFee} /></Text>
        }
        return xhtml;
    }
}
const WrappedManifestForm = Form.create({ name: 'normal_search' })(ModalForm);
export default injectIntl(WrappedManifestForm);