import React, { Component } from 'react';
import { filter } from 'lodash';
import NumberFormat from 'react-number-format';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import { Row, Col, Form, Input, Select, DatePicker, Button, Icon, Cascader, Card, Typography, Alert } from 'antd';
import { listTransportModal, lstService, lstTracking, lstPackageType, lstCurrency, API_TYPE_ADD, lstContent, US_COUNTRY, lstPackageTypeECForUS, lstPackageTypeEXForUS } from './../../constants/constants';
import Commodity from './Commodity';
import moment from 'moment';
import ErrorForm from './../Error/ErrorForm';

const Option = Select.Option;
const { TextArea } = Input;
const { Text } = Typography;
const { RangePicker } = DatePicker;

const gridStyle = {
    width: '25%',
    textAlign: 'center',
};

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
    buttonSave: {
        id: 'Genaral.ButtonSave.title',
        defaultMessage: 'Save',
    },
    buttonAdd: {
        id: 'Genaral.ButtonAdd.title',
        defaultMessage: 'Add',
    },
    buttonCancel: {
        id: 'Genaral.ButtonCancel.title',
        defaultMessage: 'Button Cancel',
    },
    buttonCollapse: {
        id: 'Genaral.ButtonCollapse.title',
        defaultMessage: 'Cancel',
    },
    orderNumber: {
        id: 'CreateOrder.OrderNumber.title',
        defaultMessage: 'Order Number',
    },
    partnerOrderNumber: {
        id: 'CreateOrder.partnerOrderNumber.title',
        defaultMessage: 'Partner Order Number',
    },
    orderTrackingNumber: {
        id: 'CreateOrder.orderTrackingNumber.title',
        defaultMessage: 'Order Tracking Number',
    },
    transportModel: {
        id: 'CreateOrder.transportModel.title',
        defaultMessage: 'Transport Model',
    },
    status: {
        id: 'CreateOrder.Status.title',
        defaultMessage: 'Status',
    },
    service: {
        id: 'CreateOrder.Service.title',
        defaultMessage: 'Service',
    },
    trackingType: {
        id: 'CreateOrder.TrackingType.title',
        defaultMessage: 'Tracking Type',
    },
    internalNote: {
        id: 'CreateOrder.InternalNote.title',
        defaultMessage: 'Internal Note',
    },
    originCity: {
        id: 'CreateOrder.OriginCity.title',
        defaultMessage: 'Origin State',
    },
    originCountry: {
        id: 'CreateOrder.OriginCountry.title',
        defaultMessage: 'Origin Country',
    },
    destination: {
        id: 'CreateOrder.Destination.title',
        defaultMessage: 'Destination Country',
    },
    destinationCity: {
        id: 'CreateOrder.DestinationCity.title',
        defaultMessage: 'Destination State',
    },
    destinationSuburb: {
        id: 'CreateOrder.DestinationSuburb.title',
        defaultMessage: 'Destination City',
    },
    buildingName: {
        id: 'CreateOrder.ReceiverBuildingName.title',
        defaultMessage: 'Receiver Building Name',
    },
    destinationCode: {
        id: 'CreateOrder.DestinationCode.title',
        defaultMessage: 'Destination Zipcode',
    },
    contactName: {
        id: 'CreateOrder.ReceiverContactName.title',
        defaultMessage: 'Receiver Contact Name',
    },
    phone: {
        id: 'CreateOrder.ReceiverPhone.title',
        defaultMessage: 'Receiver Phone',
    },
    email: {
        id: 'CreateOrder.ReceiverEmail.title',
        defaultMessage: 'Receiver Email',
    },
    commodities: {
        id: 'CreateOrder.Commodities.title',
        defaultMessage: 'Commodities',
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
    addMore: {
        id: 'General.ButtonAddMore.title',
        defaultMessage: 'Add More',
    },
    packages: {
        id: 'CreateOrder.Packages.title',
        defaultMessage: 'Packages',
    },
    packageName: {
        id: 'CreateOrder.PackageName.title',
        defaultMessage: 'Name',
    },
    length: {
        id: 'CreateOrder.PackageLength.title',
        defaultMessage: 'Length',
    },
    width: {
        id: 'CreateOrder.PackageWidth.title',
        defaultMessage: 'Width',
    },
    height: {
        id: 'CreateOrder.PackageHeight.title',
        defaultMessage: 'Height ',
    },
    volume: {
        id: 'CreateOrder.PackageVolume.title',
        defaultMessage: 'Volume',
    },
    type: {
        id: 'CreateOrder.PackageType.title',
        defaultMessage: 'Type',
    },
    pickupDate: {
        id: 'CreateOrder.PickupDate.title',
        defaultMessage: 'Pickup Date',
    },
    deliveryDate: {
        id: 'CreateOrder.DeliveryDate.title',
        defaultMessage: 'Delivery Date',
    },
    receiverName: {
        id: 'CreateOrder.ReceiverName.title',
        defaultMessage: 'Receiver Name',
    },
    pickupAddress: {
        id: 'CreateOrder.PickupAddress.title',
        defaultMessage: 'Pickup Address',
    },
    originCode: {
        id: 'CreateOrder.OriginCode.title',
        defaultMessage: 'Origin ZipCode',
    },
    receiverAddress: {
        id: 'CreateOrder.ReceiverAddress.title',
        defaultMessage: 'Receiver Address',
    },
    content: {
        id: 'CreateOrder.Content.title',
        defaultMessage: 'Content',
    },
    errorTransportModel: {
        id: 'Manifest.TransportModelError.message',
        defaultMessage: 'Please select a Transport Model!',
    },
    errorStatus: {
        id: 'Manifest.StatusError.message',
        defaultMessage: 'Please select a Status!',
    },
    errorService: {
        id: 'CreateOrder.ErrorService.message',
        defaultMessage: 'Please select a Service!',
    },
    errorTrackingType: {
        id: 'CreateOrder.ErrorTrackingType.message',
        defaultMessage: 'Please select a Tracking Type!',
    },
    errorManifestNo: {
        id: 'CreateOrder.ErrorManifestNo.message',
        defaultMessage: 'Please select a Manifest',
    },
    manifestNo: {
        id: 'CreateOrder.ManifestNumber.title',
        defaultMessage: 'Manifest Number',
    },
    errorOrigin: {
        id: 'CreateOrder.ErrorOrigin.message',
        defaultMessage: 'Please select a Origin Country - City',
    },
    errorDestination: {
        id: 'CreateOrder.ErrorDestination.message',
        defaultMessage: 'Please select a Destination Country',
    },
    errorDestinationCity: {
        id: 'CreateOrder.ErrorDestinationCity.message',
        defaultMessage: 'Please input Destination City',
    },
    emptyCommodity: {
        id: 'CreateOrder.EmptyCommodity.message',
        defaultMessage: 'This list is empty',
    },
    errorDestinationSuburb: {
        id: 'CreateOrder.ErrorDestinationSuburb.message',
        defaultMessage: 'Please input Destination Suburb',
    },
    errorDestinationCode: {
        id: 'CreateOrder.ErrorDestinationCode.message',
        defaultMessage: 'Please input Destination Code',
    },
    errorReceiverAddress: {
        id: 'CreateOrder.ErrorReceiverAddress.message',
        defaultMessage: 'Please input Receiver Address',
    },
    errorReceiverName: {
        id: 'CreateOrder.ErrorReceiverName.message',
        defaultMessage: 'Please input Receiver Name',
    },
    errorReceiverPhone: {
        id: 'CreateOrder.ErrorReceiverPhone.message',
        defaultMessage: 'Please input Receiver Phone',
    },
    errorReceiverEmail: {
        id: 'CreateOrder.ErrorReceiverEmail.message',
        defaultMessage: 'Please input Receiver Email',
    },
    errorPackageLength: {
        id: 'CreateOrder.ErrorPackageLength.message',
        defaultMessage: 'Please input Package Length',
    },
    errorPackageWidth: {
        id: 'CreateOrder.ErrorPackageWidth.message',
        defaultMessage: 'Please input Package Width',
    },
    errorPackageHeight: {
        id: 'CreateOrder.ErrorPackageHeight.message',
        defaultMessage: 'Please input Package Height',
    },
    errorPackageVolume: {
        id: 'CreateOrder.ErrorPackageVolume.message',
        defaultMessage: 'Please input Package Volume',
    },
    errorPackageType: {
        id: 'CreateOrder.ErrorPackageType.message',
        defaultMessage: 'Please input Package Type',
    },
    errorCommodityDescription: {
        id: 'CreateOrder.ErrorCommodityDescription.message',
        defaultMessage: 'Please input Commodity Description in English'
    },
    errorCommodityUnitValue: {
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
    errorContent: {
        id: 'CreateOrder.ErrorContent.message',
        defaultMessage: 'Please choose Content'
    }
});

class CreateOrderForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isFirst: true,
            loading: false,
            error_list: [],
            error: null,
            listPackageType: lstPackageTypeECForUS,
            serviceType: 1,
            destCoutry: null
        };
    }

    handleReset = () => {
        let { query, onChangeQuery, form ,onResetItem} = this.props;
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
        this.setState({ date: [] })
        onChangeQuery(query);
        form.resetFields();
        onResetItem()
    }

    filter = (inputValue, path) => {
        return (path.some(option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1));
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let { query, onAddUpdateItem, onResetItem, order, form, language, intl } = this.props;
        this.setState({ loading: true });
        form.validateFields((err, values) => {
            if (!err) {
                let commoditie = null;
                if(values.description && values.unit_value && values.unit_kg) {
                    commoditie = {
                        description: values.description ? values.description : '',
                        unit_value: values.unit_value ? Number(values.unit_value) : '',
                        unit_kg: values.unit_kg ? Number(values.unit_kg) : '',
                        currency: values.currency ? values.currency : '',
                        country: values.country ? values.country : ''
                    };
                }
                
                if(commoditie != null) {
                    if (order.commodities) {
                        order.commodities.push(commoditie);
                    } else {
                        order.commodities = [];
                        order.commodities.push(commoditie);
                    }
                }

                let item = {
                    order_no: values.order_no ? values.order_no.toString().trim() : '',
                    tracking_no: values.order_tracking_no ? values.order_tracking_no.toString().trim() : '',
                    manifest_data_id: values.manifest_no ? values.manifest_no : '',
                    transport_model: values.transport_model ? values.transport_model : '',
                    origin_country: values.origin_country ? values.origin_country.toString().trim() : '',
                    destination_country: values.destination_country ? values.destination_country.toString().trim() : '',
                    destination_suburb: values.destination_suburb ? values.destination_suburb.toString().trim() : '',
                    destination_city: values.destination_city ? values.destination_city.toString().trim() : '',
                    status_id: values.status_id ? values.status_id : '',
                    service_type: values.service_type ? values.service_type : '',
                    sender_id: values.sender_id ? values.sender_id : '',
                    tracking_type: values.tracking_type ? values.tracking_type : '',
                    receiver_building_name: values.receiver_building_name ? values.receiver_building_name.toString().trim() : '',
                    receiver_name: values.receiver_name ? values.receiver_name.toString().trim() : '',
                    receiver_phone: values.receiver_phone ? values.receiver_phone.toString().trim() : '',
                    receiver_address: values.receiver_address ? values.receiver_address.toString().trim() : '',
                    receiver_contact_name: values.receiver_contact_name ? values.receiver_contact_name.toString().trim() : '',
                    receiver_email: values.receiver_email ? values.receiver_email.toString().trim() : '',
                    actual_date_of_pickup: values.actual_date_of_pickup && values.actual_date_of_pickup ? values.actual_date_of_pickup.format('DD/MM/YYYY HH:mm') : '',
                    actual_date_of_delivery: values.actual_date_of_delivery && values.actual_date_of_delivery ? values.actual_date_of_delivery.format('DD/MM/YYYY HH:mm') : '',
                    origin_zipcode: values.origin_zipcode ? values.origin_zipcode : '',
                    dest_zipcode: values.dest_zipcode,
                    pcs: values.pcs ? values.pcs : 1,
                    content: values.content ? values.content : 2,
                    internal_note: values.internal_note ? values.internal_note.toString().trim() : '',
                    buying_fees: order.buying_fees,
                    selling_fees: order.selling_fees,
                    package: [{
                        name: values.name,
                        height: parseFloat(values.height.replace(/(,*)/g, '')),
                        length: parseFloat(values.length.replace(/(,*)/g, '')),
                        width: parseFloat(values.width.replace(/(,*)/g, '')),
                        kg: parseFloat(values.volume.replace(/(,*)/g, '')),
                        type: values.type
                    }],
                    commodities: order.commodities
                }
                onAddUpdateItem(API_TYPE_ADD, item, query, this.setStateAction, form, onResetItem, language, intl);

            } else {
                this.setState({ loading: false });
            }
        });
    }

    setStateAction = (loading, error_list, serviceType, destCountry, listPackageType) => {
        this.setState({ loading, error_list, serviceType, destCountry, listPackageType });
    }

    handleAddMore = (type, order) => {
        let item = {
            description: null,
            unit_value: null,
            unit_kg: null,
            currency: 2,
            country: null
        }

        if (type == 'commodity') {
            if (order.commodities) {
                order.commodities.push(item);
            } else {
                order.commodities = [];
                let current_item = {
                    description: this.props.form.getFieldValue('description') ?  this.props.form.getFieldValue('description') : '',
                    unit_value: this.props.form.getFieldValue('unit_value') ? parseFloat(this.props.form.getFieldValue('unit_value').replace(/(,*)/g, '')) : '',
                    unit_kg: this.props.form.getFieldValue('unit_kg') ? parseFloat(this.props.form.getFieldValue('unit_kg').replace(/(,*)/g, '')) : '',
                    currency: this.props.form.getFieldValue('currency') ? this.props.form.getFieldValue('currency') : '',
                    country: this.props.form.getFieldValue('country') ? this.props.form.getFieldValue('country') : ''
                };
                order.commodities.push(current_item);
                order.commodities.push(item);
            }

            }

        this.props.onUpdateItem(order);
    }

    showListCommodity = (listCommodity, key) => {
        let xhtml = null;
        let { form, lstUnitCurrency, onUpdateItem, order } = this.props;
        if (listCommodity.length > 0) {
            xhtml = listCommodity.map((item, index) => {
                return (<Commodity
                    type={key}
                    item={item}
                    key={index}
                    form={form}
                    index={index}
                    order={order}
                    lstUnitCurrency={lstUnitCurrency}
                    listCommodity={[...listCommodity]}
                    onUpdateItem={onUpdateItem}
                />);
            });
        } else {
            xhtml = <Text></Text>
        }
        return xhtml;
    }

    showPackage = (packageItem) => {
        const {intl, form } = this.props;
        const { getFieldDecorator } = form;
        let xhtml = null;
        if (packageItem && packageItem.length > 0) {
            // form.setFieldsValue({
            //     name: packageItem[0].name ? packageItem[0].name : null,
            //     length: packageItem[0].length ? packageItem[0].length : null,
            //     width: packageItem[0].width ? packageItem[0].width : null,
            //     height: packageItem[0].height ? packageItem[0].height : null,
            //     volume: packageItem[0].volume ? packageItem[0].volume : null,
            //     type: packageItem[0].type ? packageItem[0].type : null
            // });
            xhtml = 
            <React.Fragment>
            <Row gutter={24}>
                <Col xs={{ span: 4 }} sm={{ span: 4 }} lg={{ span: 4 }} className="gutter-row">
                    <div className="gutter-box">
                        <Form.Item label={intl.formatMessage(messages.packageName)}>
                            {getFieldDecorator('name')
                                (<Input allowClear placeholder={intl.formatMessage(messages.ipHolder)} />)}
                        </Form.Item>
                    </div>
                </Col>
                <Col xs={{ span: 4 }} sm={{ span: 4 }} lg={{ span: 4 }} className="gutter-row">
                    <div className="gutter-box">
                        <Form.Item label={intl.formatMessage(messages.length)}>
                            {getFieldDecorator('length', {
                                rules: [{ required: true, message: `${intl.formatMessage(messages.errorPackageLength)}` }]
                                ,initialValue: null
                            })
                                (<NumberFormat
                                    className="ant-input"
                                    placeholder={intl.formatMessage(messages.ipHolder)}
                                    thousandSeparator={true}
                                    decimalScale={2}
                                    fixedDecimalScale={true}
                                    allowNegative={false} />
                                )}
                        </Form.Item>
                    </div>
                </Col>
                <Col xs={{ span: 4 }} sm={{ span: 4 }} lg={{ span: 4 }} className="gutter-row">
                    <div className="gutter-box">
                        <Form.Item label={intl.formatMessage(messages.width)}>
                            {getFieldDecorator('width', {
                                rules: [{ required: true, message: `${intl.formatMessage(messages.errorPackageWidth)}` }]
                                ,initialValue: null
                            })
                                (<NumberFormat
                                className="ant-input"
                                placeholder={intl.formatMessage(messages.ipHolder)}
                                thousandSeparator={true}
                                decimalScale={2}
                                fixedDecimalScale={true}
                                allowNegative={false} />
                            )}
                        </Form.Item>
                    </div>
                </Col>
                <Col xs={{ span: 4 }} sm={{ span: 4 }} lg={{ span: 4 }} className="gutter-row">
                    <div className="gutter-box">
                        <Form.Item label={intl.formatMessage(messages.height)}>
                            {getFieldDecorator('height', {
                                rules: [{ required: true, message: `${intl.formatMessage(messages.errorPackageHeight)}` }]
                                ,initialValue: null
                            })
                                (<NumberFormat
                                className="ant-input"
                                placeholder={intl.formatMessage(messages.ipHolder)}
                                thousandSeparator={true}
                                decimalScale={2}
                                fixedDecimalScale={true}
                                allowNegative={false} />
                            )}
                        </Form.Item>
                    </div>
                </Col>

                <Col xs={{ span: 4 }} sm={{ span: 4 }} lg={{ span: 4 }} className="gutter-row">
                    <div className="gutter-box">
                        <Form.Item label={intl.formatMessage(messages.volume)}>
                            {getFieldDecorator('volume', {
                                rules: [{ required: true, message: `${intl.formatMessage(messages.errorPackageVolume)}` }]
                                ,initialValue: null
                            })
                                (<NumberFormat
                                className="ant-input"
                                placeholder={intl.formatMessage(messages.ipHolder)}
                                thousandSeparator={true}
                                decimalScale={2}
                                fixedDecimalScale={true}
                                allowNegative={false} />
                            )}
                        </Form.Item>
                    </div>
                </Col>

                <Col xs={{ span: 4 }} sm={{ span: 4 }} lg={{ span: 4 }} className="gutter-row">
                    <div className="gutter-box">
                        <Form.Item label={intl.formatMessage(messages.type)}>
                            {getFieldDecorator('type', {
                                rules: [{ required: true, message: `${intl.formatMessage(messages.errorPackageType)}` }]
                                ,initialValue: null
                            })
                                (<Select
                                showSearch
                                style={{ width: 100 + "%" }}
                                placeholder={intl.formatMessage(messages.slcHolder)}
                                optionFilterProp="children"
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                {this.showSelectList(lstPackageType)}
                            </Select>
                            )}
                        </Form.Item>
                    </div>
                </Col>
            </Row>
            </React.Fragment>
        } 
        return xhtml;
    }

    hasErrors = (fieldsError) => {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
    }

    componentWillReceiveProps(nextProps) {
        const { order } = nextProps;
        this.getData(order);
    }

    getData = (data) => {
        const { setFieldsValue } = this.props.form;
        if (data && data.id) {
            if (this.state.isFirst) {
                this.setState({ isFirst: false });
                if(data.error && data.error.length > 0) {
                    let error_message = '';
                    data.error.map((item, i) => {
                        error_message += item
                        if(i != 0) {
                            error_message += <br/>;
                        }
                        i++;
                    })
                    let error = <div>{error_message}</div>;
                    this.setState({error: error});
                } else {
                    this.setState({error: null});
                }
                setFieldsValue({
                    id: data.id,
                    order_no: data.order_no,
                    partner_order_no: data.connote,
                    order_tracking_no: data.tracking_no,
                    manifest_no: data.manifest_data_id ? parseInt(data.manifest_data_id) : null,
                    transport_model: data.transport_model ? parseInt(data.transport_model) : null,
                    origin_country: data.origin_country_id ? parseInt(data.origin_country_id) : null,
                    origin_city: data.origin_city ? data.origin_branch_id : null,
                    pickup_address: data.pickup_address ? data.pickup_address : null,
                    destination_country: data.destination_country_id ? parseInt(data.destination_country_id) : null,
                    destination_city: data.destination_city ? data.destination_city : null,
                    destination_suburb: data.destination_suburb ? data.destination_suburb : null,
                    service_type: data.service_type ? parseInt(data.service_type) : null,
                    sender_id: data.sender_id ? parseInt(data.sender_id) : null,
                    status_id: data.status_id ? parseInt(data.status_id) : null,
                    tracking_type: data.tracking_type ? parseInt(data.tracking_type) : null,
                    receiver_building_name: data.receiver_building_name ? data.receiver_building_name : null,
                    receiver_contact_name: data.receiver_contact_name ? data.receiver_contact_name : null,
                    receiver_name: data.receiver_name,
                    receiver_phone: data.receiver_phone,
                    receiver_email: data.receiver_email ? data.receiver_email : null,
                    receiver_address: data.receiver_address,
                    actual_date_of_pickup: data.actual_date_of_pickup ? moment(data.actual_date_of_pickup, 'DD/MM/YYYY HH:mm') : null,
                    actual_date_of_delivery: data.actual_date_of_delivery ? moment(data.actual_date_of_delivery, 'DD/MM/YYYY HH:mm') : null,
                    origin_zipcode: data.origin_zipcode,
                    dest_zipcode: data.dest_zipcode,
                    pcs: data.pcs,
                    content: data.content,
                    weight: data.weight,
                    declared_value: data.declared_value,
                    item_content: data.item_content,
                    internal_note: data.internal_note,
                    buying_fees: data.buying_fees ? data.buying_fees : [],
                    selling_fees: data.selling_fees ? data.selling_fees : [],
                    commodities: data.commodities ? data.commodities : [],
                    package: data.package ? data.package : [],
                    name: data.package && (data.package)[0].name ? (data.package)[0].name : null,
                    length: data.package && (data.package)[0].length ? (data.package)[0].length : null,
                    width: data.package && (data.package)[0].width ? (data.package)[0].width : null,
                    height: data.package && (data.package)[0].height ? (data.package)[0].height : null,
                    volume: data.package && (data.package)[0].kg ? (data.package)[0].kg : null,
                    type: data.package && (data.package)[0].type ? (data.package)[0].type : null,
                });
                this.setState({ isFirst: false });
            }
        } else {
            this.setState({ error: null });
        }
    }

    onChangeListPackageType = async(e, type) => {
        if(type == 'service_type') {
            await this.setState({
                serviceType: e,
            });
        } else if(type == 'dest_country') {
            await this.setState({
                destCountry: e
            });
        }
        if(this.state.serviceType == 1) {
            this.setState({
                listPackageType: lstPackageTypeECForUS
            });
        } else if(this.state.serviceType == 2) {
            if(this.state.destCountry == US_COUNTRY) {
                this.setState({
                    listPackageType: lstPackageTypeEXForUS
                });
            } else {
                this.setState({
                    listPackageType: []
                });
            }
        } else {
            this.setState({
                listPackageType: []
            });
        }
    }

    render() {
        const { lstCountry, lstManifest, lstManifestImport, lstStatus, form, intl, order } = this.props;

        const { getFieldDecorator, getFieldsError } = form;

        const { loading, error_list, error, listPackageType } = this.state;
        return (
            <Row gutter={24}>
                <Col lg={{ span: 24 }} className="gutter-row">
                    <div className="gutter-box">
                        {error != '' && error != null ? 
                            (<Alert message="Error" type="error" description={error} showIcon />) : ''
                        }
                        <div className="box box-info" style={{marginTop: 5}}>
                            <Form layout="vertical" onSubmit={this.handleSubmit}>
                                <div className="box-body">
                                    <Row gutter={24}>
                                        <Col sm={{ span: 12 }} lg={{ span: 6 }} className="gutter-row">
                                            <div className="gutter-box">
                                                <Form.Item label={intl.formatMessage(messages.orderNumber)}>
                                                    {getFieldDecorator('order_no')
                                                        (<Input disabled valueplaceholder={intl.formatMessage(messages.orderNumber)} />
                                                        )}
                                                </Form.Item>
                                            </div>
                                        </Col>

                                        <Col sm={{ span: 12 }} lg={{ span: 6 }} className="gutter-row">
                                            <div className="gutter-box">
                                                <Form.Item label={intl.formatMessage(messages.partnerOrderNumber)}>
                                                    {getFieldDecorator('partner_order_no')
                                                        (<Input disabled placeholder={intl.formatMessage(messages.partnerOrderNumber)} />
                                                        )}
                                                </Form.Item>
                                            </div>
                                        </Col>

                                        <Col sm={{ span: 12 }} lg={{ span: 6 }} className="gutter-row">
                                            <div className="gutter-box">
                                                <Form.Item label={intl.formatMessage(messages.orderTrackingNumber)}>
                                                    {getFieldDecorator('order_tracking_no')
                                                        (<Input placeholder={intl.formatMessage(messages.ipHolder)} />
                                                        )}
                                                        <ErrorForm error_list={error_list} item_name="tracking_no"></ErrorForm>
                                                </Form.Item>
                                            </div>
                                        </Col>
                                        <Col sm={{ span: 12 }} lg={{ span: 6 }} className="gutter-row">
                                            <div className="gutter-box">
                                                <Form.Item label={intl.formatMessage(messages.transportModel)}>
                                                    {getFieldDecorator('transport_model', {
                                                        rules: [{ required: true, message: `${intl.formatMessage(messages.errorTransportModel)}` }],
                                                        initialValue: listTransportModal && listTransportModal.length > 0 ?  listTransportModal[0].value : null
                                                    })
                                                        (<Select
                                                            showSearch
                                                            style={{ width: 100 + "%" }}
                                                            placeholder={intl.formatMessage(messages.slcHolder)}
                                                            optionFilterProp="children"
                                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                        >
                                                            {this.showSelectList(listTransportModal)}
                                                        </Select>
                                                        )}
                                                        <ErrorForm error_list={error_list} item_name="transport_model"></ErrorForm>
                                                </Form.Item>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row gutter={24}>
                                        <Col sm={{ span: 12 }} lg={{ span: 6 }} className="gutter-row">
                                            <div className="gutter-box">
                                                <Form.Item label={intl.formatMessage(messages.status)}>
                                                    {getFieldDecorator('status_id', {
                                                        rules: [{ required: true, message: `${intl.formatMessage(messages.errorStatus)}` }],
                                                        initialValue: lstStatus && lstStatus.length > 0 ?  1 : null
                                                    })
                                                        (<Select
                                                            showSearch
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
                                                <Form.Item label={intl.formatMessage(messages.pickupDate)}>
                                                    {getFieldDecorator('actual_date_of_pickup')
                                                        (<DatePicker
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
                                                            format="DD/MM/YYYY"
                                                            style={{ width: 100 + "%" }} />)}
                                                </Form.Item>
                                            </div>
                                        </Col>

                                        <Col sm={{ span: 12 }} lg={{ span: 6 }} className="gutter-row">
                                            <div className="gutter-box">
                                                <Form.Item label={intl.formatMessage(messages.service)}>
                                                    {getFieldDecorator('service_type', {
                                                        rules: [{ required: true, message: `${intl.formatMessage(messages.errorService)}` }],
                                                        initialValue: lstService && lstService.length > 0 ?  lstService[0].value : null
                                                    })
                                                        (<Select
                                                            showSearch
                                                            onChange={(e) => this.onChangeListPackageType(e, 'service_type')}
                                                            style={{ width: 100 + "%" }}
                                                            placeholder={intl.formatMessage(messages.slcHolder)}
                                                            optionFilterProp="children"
                                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                        >
                                                            {this.showSelectList(lstService)}
                                                        </Select>
                                                        )}
                                                        <ErrorForm error_list={error_list} item_name="service_type"></ErrorForm>
                                                </Form.Item>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row gutter={24} >
                                        <Col sm={{ span: 12 }} lg={{ span: 6 }} className="gutter-row">
                                            <div className="gutter-box">
                                                <Form.Item label={intl.formatMessage(messages.trackingType)}>
                                                    {getFieldDecorator('tracking_type', {
                                                        rules: [{ required: true, message: `${intl.formatMessage(messages.trackingType)}` }],
                                                        initialValue: lstTracking && lstTracking.length > 0 ?  lstTracking[0].value : null
                                                    })
                                                        (<Select
                                                            showSearch
                                                            style={{ width: 100 + "%" }}
                                                            placeholder={intl.formatMessage(messages.slcHolder)}
                                                            optionFilterProp="children"
                                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                        >
                                                            {this.showSelectList(lstTracking)}
                                                        </Select>
                                                        )}
                                                </Form.Item>
                                            </div>
                                        </Col>

                                        <Col sm={{ span: 12 }} lg={{ span: 6 }} className="gutter-row">
                                            <div className="gutter-box">
                                                <Form.Item label={intl.formatMessage(messages.manifestNo)}>
                                                    {getFieldDecorator('manifest_no', {
                                                        rules: [{ required: true, message: `${intl.formatMessage(messages.errorManifestNo)}` }],
                                                    })
                                                        (<Select
                                                            showSearch
                                                            style={{ width: 100 + "%" }}
                                                            placeholder={intl.formatMessage(messages.slcHolder)}
                                                            optionFilterProp="children"
                                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                        >
                                                            {this.showSelectList(JSON.stringify(order) == '{}' ? lstManifestImport : lstManifest)}
                                                        </Select>
                                                        )}
                                                </Form.Item>
                                            </div>
                                        </Col>

                                        <Col sm={{ span: 12 }} lg={{ span: 6 }} className="gutter-row">
                                            <div className="gutter-box">
                                                <Form.Item label={intl.formatMessage(messages.internalNote)}>
                                                    {getFieldDecorator('internal_note')
                                                        (<TextArea
                                                            autosize={{ minRows: 1, maxRows: 4 }}
                                                            placeholder={intl.formatMessage(messages.ipHolder)} />
                                                        )}
                                                </Form.Item>
                                            </div>
                                        </Col>

                                        <Col sm={{ span: 12 }} lg={{ span: 6 }} className="gutter-row">
                                            <div className="gutter-box">
                                                <Form.Item label={intl.formatMessage(messages.content)}>
                                                    {getFieldDecorator('content', {
                                                        rules: [{ required: true, message: `${intl.formatMessage(messages.errorContent)}` }],
                                                        initialValue: lstContent && lstContent.length > 0 ?  lstContent[0].value : null
                                                    })
                                                        (<Select
                                                            showSearch
                                                            style={{ width: 100 + "%" }}
                                                            placeholder={intl.formatMessage(messages.slcHolder)}
                                                            optionFilterProp="children"
                                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                        >
                                                            {this.showSelectList(lstContent)}
                                                        </Select>
                                                        )}
                                                </Form.Item>
                                            </div>
                                        </Col>

                                    </Row>
                                    <Card title="Sender">
                                        <Row gutter={24}>
                                            <Col sm={{ span: 12 }} lg={{ span: 6 }} className="gutter-row">
                                                <div className="gutter-box">
                                                    <Form.Item label={intl.formatMessage(messages.originCountry)}>
                                                        {getFieldDecorator('origin_country')
                                                            (<Select
                                                                allowClear
                                                                showSearch
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
                                                    <Form.Item label={intl.formatMessage(messages.originCity)}>
                                                        {getFieldDecorator('origin_city')
                                                            (<Input allowClear placeholder={intl.formatMessage(messages.ipHolder)} />)}
                                                    </Form.Item>
                                                </div>
                                            </Col>
                                            <Col sm={{ span: 12 }} lg={{ span: 6 }} className="gutter-row">
                                                <div className="gutter-box">
                                                    <Form.Item label={intl.formatMessage(messages.pickupAddress)}>
                                                        {getFieldDecorator('pickup_address')
                                                            (<Input allowClear placeholder={intl.formatMessage(messages.ipHolder)} />)}
                                                    </Form.Item>
                                                </div>
                                            </Col>
                                            <Col sm={{ span: 12 }} lg={{ span: 6 }} className="gutter-row">
                                                <div className="gutter-box">
                                                    <Form.Item label={intl.formatMessage(messages.originCode)}>
                                                        {getFieldDecorator('origin_code',{
                                                            initialValue: null
                                                        })
                                                            (<NumberFormat
                                                                className="ant-input"
                                                                placeholder={intl.formatMessage(messages.ipHolder)}
                                                                decimalScale={0}
                                                                allowNegative={false} />
                                                            )}
                                                    </Form.Item>
                                                </div>
                                            </Col>
                                        </Row>

                                    </Card>

                                    <Card title="Receiver">
                                        <Row gutter={24}>
                                            <Col sm={{ span: 12 }} lg={{ span: 6 }} className="gutter-row">
                                                <div className="gutter-box">
                                                    <Form.Item label={intl.formatMessage(messages.destination)}>
                                                        {getFieldDecorator('destination_country', {
                                                            rules: [{ required: true, message: `${intl.formatMessage(messages.errorDestination)}` }],
                                                        })
                                                            (<Select
                                                                showSearch
                                                                style={{ width: 100 + "%" }}
                                                                onChange={(e)=>this.onChangeListPackageType(e, 'dest_country')}
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
                                                    <Form.Item label={intl.formatMessage(messages.destinationCity)}>
                                                        {getFieldDecorator('destination_city', {
                                                            rules: [{ required: true, message: `${intl.formatMessage(messages.errorDestinationCity)}` }],
                                                        })
                                                            (<Input allowClear placeholder={intl.formatMessage(messages.ipHolder)} />)}
                                                            <ErrorForm error_list={error_list} item_name="destination_state"></ErrorForm>
                                                    </Form.Item>
                                                    
                                                </div>
                                            </Col>

                                            <Col sm={{ span: 12 }} lg={{ span: 6 }} className="gutter-row">
                                                <div className="gutter-box">
                                                    <Form.Item label={intl.formatMessage(messages.destinationSuburb)}>
                                                        {getFieldDecorator('destination_suburb', {
                                                            rules: [{ required: true, message: `${intl.formatMessage(messages.errorDestinationSuburb)}` }]
                                                        })
                                                            (<Input allowClear placeholder={intl.formatMessage(messages.ipHolder)} />)}
                                                            <ErrorForm error_list={error_list} item_name="destination_city"></ErrorForm>
                                                    </Form.Item>
                                                </div>
                                            </Col>

                                            <Col sm={{ span: 12 }} lg={{ span: 6 }} className="gutter-row">
                                                <div className="gutter-box">
                                                    <Form.Item label={intl.formatMessage(messages.buildingName)}>
                                                        {getFieldDecorator('receiver_building_name')
                                                            (<Input allowClear placeholder={intl.formatMessage(messages.ipHolder)} />)}
                                                    </Form.Item>
                                                </div>
                                            </Col>
                                        </Row>

                                        <Row gutter={24}>
                                            <Col sm={{ span: 12 }} lg={{ span: 6 }} className="gutter-row">
                                                <div className="gutter-box">
                                                    <Form.Item label={intl.formatMessage(messages.receiverAddress)}>
                                                        {getFieldDecorator('receiver_address', {
                                                            rules: [{ required: true, message: `${intl.formatMessage(messages.errorReceiverAddress)}` }]
                                                        })
                                                            (<Input placeholder={intl.formatMessage(messages.ipHolder)} />
                                                            )}
                                                    </Form.Item>
                                                </div>
                                            </Col>

                                            <Col sm={{ span: 12 }} lg={{ span: 6 }} className="gutter-row">
                                                <div className="gutter-box">
                                                    <Form.Item label={intl.formatMessage(messages.destinationCode)}>
                                                        {getFieldDecorator('dest_zipcode', {
                                                            rules: [{ required: true, message: `${intl.formatMessage(messages.errorDestinationCode)}` }],
                                                            initialValue: null
                                                        })
                                                            (<NumberFormat
                                                                className="ant-input"
                                                                placeholder={intl.formatMessage(messages.ipHolder)}
                                                                decimalScale={0}
                                                                allowNegative={false} />
                                                            )}
                                                            <ErrorForm error_list={error_list} item_name="destination_zip_code"></ErrorForm>
                                                    </Form.Item>
                                                </div>
                                            </Col>

                                            <Col sm={{ span: 12 }} lg={{ span: 6 }} className="gutter-row">
                                                <div className="gutter-box">
                                                    <Form.Item label={intl.formatMessage(messages.receiverName)}>
                                                        {getFieldDecorator('receiver_name', {
                                                            rules: [{ required: true, message: `${intl.formatMessage(messages.errorReceiverName)}` }]
                                                        })
                                                            (<Input placeholder={intl.formatMessage(messages.ipHolder)} />
                                                            )}
                                                    </Form.Item>
                                                </div>
                                            </Col>

                                            <Col sm={{ span: 12 }} lg={{ span: 6 }} className="gutter-row">
                                                <div className="gutter-box">
                                                    <Form.Item label={intl.formatMessage(messages.contactName)}>
                                                        {getFieldDecorator('receiver_contact_name')
                                                            (<Input placeholder={intl.formatMessage(messages.ipHolder)} />
                                                            )}
                                                    </Form.Item>
                                                </div>
                                            </Col>
                                        </Row>

                                        <Row gutter={24}>
                                            <Col sm={{ span: 12 }} lg={{ span: 6 }} className="gutter-row">
                                                <div className="gutter-box">
                                                    <Form.Item label={intl.formatMessage(messages.phone)}>
                                                        {getFieldDecorator('receiver_phone', {
                                                            rules: [{ required: true, message: `${intl.formatMessage(messages.errorReceiverPhone)}` }]
                                                            ,initialValue: null
                                                        })
                                                            (<NumberFormat
                                                                className="ant-input"
                                                                placeholder={intl.formatMessage(messages.ipHolder)}
                                                                decimalScale={0}
                                                                allowNegative={false} />
                                                            )}
                                                    </Form.Item>
                                                </div>
                                            </Col>

                                            <Col sm={{ span: 12 }} lg={{ span: 6 }} className="gutter-row">
                                                <div className="gutter-box">
                                                    <Form.Item label={intl.formatMessage(messages.email)}>
                                                        {getFieldDecorator('receiver_email', {
                                                            rules: [{ required: true, message: `${intl.formatMessage(messages.errorReceiverEmail)}` }]
                                                        })
                                                            (<Input placeholder={intl.formatMessage(messages.ipHolder)} />
                                                            )}
                                                    </Form.Item>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Card>
                                    <Card title="Commodities">
                                        { order.commodities && order.commodities.length > 0 ? this.showListCommodity(order.commodities ? order.commodities : [], 1) :
                                        (<Row gutter={24}>
                                            <Col xs={{ span: 4 }} sm={{ span: 4 }} lg={{ span: 4 }} className="gutter-row">
                                                <div className="gutter-box">
                                                    <Form.Item label={intl.formatMessage(messages.description)}>
                                                        {getFieldDecorator('description', {
                                                            rules: [{ required: true, pattern: new RegExp("^[a-zA-Z0-9 /./,/-]*$"), message: `${intl.formatMessage(messages.errorCommodityDescription)}`}]
                                                        })
                                                            (
                                                                (<Input allowClear placeholder={intl.formatMessage(messages.ipHolder)} />)
                                                            )}
                                                    </Form.Item>
                                                </div>
                                            </Col>
                                            <Col xs={{ span: 4 }} sm={{ span: 4 }} lg={{ span: 4 }} className="gutter-row">
                                                <div className="gutter-box">
                                                    <Form.Item label={intl.formatMessage(messages.unitValue)}>
                                                        {getFieldDecorator('unit_value', {
                                                            rules: [{ required: true, message: `${intl.formatMessage(messages.errorCommodityUnitValue)}` }]
                                                            ,initialValue: null
                                                        })
                                                            (<NumberFormat
                                                                className="ant-input"
                                                                placeholder={intl.formatMessage(messages.ipHolder)}
                                                                thousandSeparator={true}
                                                                decimalScale={2}
                                                                fixedDecimalScale={true}
                                                                allowNegative={false} />)}
                                                    </Form.Item>
                                                </div>
                                            </Col>
                                            <Col xs={{ span: 4 }} sm={{ span: 4 }} lg={{ span: 4 }} className="gutter-row">
                                                <div className="gutter-box">
                                                    <Form.Item label={intl.formatMessage(messages.unitVolume)}>
                                                        {getFieldDecorator('unit_kg', {
                                                            rules: [{ required: true, message: `${intl.formatMessage(messages.errorCommodityUnitVolume)}` }]
                                                            ,initialValue: null
                                                        })
                                                            (<NumberFormat
                                                                className="ant-input"
                                                                placeholder={intl.formatMessage(messages.ipHolder)}
                                                                thousandSeparator={true}
                                                                decimalScale={2}
                                                                fixedDecimalScale={true}
                                                                allowNegative={false} />
                                                            )}
                                                    </Form.Item>
                                                </div>
                                            </Col>

                                            <Col xs={{ span: 4 }} sm={{ span: 4 }} lg={{ span: 4 }} className="gutter-row">
                                                <div className="gutter-box">
                                                    <Form.Item label={intl.formatMessage(messages.unitCurrency)}>
                                                        {getFieldDecorator('currency', {
                                                            rules: [{ required: true, message: `${intl.formatMessage(messages.errorCommodityCurrency)}` }],
                                                            initialValue: lstCurrency && lstCurrency.length > 0 ?  lstCurrency[1].value : null
                                                        })
                                                            (
                                                                <Select
                                                                    showSearch
                                                                    style={{ width: 100 + "%" }}
                                                                    placeholder={intl.formatMessage(messages.slcHolder)}
                                                                    optionFilterProp="children"
                                                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                                >
                                                                    {this.showSelectList(lstCurrency)}
                                                                </Select>
                                                            )}
                                                    </Form.Item>
                                                </div>
                                            </Col>

                                            <Col xs={{ span: 4 }} sm={{ span: 4 }} lg={{ span: 4 }} className="gutter-row">
                                                <div className="gutter-box">
                                                    <Form.Item label={intl.formatMessage(messages.country)}>
                                                        {getFieldDecorator('country')
                                                            (<Input allowClear placeholder={intl.formatMessage(messages.ipHolder)} />)}
                                                    </Form.Item>
                                                </div>
                                            </Col>

                                        </Row>)}
                                        { !order.id ?
                                        (<Row gutter={24}>
                                            <Col xs={{ span: 6 }} sm={{ span: 6 }} lg={{ span: 6 }} className="gutter-row">
                                                <div className="gutter-box text-left">
                                                    <Button type="primary" htmlType="button" className="mr-10" onClick={() => this.handleAddMore('commodity', order)}>
                                                        <FormattedMessage {...messages.addMore} />
                                                    </Button>
                                                </div>
                                            </Col>
                                        </Row>) : ''
                                        }

                                    </Card>
                                    <Card title="Packages">
                                        { order.package && order.package.length > 0 ? this.showPackage(order.package) :
                                            (<Row gutter={24}>
                                            <Col xs={{ span: 4 }} sm={{ span: 4 }} lg={{ span: 4 }} className="gutter-row">
                                                <div className="gutter-box">
                                                    <Form.Item label={intl.formatMessage(messages.packageName)}>
                                                        {getFieldDecorator('name')
                                                            (
                                                                (<Input allowClear placeholder={intl.formatMessage(messages.ipHolder)} />)
                                                            )}
                                                    </Form.Item>
                                                </div>
                                            </Col>
                                            <Col xs={{ span: 4 }} sm={{ span: 4 }} lg={{ span: 4 }} className="gutter-row">
                                                <div className="gutter-box">
                                                    <Form.Item label={intl.formatMessage(messages.length)}>
                                                        {getFieldDecorator('length', {
                                                            rules: [{ required: true, message: `${intl.formatMessage(messages.errorPackageLength)}` }]
                                                            ,initialValue: null
                                                        })
                                                            (<NumberFormat
                                                                className="ant-input"
                                                                placeholder={intl.formatMessage(messages.ipHolder)}
                                                                thousandSeparator={true}
                                                                decimalScale={2}
                                                                fixedDecimalScale={true}
                                                                allowNegative={false} />
                                                            )}
                                                    </Form.Item>
                                                </div>
                                            </Col>
                                            <Col xs={{ span: 4 }} sm={{ span: 4 }} lg={{ span: 4 }} className="gutter-row">
                                                <div className="gutter-box">
                                                    <Form.Item label={intl.formatMessage(messages.width)}>
                                                        {getFieldDecorator('width', {
                                                            rules: [{ required: true, message: `${intl.formatMessage(messages.errorPackageWidth)}` }]
                                                            ,initialValue: null
                                                        })
                                                            (<NumberFormat
                                                                className="ant-input"
                                                                placeholder={intl.formatMessage(messages.ipHolder)}
                                                                thousandSeparator={true}
                                                                decimalScale={2}
                                                                fixedDecimalScale={true}
                                                                allowNegative={false} />
                                                            )}
                                                    </Form.Item>
                                                </div>
                                            </Col>
                                            <Col xs={{ span: 4 }} sm={{ span: 4 }} lg={{ span: 4 }} className="gutter-row">
                                                <div className="gutter-box">
                                                    <Form.Item label={intl.formatMessage(messages.height)}>
                                                        {getFieldDecorator('height', {
                                                            rules: [{ required: true, message: `${intl.formatMessage(messages.errorPackageHeight)}` }]
                                                            ,initialValue: null
                                                        })
                                                            (<NumberFormat
                                                                className="ant-input"
                                                                placeholder={intl.formatMessage(messages.ipHolder)}
                                                                thousandSeparator={true}
                                                                decimalScale={2}
                                                                fixedDecimalScale={true}
                                                                allowNegative={false} />
                                                            )}
                                                    </Form.Item>
                                                </div>
                                            </Col>

                                            <Col xs={{ span: 4 }} sm={{ span: 4 }} lg={{ span: 4 }} className="gutter-row">
                                                <div className="gutter-box">
                                                    <Form.Item label={intl.formatMessage(messages.volume)}>
                                                        {getFieldDecorator('volume', {
                                                            rules: [{ required: true, message: `${intl.formatMessage(messages.errorPackageVolume)}` }]
                                                            ,initialValue: null
                                                        })
                                                            (<NumberFormat
                                                                className="ant-input"
                                                                placeholder={intl.formatMessage(messages.ipHolder)}
                                                                thousandSeparator={true}
                                                                decimalScale={2}
                                                                fixedDecimalScale={true}
                                                                allowNegative={false} />
                                                            )}
                                                            <ErrorForm error_list={error_list} item_name="volume"></ErrorForm>
                                                    </Form.Item>
                                                </div>
                                            </Col>

                                            <Col xs={{ span: 4 }} sm={{ span: 4 }} lg={{ span: 4 }} className="gutter-row">
                                                <div className="gutter-box">
                                                    <Form.Item label={intl.formatMessage(messages.type)}>
                                                        {getFieldDecorator('type', {
                                                            rules: [{ required: true, message: `${intl.formatMessage(messages.errorPackageType)}` }],
                                                            initialValue: listPackageType && listPackageType.length > 0 ?  listPackageType[0].value : null
                                                        })
                                                            (<Select
                                                                showSearch
                                                                style={{ width: 100 + "%" }}
                                                                placeholder={intl.formatMessage(messages.slcHolder)}
                                                                optionFilterProp="children"
                                                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                            >
                                                                {this.showSelectList(listPackageType)}
                                                            </Select>
                                                            )}
                                                    </Form.Item>
                                                </div>
                                            </Col>
                                        </Row>)}
                                    </Card>
                                </div>
                                { !order.id ?
                                    (<div className="box-footer">
                                        <Row gutter={24}>
                                            <Col xs={{ span: 24 }} className="gutter-row">
                                                <div className="gutter-box text-right">
                                                    <Button type="primary" htmlType="submit" className="mr-10" disabled={this.hasErrors(getFieldsError())} loading={loading}>
                                                        <FormattedMessage {...messages.buttonSave} />
                                                    </Button>
                                                    <Button onClick={this.handleReset}>
                                                        <FormattedMessage {...messages.buttonCancel} />
                                                    </Button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>) : ''}
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

const WrappedSearchForm = Form.create({ name: 'normal_search' })(CreateOrderForm);
export default injectIntl(WrappedSearchForm);