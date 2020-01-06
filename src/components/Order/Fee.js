import React, { Component } from 'react';
import NumberFormat from 'react-number-format';
import { Icon, Select, Input, Button, Form } from 'antd';
import { defineMessages, injectIntl } from 'react-intl';
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
    }
});

class Fee extends Component {

    componentDidMount() {
        const { form, type, index, item } = this.props;
        let select_name = `select_${type}_${index}`;
        let input_name = `input_${type}_${index}`;
        form.setFieldsValue({
            [select_name]: item.fee_type ? parseInt(item.fee_type) : undefined,
            [input_name]: item.value ? item.value : undefined,
        });
    }

    fillterSelect = (input, option) => {
        return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }

    onChangeSelect = (e, type, index) => {
        let { listFee, order, onUpdateItem, form, lstFee } = this.props;
        let select_name = `select_${type}_${index}`;
        let input_name = `input_${type}_${index}`;
        form.setFieldsValue({
            [select_name]: e
        });
        listFee.forEach((item, i) => {
            if (i == index) {
                item.fee_type = e;
                lstFee.forEach(obj => {
                    if (obj.value == item.fee_type) {
                        item.value = obj.fee;
                        form.setFieldsValue({
                            [input_name]: item.value
                        });
                    }
                });
            }
        });
        if (type == 0) {
            order.buying_fees = listFee;
        } else if (type == 1) {
            order.selling_fees = listFee;
        }
        onUpdateItem(order);
    }

    onChangeInput = (e, type, index) => {
        let { listFee, order, onUpdateItem, form } = this.props;
        let input_name = `input_${type}_${index}`;
        form.setFieldsValue({
            [input_name]: e.floatValue,
        });
        listFee.forEach((item, i) => {
            if (i == index) {
                item.value = e.floatValue;
            }
        });
        if (type == 0) {
            order.buying_fees = listFee;
        } else if (type == 1) {
            order.selling_fees = listFee;
        }
        onUpdateItem(order);

    }

    handleDelete = (type, index) => {
        let { listFee, order, onUpdateItem, form } = this.props;
        listFee.forEach((item, i) => {
            if (i == index) {
                listFee.splice(i, 1);
            }
        });
        if (type == 0) {
            order.buying_fees = listFee && listFee.length > 0 ? listFee : [];

        } else if (type == 1) {
            order.selling_fees = listFee && listFee.length > 0 ? listFee : [];
        }
        if (listFee.length > 0) {
            listFee.forEach((item, i) => {
                let select_name = `select_${type}_${i}`;
                let input_name = `input_${type}_${i}`;
                form.setFieldsValue({
                    [select_name]: item.fee_type,
                    [input_name]: item.value,
                });
            });
        }
        onUpdateItem(order);
    }

    render() {
        const { form, type, lstFee, index, intl } = this.props;
        const { getFieldDecorator } = form;
        let select_name = `select_${type}_${index}`;
        let input_name = `input_${type}_${index}`;
        return (
            <InputGroup compact className="ant-group-input">
                <Form.Item style={{ width: '61%' }} className="select-ant mr-10">
                    {getFieldDecorator(`${[select_name]}`, {
                        rules: [{ required: true, message: `${intl.formatMessage(messages.slcError)}` }],
                    })(<Select
                        style={{ width: '100%' }}
                        showSearch
                        onChange={(e) => this.onChangeSelect(e, type, index)}
                        placeholder={intl.formatMessage(messages.slcHolder)}
                        optionFilterProp="children"
                        filterOption={(input, option) => this.fillterSelect(input, option)}
                    >
                        {this.showSelect(lstFee, type)}
                    </Select>)}
                </Form.Item>
                <Form.Item style={{ width: '22%' }} className="input-ant mr-10">
                    {getFieldDecorator(`${[input_name]}`, {
                        rules: [{ required: true, message: `${intl.formatMessage(messages.ipError)}` }],
                    })(<NumberFormat
                        className="ant-input"
                        placeholder={intl.formatMessage(messages.ipHolder)}
                        thousandSeparator={true}
                        renderText={value => <div>{value}</div>}
                        decimalScale={2}
                        onValueChange={(e) => this.onChangeInput(e, type, index)}
                        fixedDecimalScale={true}
                        allowNegative={false} />)}
                </Form.Item>
                <Button type="danger" style={{ width: '10%' }} onClick={() => this.handleDelete(type, index)}>
                    <Icon type="minus-circle" />
                </Button>
            </InputGroup>
        );
    }

    showSelect = (lstObj, type) => {
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
export default injectIntl(Fee);