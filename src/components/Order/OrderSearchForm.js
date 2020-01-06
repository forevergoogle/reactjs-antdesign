import React, { Component } from 'react';
import { filter } from 'lodash';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import { Row, Col, Form, Input, Select, Checkbox, DatePicker, Button, Icon, Cascader } from 'antd';

const Option = Select.Option;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

const messages = defineMessages({
    slcHolder: {
        id: 'Genaral.Select.placeholder',
        defaultMessage: 'Select...',
    },
    ipHolder: {
        id: 'Genaral.Input.placeholder',
        defaultMessage: 'Please input...',
    },
    searchTitle: {
        id: 'Genaral.SearchForm.title',
        defaultMessage: 'Search Form',
    },
    buttonSearch: {
        id: 'Genaral.ButtonSearch.title',
        defaultMessage: 'Search',
    },
    buttonClear: {
        id: 'Genaral.ButtonClear.title',
        defaultMessage: 'Clear',
    },
    buttonCollapse: {
        id: 'Genaral.ButtonCollapse.title',
        defaultMessage: 'Clear',
    },
    orderNumber: {
        id: 'Transshipment.OrderNumber.title',
        defaultMessage: 'Order Number/Partner Order No',
    },
    status: {
        id: 'Transshipment.Status.title',
        defaultMessage: 'Status',
    },
    origin: {
        id: 'Transshipment.Origin.title',
        defaultMessage: 'Origin Country',
    },
    destination: {
        id: 'Transshipment.Destination.title',
        defaultMessage: 'Destination Country',
    },
    manifestNumber: {
        id: 'Transshipment.ManifestNumber.title',
        defaultMessage: 'Manifest Number',
    },
    orderTrackingNo: {
        id: 'Transshipment.OrderTrackingNo.title',
        defaultMessage: 'Order Tracking No',
    },
    pickupDate: {
        id: 'Transshipment.PickupDate.title',
        defaultMessage: 'Pickup Date',
    },
    deliveryDate: {
        id: 'Transshipment.DeliveryDate.title',
        defaultMessage: 'Delivery Date',
    },
    receiverName: {
        id: 'Transshipment.ReceiverName.title',
        defaultMessage: 'Receiver Name',
    },
    receiverAddress: {
        id: 'Transshipment.ReceiverAddress.title',
        defaultMessage: 'Receiver Address',
    },
    fromToDate: {
        id: 'Transshipment.FromToDate.title',
        defaultMessage: 'From date - To date',
    },
    searchBagging: {
        id: 'OrderList.SearchBagging.title',
        defaultMessage: 'Search for bagging',
    },
    errorOrder: {
        id: 'OrderList.ErrorOrder.message',
        defaultMessage: 'Please input Order No',
    },

});
// Check order-no
class OrderSearchForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expand: false,
            isCheck: false,
            checkOrder: false

        };
    }

    handleReset = () => {
        let { query, onChangeQuery, form } = this.props;
        query.order_no = '';
        query.status_id = '';
        query.origin_country_id = '';
        query.destination_country_id = '';
        query.actual_date_of_pickup = '';
        query.origin_branch_id = '';
        query.destination_branch_id = '';
        query.manifest_data_id = '';
        query.actual_date_of_delivery = '';
        query.tracking_no = '';
        query.receiver_address = '';
        query.receiver_name = '';
        query.create_date_from = '';
        query.create_date_to = '';
        query.chk_bagging = false;
        query.chk_bagging = false;
        this.setState({checkBagging: false});
        this.setState({ date: [] })
        onChangeQuery(query);
        form.resetFields();
    }

    toggle = () => {
        const { expand } = this.state;
        this.setState({ expand: !expand });
    }

    filter = (inputValue, path) => {
        return (path.some(option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1));
    }
    handleInputChange = (e) =>{
        const { checkBagging } = this.state;
        this.setState({
            checkBagging: !checkBagging
        });
        this.setState(
            {
                isCheck: e.target.checked,
            }
        );

    }

    handleSearch = (e) => {
        e.preventDefault();
        let { query, onChangeQuery, onSearch, form, language } = this.props;
        form.validateFields((err, values) => {
            if (!err) {
                query.chk_bagging = values.chk_bagging ? values.chk_bagging : false;
                query.order_no = values.order_no ? values.order_no.replace(/\n/g, ',').substring(0, values.order_no.length) : '';
                query.status_id = values.status_id ? values.status_id.toString() : '';
                query.origin_country_id = values.origin_country_id ? values.origin_country_id.toString() : '';
                query.destination_country_id = values.destination_country_id ? values.destination_country_id.toString() : '';
                query.actual_date_of_pickup = values.actual_date_of_pickup ? values.actual_date_of_pickup.format('DD/MM/YYYY') : '';
                query.origin_branch_id = values.origin && values.origin[1] ? values.origin[1].toString() : '';
                query.destination_branch_id = values.destination && values.destination[1] ? values.destination[1].toString() : '';
                query.manifest_data_id = values.manifest_data_id ? values.manifest_data_id.toString() : '';
                query.actual_date_of_delivery = values.actual_date_of_delivery ? values.actual_date_of_delivery.format('DD/MM/YYYY') : '';
                query.tracking_no = values.tracking_no ? values.tracking_no : '';
                query.receiver_address = values.receiver_address ? values.receiver_address : '';
                query.receiver_name = values.receiver_name ? values.receiver_name : '';
                query.create_date_from = values.from_to_date && values.from_to_date[0] ? values.from_to_date[0].format('DD/MM/YYYY') : '';
                query.create_date_to = values.from_to_date && values.from_to_date[1] ? values.from_to_date[1].format('DD/MM/YYYY') : '';
                query.page = 1;
                query.page_size = 10;

                onChangeQuery(query);
                //onSearch(query, true, language);
                onSearch(query, false, language);
            }
        });
    }

    render() {
        const { lstBranch, lstCountry, lstManifest, lstStatus, form, intl, query } = this.props;
        const { expand } = this.state;

        const { getFieldDecorator } = form;
        let isExpand = expand ? 'block' : 'none';
        // console.log(lstCountry);
        let arrC_B = [];

        return (
            <Row gutter={24}>
                <Col lg={{ span: 24 }} className="gutter-row">
                    <div className="gutter-box">
                        <div className="box box-info">
                            <Form layout="vertical" onSubmit={this.handleSearch}>
                                <div className="box-header with-border">
                                    <h3 className="box-title"><FormattedMessage {...messages.searchTitle} /></h3>
                                </div>
                                <div className="box-body">
                                    <Row gutter={24}>
                                        <Col sm={{ span: 12 }} lg={{ span: 6 }} className="gutter-row">
                                            <div className="gutter-box">
                                                <Form.Item label={intl.formatMessage(messages.orderNumber)}>
                                                    {getFieldDecorator('order_no', {
                                                        rules: [{
                                                            required: this.state.isCheck,
                                                            message: `${intl.formatMessage(messages.errorOrder)}`
                                                        }]
                                                    })
                                                    (<TextArea
                                                            autosize={{ minRows: 1, maxRows: 4 }}
                                                            placeholder={intl.formatMessage(messages.ipHolder)} />
                                                        )}
                                                </Form.Item>
                                                <Form.Item >
                                                    {getFieldDecorator('chk_bagging')
                                                    (<Checkbox checked={this.state.checkBagging} onChange={this.handleInputChange}>
                                                        {intl.formatMessage(messages.searchBagging)}
                                                    </Checkbox>)}
                                                </Form.Item>
                                            </div>
                                        </Col>
                                        <Col sm={{ span: 12 }} lg={{ span: 6 }} className="gutter-row">
                                            <div className="gutter-box">
                                                <Form.Item label={intl.formatMessage(messages.status)}>
                                                    {getFieldDecorator('status_id')
                                                        (<Select
                                                            showSearch
                                                            allowClear
                                                            style={{ width: 100 + "%" }}
                                                            placeholder={intl.formatMessage(messages.slcHolder)}
                                                            optionFilterProp="children"
                                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                        >
                                                            {this.showSelectList(lstStatus)}
                                                        </Select>
                                                        )}
                                                </Form.Item>
                                            </div>
                                        </Col>
                                        <Col sm={{ span: 12 }} lg={{ span: 6 }} className="gutter-row">
                                            <div className="gutter-box">
                                                <Form.Item label={intl.formatMessage(messages.origin)}>
                                                    {getFieldDecorator('origin_country_id')
                                                        (
                                                           <Select
                                                                    showSearch
                                                                    allowClear
                                                                    style={{ width: 100 + "%" }}
                                                                    placeholder={intl.formatMessage(messages.slcHolder)}
                                                                    optionFilterProp="children"
                                                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                                >
                                                                    {this.showSelectList(lstCountry)}
                                                           </Select>
                                                        )}
                                                </Form.Item>
                                            </div>
                                        </Col>
                                        <Col sm={{ span: 12 }} lg={{ span: 6 }} className="gutter-row">
                                            <div className="gutter-box">
                                                <Form.Item label={intl.formatMessage(messages.destination)}>
                                                    {getFieldDecorator('destination_country_id')
                                                    (
                                                        <Select
                                                            showSearch
                                                            allowClear
                                                            style={{ width: 100 + "%" }}
                                                            placeholder={intl.formatMessage(messages.slcHolder)}
                                                            optionFilterProp="children"
                                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                        >
                                                            {this.showSelectList(lstCountry)}
                                                        </Select>
                                                    )}
                                                </Form.Item>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row gutter={24}>
                                        <Col sm={{ span: 12 }} lg={{ span: 6 }} className="gutter-row">
                                            <div className="gutter-box">
                                                <Form.Item label={intl.formatMessage(messages.manifestNumber)}>
                                                    {getFieldDecorator('manifest_data_id')
                                                        (<Select
                                                            showSearch
                                                            allowClear
                                                            style={{ width: 100 + "%" }}
                                                            placeholder={intl.formatMessage(messages.slcHolder)}
                                                            onChange={this.handleChange}
                                                            optionFilterProp="children"
                                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                        >
                                                            {this.showSelectList(lstManifest)}
                                                        </Select>
                                                        )}
                                                </Form.Item>
                                            </div>
                                        </Col>

                                        <Col sm={{ span: 12 }} lg={{ span: 6 }} className="gutter-row">
                                            <div className="gutter-box">
                                                <Form.Item label={intl.formatMessage(messages.orderTrackingNo)}>
                                                    {getFieldDecorator('tracking_no')
                                                        (<Input allowClear placeholder={intl.formatMessage(messages.ipHolder)} />)}
                                                </Form.Item>
                                            </div>
                                        </Col>

                                        <Col sm={{ span: 12 }} lg={{ span: 6 }} className="gutter-row">
                                            <div className="gutter-box">
                                                <Form.Item label={intl.formatMessage(messages.pickupDate)}>
                                                    {getFieldDecorator('actual_date_of_pickup')
                                                        (<DatePicker
                                                            allowClear
                                                            format="DD/MM/YYYY"
                                                            style={{ width: 100 + "%" }} />
                                                        )}
                                                </Form.Item>
                                            </div>
                                        </Col>
                                        <Col sm={{ span: 12 }} lg={{ span: 6 }} className="gutter-row">
                                            <div className="gutter-box">
                                                <Form.Item label={intl.formatMessage(messages.deliveryDate)}>
                                                    {getFieldDecorator('actual_date_of_delivery')
                                                        (<DatePicker
                                                            allowClear
                                                            format="DD/MM/YYYY"
                                                            style={{ width: 100 + "%" }} />)}
                                                </Form.Item>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row gutter={24} style={{ display: isExpand }}>
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
                                                <Form.Item label={intl.formatMessage(messages.receiverAddress)}>
                                                    {getFieldDecorator('receiver_address')
                                                        (<Input allowClear placeholder={intl.formatMessage(messages.ipHolder)} />)}
                                                </Form.Item>
                                            </div>
                                        </Col>
                                        <Col sm={{ span: 12 }} lg={{ span: 6 }} className="gutter-row">
                                            <div className="gutter-box">
                                                <Form.Item label={intl.formatMessage(messages.fromToDate)}>
                                                    {getFieldDecorator('from_to_date')
                                                        (<RangePicker allowClear format="DD/MM/YYYY" style={{ width: 100 + "%" }} />)}
                                                </Form.Item>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                <div className="box-footer">
                                    <Row gutter={24}>
                                        <Col xs={{ span: 24 }} className="gutter-row">
                                            <div className="gutter-box text-right">
                                                <Button type="primary" loading={query.loading} htmlType="submit" className="mr-10">
                                                    <FormattedMessage {...messages.buttonSearch} />
                                                </Button>
                                                <Button onClick={this.handleReset}>
                                                    <FormattedMessage {...messages.buttonClear} />
                                                </Button>
                                                <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
                                                    <FormattedMessage {...messages.buttonCollapse} />
                                                    <Icon type={expand ? 'up' : 'down'} />
                                                </a>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Form>
                        </div>
                    </div>
                </Col>
            </Row>
        );
    }
    showSelectList = (lstObj) => {
        let xhtml = null;
        if (lstObj && lstObj.length > 0) {
            xhtml = lstObj.map((item, index) => {
                return (
                    <Option
                        key={index}
                        value={item.value}>
                        {item.label}
                    </Option>
                );
            });
        }
        return xhtml;
    }
}

const WrappedSearchForm = Form.create({ name: 'normal_search' })(OrderSearchForm);
export default injectIntl(WrappedSearchForm);