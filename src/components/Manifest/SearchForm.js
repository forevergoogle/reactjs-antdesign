import React, { Component } from 'react';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import { Row, Col, Form, Input, Select, DatePicker, Button } from 'antd';
import { listTransportModal } from './../../constants/constants';

const Option = Select.Option;
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
    transportModel: {
        id: 'Manifest.TransportModel.title',
        defaultMessage: 'Transport Model',
    },
    originBranch: {
        id: 'Manifest.OriginBranch.title',
        defaultMessage: 'Origin Branch',
    },
    fromToDate: {
        id: 'Manifest.FromToDate.title',
        defaultMessage: 'From Date - To Date',
    },
    manifestNumber: {
        id: 'Manifest.ManifestNumber.title',
        defaultMessage: 'Manifest Number',
    }
});

class SearchForm extends Component {

    handleReset = () => {
        let { query, onChangeQuery, form } = this.props;
        query.transport_model = '';
        query.origin_branch_id = '';
        query.create_date_from = '';
        query.create_date_to = '';
        query.manifest_number = '';
        onChangeQuery(query);
        form.resetFields();
    }

    handleSearch = (e) => {
        e.preventDefault();
        let { query, onChangeQuery, onSearch, form, language } = this.props;
        form.validateFields((err, values) => {
            query.transport_model = values.transport_model ? values.transport_model.toString() : '';
            query.origin_branch_id = values.origin_branch_id ? values.origin_branch_id.toString() : '';
            query.create_date_from = values.from_to_date && values.from_to_date[0] ? values.from_to_date[0].format('DD/MM/YYYY') : '';
            query.create_date_to = values.from_to_date && values.from_to_date[1] ? values.from_to_date[1].format('DD/MM/YYYY') : '';
            query.manifest_number = values.manifest_number ? values.manifest_number : '';
            query.page = 1;
            query.page_size = 10;
            onChangeQuery(query);
            onSearch(query, language);
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { lstBranch, intl } = this.props;

        return (
            <Row gutter={24}>
                <Col lg={{ span: 24 }} className="gutter-row">
                    <div className="gutter-box">
                        <div className="box box-info">
                            <Form layout="vertical" onSubmit={this.handleSearch}>
                                <div className="box-header with-border">
                                    <h3 className="box-title">
                                        <FormattedMessage {...messages.searchTitle} />
                                    </h3>
                                </div>
                                <div className="box-body">
                                    <Row gutter={24}>
                                        <Col sm={{ span: 12 }} lg={{ span: 6 }} className="gutter-row">
                                            <div className="gutter-box">
                                                <Form.Item label={intl.formatMessage(messages.transportModel)}>
                                                    {getFieldDecorator('transport_model')
                                                        (<Select
                                                            showSearch
                                                            allowClear
                                                            style={{ width: 100 + "%" }}
                                                            placeholder={intl.formatMessage(messages.slcHolder)}
                                                            optionFilterProp="children"
                                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                        >
                                                            {this.showSelectList(listTransportModal)}
                                                        </Select>
                                                        )}
                                                </Form.Item>
                                            </div>
                                        </Col>
                                        <Col sm={{ span: 12 }} lg={{ span: 6 }} className="gutter-row">
                                            <div className="gutter-box">
                                                <Form.Item label={intl.formatMessage(messages.originBranch)}>
                                                    {getFieldDecorator('origin_branch_id')
                                                        (<Select
                                                            showSearch
                                                            allowClear
                                                            style={{ width: 100 + "%" }}
                                                            placeholder={intl.formatMessage(messages.slcHolder)}
                                                            optionFilterProp="children"
                                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                        >
                                                            {this.showSelectList(lstBranch)}
                                                        </Select>
                                                        )}
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
                                        <Col sm={{ span: 12 }} lg={{ span: 6 }} className="gutter-row">
                                            <div className="gutter-box">
                                                <Form.Item label={intl.formatMessage(messages.manifestNumber)}>
                                                    {getFieldDecorator('manifest_number')
                                                        (<Input allowClear placeholder={intl.formatMessage(messages.ipHolder)} />)}
                                                </Form.Item>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                <div className="box-footer">
                                    <Row gutter={24}>
                                        <Col xs={{ span: 24 }} className="gutter-row">
                                            <div className="gutter-box text-right">
                                                <Button type="primary" htmlType="submit" className="mr-10">
                                                    <FormattedMessage {...messages.buttonSearch} />
                                                </Button>
                                                <Button onClick={this.handleReset}>
                                                    <FormattedMessage {...messages.buttonClear} />
                                                </Button>
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

const WrappedSearchForm = Form.create({ name: 'normal_search' })(SearchForm);
export default injectIntl(WrappedSearchForm);