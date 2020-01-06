import React, { Component } from 'react';
import NumberFormat from 'react-number-format';
import { Icon, Select, Input, Button, Form, Row, Col } from 'antd';
import { defineMessages, injectIntl } from 'react-intl';
import { lstCurrency } from './../../constants/constants';
import './index.less';

const InputGroup = Input.Group;
const Option = Select.Option;

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
    description: {
        id: 'CreateOrder.Description.title',
        defaultMessage: 'Description',
    },
    unitValue: {
        id: 'CreateOrder.UnitValue.title',
        defaultMessage: 'Unit Value',
    },
    unitVolume: {
        id: 'CreateOrder.UnitVolume.title',
        defaultMessage: 'Unit Volume',
    },
    unitCurrency: {
        id: 'CreateOrder.Currency.title',
        defaultMessage: 'Currency',
    },
    country: {
        id: 'CreateOrder.Country.title',
        defaultMessage: 'Country',
    },
    errorCommodityDescription: {
        id: 'CreateOrder.ErrorCommodityDescription.message',
        defaultMessage: 'Please input Commodity Description in English'
    },
    errorCommodityValue: {
        id: 'CreateOrder.ErrorCommodityValue.message',
        defaultMessage: 'Please input Commodity Value'
    },
    errorCommodityUnitVolume: {
        id: 'CreateOrder.ErrorCommodityUnitVolume.message',
        defaultMessage: 'Please input Commodity Unit Volume'
    },
    errorCommodityCurrency: {
        id: 'CreateOrder.ErrorCommodityCurrency.message',
        defaultMessage: 'Please input Commodity Currency'
    },
    errorCommodityCountry: {
        id: 'CreateOrder.ErrorCommodityCountry.message',
        defaultMessage: 'Please input Commodity Country'
    },
});

class Commodity extends Component {

    componentDidMount() {
        const { form, type, index, item } = this.props;
        let description = `description_${type}_${index}`;
        let unit_value = `unit_value_${type}_${index}`;
        let unit_kg = `unit_kg_${type}_${index}`;
        let currency = `currency_${type}_${index}`;
        let country = `country_${type}_${index}`;
        form.setFieldsValue({
            [description]: item.description ? item.description : undefined,
            [unit_value]: item.unit_value ? item.unit_value : undefined,
            [unit_kg]: item.unit_kg ? item.unit_kg : undefined,
            [currency]: item.currency ? item.currency : undefined,
            [country]: item.country ? item.country : undefined,
        });
    }

    fillterSelect = (input, option) => {
        return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }

    onChangeSelect = (e, type, index) => {
        let { listCommodity, order, onUpdateItem, form } = this.props;
        let currency = `currency_${type}_${index}`;
        form.setFieldsValue({
            [currency]: e
        });
        listCommodity.forEach((item, i) => {
            if (i == index) {
                item.currency = e;
            }
        });
        if (type == 1) {
            order.commodities = listCommodity;
        }
        onUpdateItem(order);
    }

    onChangeInput = (e, type, index, inputType) => {
        let { listCommodity, order, onUpdateItem, form } = this.props;
        let description = `description_${type}_${index}`;
        let unit_value = `unit_value_${type}_${index}`;
        let unit_kg = `unit_kg_${type}_${index}`;
        let country = `country_${type}_${index}`;
        if (inputType == 'description') {
            form.setFieldsValue({
                [description]: e.target.value,
            });
        } else if (inputType == 'unit_value') {
            form.setFieldsValue({
                [unit_value]: e.floatValue,
            });
        } else if (inputType == 'unit_kg') {
            form.setFieldsValue({
                [unit_kg]: e.floatValue,
            });
        } else if (inputType == 'country') {
            form.setFieldsValue({
                [country]: e.target.value,
            });
        }

        listCommodity.forEach((item, i) => {
            if (i == index) {
                if (inputType == 'description') {
                    item.description = e.target.value;
                } else if (inputType == 'unit_value') {
                    item.unit_value = e.floatValue;
                } else if (inputType == 'unit_kg') {
                    item.unit_kg = e.floatValue;
                } else if (inputType == 'country') {
                    item.country = e.target.value;
                }
            }
        });
        if (type == 1) {
            order.commodities = listCommodity;
        }
        onUpdateItem(order);

    }

    handleDelete = (type, index) => {
        let { listCommodity, order, onUpdateItem, form } = this.props;
        listCommodity.forEach((item, i) => {
            if (i == index) {
                listCommodity.splice(i, 1);
            }
        });
        if (type == 1) {
            order.commodities = listCommodity && listCommodity.length > 0 ? listCommodity : [];
        }
        if (listCommodity.length > 0) {
            listCommodity.forEach((item, i) => {
                let description = `description_${type}_${i}`;
                let unit_value = `unit_value_${type}_${i}`;
                let unit_kg = `unit_kg_${type}_${i}`;
                let currency = `currency_${type}_${i}`;
                let country = `country_${type}_${i}`;
                form.setFieldsValue({
                    [description]: item.description,
                    [unit_value]: item.unit_value,
                    [unit_kg]: item.unit_kg,
                    [currency]: item.currency,
                    [country]: item.country,
                });
            });
        }
        onUpdateItem(order);
    }

    render() {
        const { form, type, lstUnitCurrency, index, intl, order } = this.props;
        const { getFieldDecorator } = form;
        let description = `description_${type}_${index}`;
        let unit_value = `unit_value_${type}_${index}`;
        let unit_kg = `unit_kg_${type}_${index}`;
        let currency = `currency_${type}_${index}`;
        let country = `country_${type}_${index}`;
        return (
            <Row gutter={24}>
                <Col xs={{ span: 4 }} sm={{ span: 4 }} lg={{ span: 4 }} className="gutter-row">
                    <div className="gutter-box">
                        <Form.Item label={intl.formatMessage(messages.description)}>
                            {getFieldDecorator(`${[description]}`, {
                                rules: [{ required: true, pattern: new RegExp("^[a-zA-Z0-9 /./,/-]*$"), message: `${intl.formatMessage(messages.errorCommodityDescription)}` }]
                            })
                                (<Input 
                                    allowClear
                                    type="text" 
                                    placeholder={intl.formatMessage(messages.ipHolder)} 
                                    onChange={(e) => this.onChangeInput(e, type, index, 'description')}
                                />)}
                        </Form.Item>
                    </div>
                </Col>
                <Col xs={{ span: 4 }} sm={{ span: 4 }} lg={{ span: 4 }} className="gutter-row">
                    <div className="gutter-box">
                        <Form.Item label={intl.formatMessage(messages.unitValue)}>
                            {getFieldDecorator(`${[unit_value]}`, {
                                rules: [{ required: true, message: `${intl.formatMessage(messages.errorCommodityValue)}` }]
                            })
                                (<NumberFormat
                                className="ant-input"
                                placeholder={intl.formatMessage(messages.ipHolder)}
                                thousandSeparator={true}
                                decimalScale={2}
                                onValueChange={(e) => this.onChangeInput(e, type, index, 'unit_value')}
                                fixedDecimalScale={true}
                                allowNegative={false} />)}
                        </Form.Item>
                    </div>
                </Col>
                <Col xs={{ span: 4 }} sm={{ span: 4 }} lg={{ span: 4 }} className="gutter-row">
                    <div className="gutter-box">
                        <Form.Item label={intl.formatMessage(messages.unitVolume)}>
                            {getFieldDecorator(`${[unit_kg]}`, {
                                rules: [{ required: true, message: `${intl.formatMessage(messages.errorCommodityUnitVolume)}` }]
                            })
                                (<NumberFormat
                                    className="ant-input"
                                    placeholder={intl.formatMessage(messages.ipHolder)}
                                    thousandSeparator={true}
                                    decimalScale={2}
                                    onValueChange={(e) => this.onChangeInput(e, type, index, 'unit_kg')}
                                    fixedDecimalScale={true}
                                    allowNegative={false} />)}
                        </Form.Item>
                    </div>
                </Col>

                <Col xs={{ span: 4 }} sm={{ span: 4 }} lg={{ span: 4 }} className="gutter-row">
                    <div className="gutter-box">
                        <Form.Item label={intl.formatMessage(messages.unitCurrency)}>
                            {getFieldDecorator(`${[currency]}`, {
                                rules: [{ required: true, message: `${intl.formatMessage(messages.errorCommodityCurrency)}` }],
                                initialValue: lstCurrency && lstCurrency.length > 0 ?  lstCurrency[1].value : null
                            })
                                (<Select
                                    showSearch
                                    style={{ width: 100 + "%" }}
                                    placeholder={intl.formatMessage(messages.slcHolder)}
                                    onChange={(e) => this.onChangeSelect(e, type, index)}
                                    optionFilterProp="children"
                                    filterOption={(input, option) => this.fillterSelect(input, option)}
                                >
                                    {this.showSelectList(lstCurrency)}
                                </Select>)}
                        </Form.Item>
                    </div>
                </Col>

                <Col xs={{ span: 4 }} sm={{ span: 4 }} lg={{ span: 4 }} className="gutter-row">
                    <div className="gutter-box">
                        <Form.Item label={intl.formatMessage(messages.country)}>
                            {getFieldDecorator(`${[country]}`)
                                (<Input 
                                    allowClear
                                    type="text" 
                                    placeholder={intl.formatMessage(messages.ipHolder)}
                                    onChange={(e) => this.onChangeInput(e, type, index, 'country')}
                                />)}
                        </Form.Item>
                    </div>
                </Col>
                { (!order.id && index > 0) ? 
                (
                    <Col xs={{ span: 4 }} sm={{ span: 4 }} lg={{ span: 4 }} className="gutter-row">
                    <div className="gutter-box">
                        <Form.Item label="&nbsp;">
                            <Button type="danger" style={{ width: '40%' }} onClick={() => this.handleDelete(type, index)}>
                                <Icon type="minus-circle" />
                            </Button>
                        </Form.Item>
                    </div>
                </Col>
                ) : '' }

            </Row>
        );
    }

    showSelectList = (lstObj, type) => {
        let xhtml = null;
        if (lstObj && lstObj.length > 0) {
            xhtml = lstObj.map((item, index) => {
                if (item.type == type) {
                    return (
                        <Option
                            key={index}
                            value={item.value}>
                            {item.label}
                        </Option>
                    );
                }
            });
        }
        return xhtml;
    }
}
export default injectIntl(Commodity);