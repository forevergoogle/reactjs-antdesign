import React, { Component } from 'react';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import { Modal, Button, Row, Col, Card, Icon, Form, Select, Input, DatePicker, InputNumber, Tag } from 'antd';
import { listCustomerManifest, listTransportModal, API_TYPE_ADD, API_TYPE_UPDATE } from './../../constants/constants';
import './index.less';

const Option = Select.Option;
const { TextArea } = Input;

const messages = defineMessages({
    slcHolder: {
        id: 'Genaral.Select.placeholder',
        defaultMessage: 'Select...',
    },
    ipHolder: {
        id: 'Genaral.Input.placeholder',
        defaultMessage: 'Please input...',
    },
    buttonManifest: {
        id: 'Manifest.ButtonManifest.title',
        defaultMessage: 'Create Manifest',
    },
    buttonSubmit: {
        id: 'Genaral.ButtonSubmit.title',
        defaultMessage: 'Submit',
    },
    buttonCancel: {
        id: 'Genaral.ButtonCancel.title',
        defaultMessage: 'Cancel',
    },
    status: {
        id: 'Manifest.Modal.Status.title',
        defaultMessage: 'Status',
    },
    originBranch: {
        id: 'Manifest.Modal.OriginBranch.title',
        defaultMessage: 'Status',
    },
    transportModel: {
        id: 'Manifest.Modal.TransportModel.title',
        defaultMessage: 'Status',
    },
    grossWeight: {
        id: 'Manifest.Modal.GrossWeight.title',
        defaultMessage: 'Status',
    },
    quantityOfBag: {
        id: 'Manifest.Modal.QuantityOfBag.title',
        defaultMessage: 'Status',
    },
    startDate: {
        id: 'Manifest.Modal.StartDate.title',
        defaultMessage: 'Status',
    },
    note: {
        id: 'Manifest.Modal.Note.title',
        defaultMessage: 'Status',
    },
    attachment: {
        id: 'Manifest.Modal.Attachment.title',
        defaultMessage: 'Attachment',
    },
    errorStatus: {
        id: 'Manifest.StatusError.message',
        defaultMessage: 'Please select a status!',
    },
    errorOriginBranch: {
        id: 'Manifest.OriginBranch.message',
        defaultMessage: 'Please select a branch!',
    },
    errorTransportModel: {
        id: 'Manifest.TransportModelError.message',
        defaultMessage: 'Please select a transport model!',
    },
    errorGrossWeight: {
        id: 'Manifest.GrossWeightError.message',
        defaultMessage: 'Please input gross weight!',
    },
    errorQuantity: {
        id: 'Manifest.QuantityError.message',
        defaultMessage: 'Please input quantity!',
    },
    showTotalOrder: {
        id: 'Manifest.Modal.TotalOrder.text',
        defaultMessage: 'Total Order(s)',
    },
    showTotalPCS: {
        id: 'Manifest.Modal.TotalPCS.text',
        defaultMessage: 'Total PCS',
    },
    showTotalWeight: {
        id: 'Manifest.Modal.TotalWeight.text',
        defaultMessage: 'Total Weight',
    },
    showCountOrder: {
        id: 'Manifest.Modal.CountOrder.text',
        defaultMessage: 'order(s)',
    }
});

class ModalForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            loading: false,
            isFirst: true,
            gross_weight: null,
        };
    }

    componentWillReceiveProps(nextProps) {
        const { manifest } = nextProps;

        this.getData(manifest);
    }

    getData = (data) => {
        const { setFieldsValue } = this.props.form;
        if (data && data.id) {
            if (this.state.isFirst) {
                setFieldsValue({
                    gross_weight: data.gross_weight ? (data.gross_weight).toString() : null,
                    note: data.note,
                    origin_branch_id: data.origin_branch_id,
                    qty_of_bags: data.qty_of_bags ? (data.qty_of_bags).toString() : null,
                    start_date: data.start_date ? moment(data.start_date, 'DD/MM/YYYY HH:mm') : null,
                    status_id: data.status_id,
                    transport_model: data.transport_model
                });
                this.props.showModal(true);
                this.setState({ isFirst: false });
            }
        }
    }

    showBtnSubmit = () => {
        let { manifest, form } = this.props;
        let { loading } = this.state;
        let { getFieldsError } = form;

        if (manifest && manifest.id) {
            if (manifest.status_id == 2) {
                return (
                    <Button
                        key="submit"
                        htmlType="submit"
                        type="primary"
                        loading={loading}
                        disabled
                    ><FormattedMessage {...messages.buttonSubmit} /></Button>
                )
            } else {
                return (
                    <Button
                        key="submit"
                        htmlType="submit"
                        type="primary"
                        loading={loading}
                        disabled={this.hasErrors(getFieldsError())}
                        onClick={this.handleSubmit}
                    ><FormattedMessage {...messages.buttonSubmit} /></Button>
                )
            }
        } else {
            return (
                <Button
                    key="submit"
                    htmlType="submit"
                    type="primary"
                    loading={loading}
                    disabled={this.hasErrors(getFieldsError())}
                    onClick={this.handleSubmit}
                ><FormattedMessage {...messages.buttonSubmit} /></Button>
            )
        }
    }

    hasErrors = (fieldsError) => {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
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

    handleSubmit = (e) => {
        e.preventDefault();
        let { query, onAddUpdateItem, onResetItem, manifest, form, language, intl } = this.props;
        this.setState({ loading: true });
        form.validateFields((err, values) => {
            if (!err) {
                if (manifest && manifest.id) {
                    let item = {
                        id: manifest.id,
                        gross_weight: typeof values.gross_weight != 'number' && values.qty_of_bags != undefined && values.qty_of_bags != null ? parseFloat(values.gross_weight.replace(/(,*)/g, '')) : values.gross_weight,
                        note: values.note ? values.note.trim().toString() : '',
                        origin_branch_id: values.origin_branch_id,
                        qty_of_bags: typeof values.qty_of_bags != 'number' && values.qty_of_bags != undefined && values.qty_of_bags != null ? values.qty_of_bags.replace(/(,*)/g, '') : values.qty_of_bags,
                        start_date: values.start_date ? values.start_date.format('DD/MM/YYYY') : '',
                        status_id: values.status_id,
                        transport_model: values.transport_model
                    }

                    onAddUpdateItem(API_TYPE_UPDATE, item, query, this.setStateAction, form, onResetItem, language, intl);
                } else {
                    let item = {
                        gross_weight: typeof values.gross_weight != 'number' && values.qty_of_bags != undefined && values.qty_of_bags != null ? parseFloat(values.gross_weight.replace(/(,*)/g, '')) : values.gross_weight,
                        note: values.note ? values.note.trim().toString() : '',
                        origin_branch_id: values.origin_branch_id,
                        qty_of_bags: typeof values.qty_of_bags != 'number' && values.qty_of_bags != undefined && values.qty_of_bags != null ? values.qty_of_bags.replace(/(,*)/g, '') : values.qty_of_bags,
                        start_date: values.start_date ? values.start_date.format('DD/MM/YYYY') : '',
                        status_id: values.status_id,
                        transport_model: values.transport_model
                    }
                    onAddUpdateItem(API_TYPE_ADD, item, query, this.setStateAction, form, onResetItem, language);
                }
            } else {
                this.setState({ loading: false });
            }
        });
    }

    render() {
        const { visible, lstBranch, manifest, form, intl } = this.props;
        const { getFieldDecorator } = form;
        const title = manifest && manifest.id ? manifest.manifest_number : <FormattedMessage {...messages.buttonManifest} />;
        return (
            <React.Fragment>
                <Button type="primary" className="mb-10" onClick={this.showModal}><FormattedMessage {...messages.buttonManifest} /></Button>
                <Form layout="vertical" onSubmit={this.handleSubmit}>
                    <Modal
                        title={title}
                        visible={visible}
                        maskClosable={false}
                        keyboard={false}
                        closable={false}
                        autoFocusButton="ok"
                        width="70%"
                        zIndex={1031}
                        footer={[
                            this.showBtnSubmit(),
                            <Button key="back" onClick={this.hideModal}><FormattedMessage {...messages.buttonCancel} /></Button>
                        ]}
                    >
                        {manifest && manifest.id ? this.showStatistic() : null}
                        <Row gutter={24}>
                            <Col sm={{ span: 12 }} lg={{ span: 6 }} className="gutter-row">
                                <div className="gutter-box">
                                    <Form.Item label={intl.formatMessage(messages.status)}>
                                        {getFieldDecorator('status_id', {
                                            rules: [{ required: true, message: `${intl.formatMessage(messages.errorStatus)}` }],
                                            initialValue: listCustomerManifest && listCustomerManifest.length > 0 ? listCustomerManifest[0].value : null
                                        })(<Select
                                            showSearch
                                            disabled={manifest.id ? null : 'disabled'}
                                            allowClear
                                            style={{ width: 100 + "%" }}
                                            placeholder={intl.formatMessage(messages.slcHolder)}
                                            optionFilterProp="children"
                                            filterOption={(input, option) => this.fillterSelect(input, option)}
                                        >
                                            {this.showSelectList(listCustomerManifest, true)}
                                        </Select>)}
                                    </Form.Item>
                                </div>
                            </Col>
                            <Col sm={{ span: 12 }} lg={{ span: 6 }} className="gutter-row">
                                <div className="gutter-box">
                                    <Form.Item label={intl.formatMessage(messages.originBranch)}>
                                        {getFieldDecorator('origin_branch_id', {
                                            rules: [{ required: true, message: `${intl.formatMessage(messages.errorOriginBranch)}` }],
                                        })(<Select
                                            showSearch
                                            allowClear
                                            style={{ width: 100 + "%" }}
                                            placeholder={intl.formatMessage(messages.slcHolder)}
                                            optionFilterProp="children"
                                            filterOption={(input, option) => this.fillterSelect(input, option)}
                                        >
                                            {this.showSelectList(lstBranch, false)}
                                        </Select>)}
                                    </Form.Item>
                                </div>
                            </Col>

                            <Col sm={{ span: 12 }} lg={{ span: 6 }} className="gutter-row">
                                <div className="gutter-box">
                                    <Form.Item label={intl.formatMessage(messages.transportModel)}>
                                        {getFieldDecorator('transport_model', {
                                            rules: [{ required: true, message: `${intl.formatMessage(messages.errorTransportModel)}` }],
                                            initialValue: listTransportModal && listTransportModal.length > 0 ? listTransportModal[0].value : null
                                        })(<Select
                                            showSearch
                                            allowClear
                                            style={{ width: 100 + "%" }}
                                            placeholder={intl.formatMessage(messages.slcHolder)}
                                            optionFilterProp="children"
                                            filterOption={(input, option) => this.fillterSelect(input, option)}
                                        >
                                            {this.showSelectList(listTransportModal, false)}
                                        </Select>)}
                                    </Form.Item>
                                </div>
                            </Col>
                            <Col sm={{ span: 12 }} lg={{ span: 6 }} className="gutter-row">
                                <div className="gutter-box">
                                    <Form.Item label={intl.formatMessage(messages.grossWeight)}>
                                        {getFieldDecorator('gross_weight', {
                                            initialValue: null
                                        })(<NumberFormat
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
                        </Row>
                        <Row gutter={24}>
                            <Col sm={{ span: 12 }} lg={{ span: 6 }} className="gutter-row">
                                <div className="gutter-box">
                                    <Form.Item label={intl.formatMessage(messages.quantityOfBag)}>
                                        {getFieldDecorator('qty_of_bags' , {
                                            initialValue: null
                                        }
                                        )(<NumberFormat
                                            className="ant-input"
                                            placeholder={intl.formatMessage(messages.ipHolder)}
                                            thousandSeparator={true}
                                            renderText={value => <div>{value}</div>}
                                            decimalScale={0}
                                            fixedDecimalScale={true}
                                            allowNegative={false} />)}
                                    </Form.Item>
                                </div>
                            </Col>
                            <Col sm={{ span: 12 }} lg={{ span: 6 }} className="gutter-row">
                                <div className="gutter-box">
                                    <Form.Item label={intl.formatMessage(messages.startDate)}>
                                        {getFieldDecorator('start_date')
                                            (<DatePicker
                                                allowClear
                                                format="DD/MM/YYYY"
                                                style={{ width: 100 + "%" }} />)}
                                    </Form.Item>
                                </div>
                            </Col>
                            <Col sm={{ span: 12 }} lg={{ span: 6 }} className="gutter-row">
                                <div className="gutter-box">
                                    <Form.Item label={intl.formatMessage(messages.note)}>
                                        {getFieldDecorator('note')
                                            (<TextArea
                                                autosize={{ minRows: 1, maxRows: 4 }}
                                                placeholder={intl.formatMessage(messages.ipHolder)} />)}
                                    </Form.Item>
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            {manifest && manifest.id && manifest.attactment_link != null && manifest.attactment_link.length > 0 ?
                                <Col sm={{ span: 12 }} lg={{ span: 6 }} className="gutter-row">
                                    <div className="gutter-box">
                                        <Form.Item label={intl.formatMessage(messages.attachment)}>
                                            {
                                                manifest.attactment_link.map((item, i) => {
                                                    return(<a href={item} key={i}>
                                                        <Tag color="green">
                                                            <Icon type="download" />
                                                            {item.replace(/\\/g, '/').replace(/.*\//, '')}
                                                        </Tag>
                                                    </a>)
                                                })
                                            }
                                        </Form.Item>
                                    </div>
                                </Col> : null}
                        </Row>
                    </Modal>
                </Form>
            </React.Fragment>
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
                        // disabled={status && item.value == 2 && manifest && manifest.id == null ? true : false}
                        >
                        {item.label}
                    </Option>
                );
            });
        }
        return xhtml;
    }

    showStatistic = () => {
        const { manifest, intl } = this.props;
        let xhtml = null;
        if (manifest && manifest.id) {
            xhtml = <Row gutter={24}>
                <Col sm={{ span: 8 }} lg={{ span: 6 }}>
                    <Card title={`${intl.formatMessage(messages.showTotalOrder)}`} className="custom-card">
                        <Icon type="shopping-cart" style={{ color: '#cf1322' }} />
                        <div className="txt-number">
                            <NumberFormat
                                value={manifest.total_order ? manifest.total_order : 0}
                                displayType={'text'}
                                thousandSeparator={true}
                                decimalScale={0}
                                fixedDecimalScale={true}
                                suffix={" " + `${intl.formatMessage(messages.showCountOrder)}`}
                                renderText={value => <div>{value}</div>}
                            />
                        </div>
                    </Card>
                </Col>
                <Col sm={{ span: 8 }} lg={{ span: 6 }}>
                    <Card title={`${intl.formatMessage(messages.showTotalPCS)}`} className="custom-card">
                        <Icon type="gold" theme="twoTone" twoToneColor="#ffec3d" />
                        <div className="txt-number">
                            <NumberFormat
                                value={manifest.pcs ? manifest.pcs : 0}
                                displayType={'text'}
                                thousandSeparator={true}
                                decimalScale={0}
                                fixedDecimalScale={true}
                                suffix=" Pcs"
                                renderText={value => <div>{value}</div>}
                            />
                        </div>
                    </Card>
                </Col>
                <Col sm={{ span: 8 }} lg={{ span: 6 }}>
                    <Card title={`${intl.formatMessage(messages.showTotalWeight)}`} className="custom-card">
                        <Icon type="dashboard" theme="twoTone" twoToneColor="#52c41a" />
                        <div className="txt-number">
                            <NumberFormat
                                value={manifest.weight ? parseFloat(manifest.weight).toFixed(3) : 0}
                                displayType={'text'}
                                thousandSeparator={true}
                                decimalScale={3}
                                fixedDecimalScale={true}
                                suffix=" Kg"
                                renderText={value => <div>{value}</div>}
                            />
                        </div>
                    </Card>
                </Col>
            </Row>;
        }
        return xhtml;
    }
}
const WrappedManifestForm = Form.create({ name: 'normal_search' })(ModalForm);
export default injectIntl(WrappedManifestForm);