import React, { Component } from 'react';
import XLSX from 'xlsx';
import { find, sortBy, remove, indexOf } from 'lodash';
import { withRouter } from 'react-router-dom';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import { Row, Col, Form, Select, Button, Icon, Upload, Modal, message } from 'antd';
import { API_TYPE_ADD, API_TYPE_DELETE, listFileItem_EN, listMessage_EN, listFileItem_VI, listMessage_VI, maxSizeImport } from './../../../constants/constants';
import { FETCH_IMPORT_MANIFEST_LIST } from './../../../constants/ActionTypes';
import { isDecimal, isNumber } from './../../../utils/validation';
import { actImportRequest } from './../../../actions/order';
import { BASE_URL } from './../../../constants/Config';
import Helpers from './../../../utils/Helpers';

const Option = Select.Option;
const confirm = Modal.confirm;
let useworker = typeof Worker !== 'undefined';
let loading = '';

const messages = defineMessages({
    slcHolder: {
        id: 'Genaral.Select.placeholder',
        defaultMessage: 'Select...',
    },
    importTitle: {
        id: 'Genaral.ImportForm.title',
        defaultMessage: 'Import Form',
    },
    fileUpload: {
        id: 'OrderImport.FileUpload.title',
        defaultMessage: 'File Upload',
    },
    buttonFileUpload: {
        id: 'OrderImport.ButtonFileUpload.title',
        defaultMessage: 'Select File',
    },
    importTeplate: {
        id: 'OrderImport.TemplateImport.title',
        defaultMessage: 'Template Import',
    },
    txtDownLoad: {
        id: 'OrderImport.DownLoadText.text',
        defaultMessage: 'Download template',
    },
    buttonClear: {
        id: 'Genaral.ButtonClear.title',
        defaultMessage: 'Clear',
    },
    buttonImport: {
        id: 'Genaral.ButtonImport.title',
        defaultMessage: 'Import',
    },
    loading: {
        id: 'Genaral.Loading.title',
        defaultMessage: 'Action in process....',
    },
    errorManifest: {
        id: 'OrderImport.ManifestError.message',
        defaultMessage: 'Please select manifest no',
    },
    errorFile: {
        id: 'OrderImport.FileError.message',
        defaultMessage: 'Please select file',
    },
    askImport: {
        id: 'OrderImport.Table.AskImport.text',
        defaultMessage: 'Are you sure to import valid items into system ?',
    },
    askCheckImport: {
        id: 'OrderImport.Table.AskCheckFile.text',
        defaultMessage: 'This file is large and may take a few moments. Your browser may lock up during this process. Shall we play?',
    },
    notifySuccess: {
        id: 'OrderImport.Table.Notify.successText',
        defaultMessage: 'Imported success!',
    },
    notifyCheckError: {
        id: 'OrderImport.Table.NotifyCheckError.text',
        defaultMessage: 'Order(s) invalid. Please check the this below to fix.',
    }
});

class ImporForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            validImport: false,
            loading: false,
            isUsed: false,
            isFirst: true,
        }
    }

    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
    }

    componentWillReceiveProps(nextProps) {
        let { lstManifest, match, form } = nextProps;
        if (match.params.id) {
            let item = find(lstManifest, { value: parseInt(match.params.id) });
            if (item && this.state.isFirst) {
                form.setFieldsValue({
                    manifest_data_id: item.value
                });
                this.setState({
                    isUsed: true,
                    isFirst: false
                })
            }
        }
    }

    findDuplicates = (data) => {
        let result = [];
        data.forEach(function (element, index) {
            let index_item = data.findIndex(function (item) {
                return item[1] === element[1]
            });
            if (index_item !== index && index_item !== -1 && result.indexOf(element[1]) === -1 && (element[1] && element[1].length > 0)) {
                result.push(element[1]);
            }
        });
        return result;
    }

    fixdata = (data) => {
        let o = "", l = 0, w = 10240;
        for (; l < data.byteLength / w; ++l)
            o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
        o += String.fromCharCode.apply(null, new Uint8Array(data.slice(o.length)));
        return o;
    }

    sheetjsw = (data, cb, readtype) => {
        let { intl } = this.props;
        // show loading page
        loading = message.loading(`${intl.formatMessage(messages.loading)}`, 0);
        let worker = new Worker(`${BASE_URL}/public/dist/js/sheetjsw.js`);
        worker.onmessage = function (e) {
            switch (e.data.t) {
                case 'ready': break;
                case 'e': console.error(e.data.d); break;
                case 'xlsx':
                    cb(JSON.parse(e.data.d)); break;
            }
        };
        worker.postMessage({ d: data, b: readtype, t: 'xlsx' });
    }

    checkData = (data) => {
        // Init order
        let orders = [], order = {}, orders_valid = [], response = {}, commodities = [];
        let count = 0, count_error = 0, count_check = 0;
        let { language, onFetchImport } = this.props;
        if (data) {
            let duplicates = this.findDuplicates(data);
            let listFileItem = language == 'en' ? listFileItem_EN : listFileItem_VI;
            let listMessage = language == 'en' ? listMessage_EN : listMessage_VI;
            data.forEach((item) => {
                count_check++;
                if (item.length > 1 && count_check > 1) {
                    if(item[0]) {
                        if(order.stt) {
                            order.commodities = commodities;
                            orders_valid.push(order);
                            orders.push(order);
                            commodities = [];
                        }
                        count++;
                        let valid = true;
                        let error_message = [];
                        if (!item[4] || !item[5] || !item[6] || !item[10] || !item[11] || !item[12] || !item[13]
                            || !item[14] || !item[15] || !item[16] || !item[19] || !item[20] || !item[21]
                            || !item[22] || !item[23] || !item[24] || !item[25] || !item[26] || !item[27] || !item[31]) {
                            valid = false;
                            count_error++;
                            for (let i = 1; i <= 31; i++) {
                                if (!item[i]) {
                                    error_message.push({
                                        column: i - 1,
                                        message: listFileItem[i - 1] + listMessage[0]
                                    })
                                }
                            }
                        } else {
                            if (item[4].trim().length == 0 || item[5].trim().length == 0
                            || item[6].trim().length == 0 || item[10].trim().length == 0
                            || item[11].trim().length == 0 || item[12].trim().length == 0 
                            || item[13].trim().length == 0 || item[14].trim().length == 0
                            || item[15].trim().length == 0 || item[16].trim().length == 0
                            || item[19].trim().length == 0 || item[20].trim().length == 0
                            || item[21].trim().length == 0 || item[22].trim().length == 0
                            || item[23].trim().length == 0 || item[24].trim().length == 0
                            || item[25].trim().length == 0 || item[26].trim().length == 0
                            || item[27].trim().length == 0 || item[31].trim().length == 0) {
                                valid = false;
                                count_error++;
                                for (let i = 1; i <= 31; i++) {
                                    if (item[i].trim().length == 0) {
                                        error_message.push({
                                            column: i - 1,
                                            message: listFileItem[i - 1] + listMessage[0]
                                        });
                                    }
                                }
                            } else {
                                if(item[1]) {
                                    if (duplicates.length > 0) {
                                        if (duplicates.indexOf(item[1].trim()) !== -1) {
                                            if (valid) {
                                                count_error++;
                                            }
                                            valid = false;
                                            error_message.push({
                                                column: 0,
                                                message: listMessage[3]
                                            });
                                        }
                                    }
                                }
                                if (isDecimal(item[19].trim())) {
                                    if (valid) {
                                        count_error++;
                                    }
                                    valid = false;
                                    error_message.push({
                                        column: 18,
                                        message: listFileItem[18] + listMessage[1]
                                    });
                                }
                                if (isDecimal(item[20].trim())) {
                                    if (valid) {
                                        count_error++;
                                    }
                                    valid = false;
                                    error_message.push({
                                        column: 19,
                                        message: listFileItem[19] + listMessage[1]
                                    });
                                }
                                if (isDecimal(item[21].trim())) {
                                    if (valid) {
                                        count_error++;
                                    }
                                    valid = false;
                                    error_message.push({
                                        column: 20,
                                        message: listFileItem[20] + listMessage[1]
                                    });
                                }
                                if (isDecimal(item[22].trim())) {
                                    if (valid) {
                                        count_error++;
                                    }
                                    valid = false;
                                    error_message.push({
                                        column: 21,
                                        message: listFileItem[21] + listMessage[1]
                                    });
                                }
                                if (isDecimal(item[25].trim())) {
                                    if (valid) {
                                        count_error++;
                                    }
                                    valid = false;
                                    error_message.push({
                                        column: 24,
                                        message: listFileItem[24] + listMessage[1]
                                    });
                                }
                                if (isDecimal(item[26].trim())) {
                                    if (valid) {
                                        count_error++;
                                    }
                                    valid = false;
                                    error_message.push({
                                        column: 25,
                                        message: listFileItem[25] + listMessage[1]
                                    });
                                }
                                if (!isNumber(item[16].trim())) {
                                    if (valid) {
                                        count_error++;
                                    }
                                    valid = false;
                                    error_message.push({
                                        column: 15,
                                        message: listFileItem[15] + listMessage[1]
                                    });
                                }
                                if (item[17] && !isNumber(item[17].trim())) {
                                    if (valid) {
                                        count_error++;
                                    }
                                    valid = false;
                                    error_message.push({
                                        column: 16,
                                        message: listFileItem[16] + listMessage[1]
                                    });
                                }
                                //Check length VNPost no
                                // if (item[2].trim().length !== 13) {
                                //     if (valid) {
                                //         count_error++;
                                //     }
                                //     valid = false;
                                //     error_message.push({
                                //         column: 1,
                                //         message: listFileItem[1] + listMessage[2]
                                //     });
                                // }
                            }
                        }
                        let packages = [{
                                name:item[18] ? item[18].trim() : '',
                                length:item[19] ? item[19].trim() : '',
                                width:item[20] ? item[20].trim() : '',
                                height:item[21] ? item[21].trim() : '',
                                kg:item[22] ? item[22].trim() : '',
                                type:item[23] ? item[23].trim() : ''
                            }];
                        let commodity = {
                            description: item[24] ? item[24].trim() : '',
                            unit_value: item[25] ? item[25].trim() : '',
                            unit_kg: item[26] ? item[26].trim() : '',
                            currency: item[27] ? item[27].trim() : '',
                            country: item[28] ? item[28].trim() : ''
                        };
                        commodities.push(commodity);


                        // make an order 
                        order = {
                            stt: count,
                            tracking_no: item[1] ? item[1].trim() : '',
                            origin_country: item[2] ? item[2].trim() : '',
                            origin_city: item[3] ? item[3].trim() : '',
                            destination_country: item[4] ? item[4].trim() : '',
                            destination_suburb: item[5] ? item[5].trim() : '',
                            destination_city: item[6] ? item[6].trim() : '',
                            pickup_address: item[7] ? item[7].trim() : '',
                            origin_zipcode: item[8] ? item[8].trim() : '',
                            receiver_building_name: item[9] ? item[9].trim() : '',
                            receiver_address: item[10] ? item[10].trim() : '',
                            receiver_name: item[11] ? item[11].trim() : '',
                            receiver_contact_name: item[12] ? item[12].trim() : '',
                            receiver_phone: item[13] ? item[13].trim() : '',
                            receiver_email: item[14] ? item[14].trim() : '',
                            dest_zipcode: item[15] ? item[15].trim() : '',
                            service_type: item[16] ? item[16].trim() : '',
                            tracking_type: item[17] ? item[17].trim() : '',
                            package: packages ? packages : {},
                            commodities: [],
                            show_package: false,
                            show_commodities: false,
                            note: item[29] ? item[29].trim() : '',
                            payment_method: item[30] ? item[30].trim() : '',
                            content: item[31] ? item[31].trim() : '',
                            check: valid,
                            error_message: error_message,
                        };
                    } else {
                        let valid = true;
                        let error_message = [];
                        if (!item[24] || !item[25] || !item[26] || !item[27]) {
                            valid = false;
                            count_error++;
                            for (let i = 1; i <= 31; i++) {
                                if (!item[i]) {
                                    error_message.push({
                                        column: i - 1,
                                        message: listFileItem[i - 1] + listMessage[0]
                                    })
                                }
                            }
                        } else {
                            if (item[24].trim().length == 0 || item[25].trim().length == 0 ||
                                item[26].trim().length == 0 || item[27].trim().length == 0) {
                                valid = false;
                                count_error++;
                                for (let i = 1; i <= 31; i++) {
                                    if (item[i].trim().length == 0) {
                                        error_message.push({
                                            column: i - 1,
                                            message: listFileItem[i - 1] + listMessage[0]
                                        });
                                    }
                                }
                            }
                            if (isDecimal(item[25].trim())) {
                                if (valid) {
                                    count_error++;
                                }
                                valid = false;
                                error_message.push({
                                    column: 24,
                                    message: listFileItem[24] + listMessage[1]
                                });
                            }
                            if (isDecimal(item[26].trim())) {
                                if (valid) {
                                    count_error++;
                                }
                                valid = false;
                                error_message.push({
                                    column: 25,
                                    message: listFileItem[25] + listMessage[1]
                                });
                            }
                        }

                        let commodity = {
                            description: item[24] ? item[24].trim() : '',
                            unit_value: item[25] ? item[25].trim() : '',
                            unit_kg: item[26] ? item[26].trim() : '',
                            currency: item[27] ? item[27].trim() : '',
                            country: item[28] ? item[28].trim() : ''
                        };
                        commodities.push(commodity);
                    }
                    if(count_check == data.length) {
                        if(order.stt) {
                            order.commodities = commodities;
                            orders_valid.push(order);
                            orders.push(order);
                        }
                    }
                }
            });
        }
        if (orders) {
            orders.map((item, index) =>{
                item.stt = index + 1;
            });
            orders = sortBy(orders, ['check', 'stt']);
            this.setState({
                orders: orders_valid,
                validImport: true
            });

            response = {
                orders: orders,
                valid: orders.length - count_error,
                inValid: count_error
            }
            // hide loading
            setTimeout(loading, 0);
            onFetchImport(response);
        }
    }

    to_json = (workbook) => {
        if (useworker && workbook.SSF) XLSX.SSF.load_table(workbook.SSF);
        let result = {};
        /* Get worksheet */
        let worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        result[workbook.SheetNames[0]] = data;
        this.checkData(data);
        return result;
    }

    process_wb = (wb) => {
        let sheet_name = wb.SheetNames[0];
        this.to_json(wb)[sheet_name];
    }

    onChangeFile = (e) => {
        let reader = new FileReader();
        let rABS = typeof FileReader !== 'undefined' && FileReader.prototype && FileReader.prototype.readAsBinaryString;
        const scope = this;
        let { intl } = this.props;
        reader.onload = (e) => {
            let data = e.target.result;
            let wb, arr;
            let readtype = { type: rABS ? 'binary' : 'base64' };
            if (!rABS) {
                arr = scope.fixdata(data);
                data = btoa(arr);
            }
            function doit() {
                try {
                    if (useworker) {
                        scope.sheetjsw(data, scope.process_wb, readtype); return;
                    }
                    // Read excel by type
                    wb = XLSX.read(data, readtype);
                    scope.process_wb(wb);
                } catch (e) { console.log(e); }
            }
            if (e.target.result.length > 1e6) {
                let title = `${intl.formatMessage(messages.askCheckImport)}`;
                confirm({
                    title,
                    zIndex: 1031,
                    onOk() {
                        { if (e) doit(); };
                    },
                    onCancel() { },
                });
            }
            else {
                doit();
            }
        }
        // Read file 
        if (e.fileList.length > 0) {
            if (rABS) { reader.readAsBinaryString(e.file); }
            else { reader.readAsArrayBuffer(e.file); }
        } else {
            this.props.onResetOrder();
        }
    }

    hasErrors = (fieldsError) => {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
    }

    handleReset = () => {
        let { form, onResetOrder } = this.props;
        let { getFieldsError } = form;
        this.hasErrors(getFieldsError())
        this.setState({ isUsed: false });
        onResetOrder();
        form.resetFields();
    }

    filter = (inputValue, path) => {
        return (path.some(option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1));
    }

    normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList.slice(-1);
    }

    setStateAction = (loading, isUsed) => {
        this.setState({ loading, isUsed });
    }

    processImportData = (orders, id, fileImport) => {
        let { onLogout, orderImport, onFetchImport, onFetchList, intl } = this.props;
        let that = this;
        let size = maxSizeImport;
        let count_import = 0;
        let sub_orders = [];

        let list_function = [];
        let error = false;
        let importSuccess = false;
        let currentTimestamp = Date.now();
        let fileName = fileImport.name.split('.')[0];
        fileName = fileName+currentTimestamp;
        // show loading page
        loading = message.loading(`${intl.formatMessage(messages.loading)}`, 0);
        orders.forEach((item, index) => {
            //push order into list to update
            sub_orders.push(item);
            // Check condition and send update request per 5000 rows 
            if ((count_import % size == (size - 1)) || index == orders.length - 1) {
                let data_update = sub_orders;
                sub_orders = [];
                let request = {
                    import_order: true,
                    order_list: data_update,
                    manifest_data_id: id,
                    file_name: fileName
                };
                list_function.push(actImportRequest(API_TYPE_ADD, request).then(async res => {
                    let data_update_check = data_update;

                    if (res.status && res.status == 9) {
                        onLogout(res);
                    } else if (res.status && res.status == 1) {
                        await this.setState({ error: true })
                        error = true;
                        let countError = 0;
                        // Error
                        let result = [];
                        let orders_valid = [];
                        if (res.error[0].item_error && res.error[0].item_error.length > 0) {
                            // Add to order list display in screen
                            orderImport.orders.forEach(item => {
                                let valid = true;
                                res.error[0].item_error.forEach(element => {
                                    if (element.tracking_no == item.tracking_no) {
                                        valid = false;
                                    }
                                });
                                if (!valid) {
                                    item.check = valid;
                                    let error_message = [];
                                    error_message.push({
                                        column: 0,
                                        message: res.error[0].error_message
                                    })
                                    item.error_message = error_message;
                                }
                                // valid false
                                if (item.check) {
                                    orders_valid.push(item);
                                }
                                if (!item.check) {
                                    countError++;
                                }
                                // add order to list
                                result.push(item);
                            });
                        } else {
                            result = orderImport.orders;
                        }

                        this.setState({
                            orders: orders_valid,
                        });
                        // Sorting to display in screen 
                        result = sortBy(result, ['check', 'stt']);
                        let response = {
                            orders: result,
                            valid: result.length - countError,
                            inValid: countError
                        }
                        //Send orders to list importing 
                        onFetchImport(response);
                        if (id) this.setStateAction(false, true);
                        else this.setStateAction(false, false);
                    } else {
                        importSuccess = true;
                        //Success
                        // data_update_check
                        let orders = orderImport.orders;
                        remove(orders, function (order) {
                            return indexOf(data_update_check, order) !== -1
                        });
                        orders = sortBy(orders, ['check', 'stt']);
                        let response = {
                            orders: orders,
                            valid: orderImport.countValid,
                            inValid: orderImport.countInvalid
                        }
                        //Send orders to list importing 
                        onFetchImport(response);
                    }
                }));
            }
            count_import++;
        });

        Promise.all(
            list_function
        ).then(function () {
            if (!error) {
                that.setState({
                    orders: [],
                    validImport: false,
                })
                let success_file = new FormData();
                success_file.append('send_file', true);
                success_file.append('import_order', true);
                success_file.append('attachment', fileImport);
                success_file.append('manifest_data_id', id);
                actImportRequest(API_TYPE_ADD, success_file).then(res => {
                    if (res.status && res.status == 9) {
                        that.props.onLogout(res);
                    } else if (res.status && res.status == 1) {
                    } else {
                        if (id) that.setStateAction(false, true);
                        else that.setStateAction(false, false);
                        that.handleReset();
                        onFetchList(FETCH_IMPORT_MANIFEST_LIST);
                        Helpers.showNotify('success', 'Success', `${intl.formatMessage(messages.notifySuccess)}`);
                    }
                });
            } else {
                Helpers.showNotify('error', 'Error', `${intl.formatMessage(messages.notifyCheckError)}`);
                that.setState({ validImport: false });
                if (importSuccess) {
                    // delete data insert false
                    let file_name = {file_name: fileName};
                    actImportRequest(API_TYPE_DELETE, file_name).then(res => {
                        if (res.status && res.status == 9) {
                            that.props.onLogout(res);
                        }
                    });
                }
            }
            // hide loading 
            setTimeout(loading, 0);
        })
    }

    handleSubmit = () => {
        let { form, match, onFetchList, onLogout, intl, orderImport, onFetchImport, language } = this.props;
        let { id } = match.params;
        let { isUsed, orders } = this.state;
        form.validateFields((err, values) => {
            if (!err) {
                this.setState({ loading: true, isUsed });
                // Order > 5000 record
                if (orders.length > maxSizeImport) {
                    this.processImportData(orders, values.manifest_data_id, values.file_upload[0].originFileObj);
                } else {
                    // Order <= 5000 record
                    let request = {
                        import_order: true,
                        order_list: orders,
                        manifest_data_id: values.manifest_data_id,
                    };
                    actImportRequest(API_TYPE_ADD, request).then(res => {
                        if (res.status && res.status == 9) {
                            onLogout();
                        } else if (res.status && res.status == 1) {
                            let countError = 0;
                            // Error
                            let result = [];
                            let orders_valid = [];
                            let listFileItem = language == 'en' ? listFileItem_EN : listFileItem_VI;
                            let listMessage = language == 'en' ? ' already exists' : ' đã tồn tại';
                            if (res.error[0].item_error && res.error[0].item_error.length > 0) {
                                // Add to order list display in screen
                                orderImport.orders.forEach(item => {
                                    let valid = true;
                                    res.error[0].item_error.forEach(element => {
                                        if (element.tracking_no == item.tracking_no) {
                                            valid = false;
                                        }
                                    });
                                    if (!valid) {
                                        item.check = valid;
                                        let error_message = [];
                                        error_message.push({
                                            column: 0,
                                            message: listFileItem[0] + listMessage
                                        })
                                        item.error_message = error_message;
                                    }
                                    // valid false
                                    if (item.check) {
                                        orders_valid.push(item);
                                    }
                                    if (!item.check) {
                                        countError++;
                                    }
                                    // add order to list
                                    result.push(item);
                                });
                            } else {
                                result = orderImport.orders;
                            }
                            this.setState({
                                orders: orders_valid,
                            });
                            // Sorting to display in screen 
                            result = sortBy(result, ['check', 'stt']);
                            let response = {
                                orders: result,
                                valid: result.length - countError,
                                inValid: countError
                            }
                            //Send orders to list importing 
                            onFetchImport(response);
                            if (id) this.setStateAction(false, true);
                            else this.setStateAction(false, false);
                            Helpers.showNotify('error', 'Error', res.error[0].error_message);
                        } else {
                            let request_file = new FormData();
                            request_file.append('send_file', true);
                            request_file.append('import_order', true);
                            request_file.append('attachment', values.file_upload[0].originFileObj);
                            request_file.append('manifest_data_id', values.manifest_data_id);
                            actImportRequest(API_TYPE_ADD, request_file).then(res => {
                                if (res.status && res.status == 9) {
                                    onLogout();
                                } else if (res.status && res.status == 1) {
                                    if (id) this.setStateAction(false, true);
                                    else this.setStateAction(false, false);
                                    Helpers.showNotify('error', 'Error', res.error[0].error_message);
                                } else {
                                    if (id) this.setStateAction(false, true);
                                    else this.setStateAction(false, false);
                                    this.handleReset();
                                    onFetchList(FETCH_IMPORT_MANIFEST_LIST);
                                    Helpers.showNotify('success', 'Success', `${intl.formatMessage(messages.notifySuccess)}`);
                                }
                            });
                        }
                    })
                }
            }
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        let that = this;
        let { intl } = this.props;
        let title = `${intl.formatMessage(messages.askImport)}`;
        confirm({
            title,
            zIndex: 1031,
            onOk() {
                that.handleSubmit();
            },
            onCancel() { },
        });
    }

    render() {
        const { lstManifest, form, intl } = this.props;
        const { getFieldDecorator, getFieldsError, isFieldTouched, getFieldError } = form;
        const { isUsed, loading } = this.state;
        const props = {
            beforeUpload: file => {
                return false;
            }
        }
        // Only show error after a field is touched.
        const manifest = isFieldTouched('manifest_data_id') && getFieldError('manifest_data_id');
        const file = isFieldTouched('file_upload') && getFieldError('file_upload');
        return (
            <Row gutter={24} >
                <Col lg={{ span: 24 }} className="gutter-row">
                    <div className="gutter-box">
                        <div className="box box-info">
                            <Form layout="vertical" onSubmit={this.onSubmit}>
                                <div className="box-header with-border">
                                    <h3 className="box-title">
                                        <FormattedMessage {...messages.importTitle} />
                                    </h3>
                                </div>
                                <div className="box-body">
                                    <Row gutter={24}>
                                        <Col sm={{ span: 12 }} lg={{ span: 6 }} className="gutter-row">
                                            <div className="gutter-box">
                                                <Form.Item
                                                    label="Manifest"
                                                    validateStatus={manifest ? 'error' : ''}
                                                    help={manifest || ''}
                                                >
                                                    {getFieldDecorator('manifest_data_id', {
                                                        rules: [{ required: true, message: `${intl.formatMessage(messages.errorManifest)}` }]
                                                    })
                                                        (<Select
                                                            showSearch
                                                            allowClear
                                                            disabled={isUsed}
                                                            style={{ width: 100 + "%" }}
                                                            placeholder={intl.formatMessage(messages.slcHolder)}
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
                                                <Form.Item
                                                    label={intl.formatMessage(messages.fileUpload)}
                                                    validateStatus={file ? 'error' : ''}
                                                    help={file || ''}
                                                >
                                                    {getFieldDecorator('file_upload', {
                                                        valuePropName: 'fileList',
                                                        getValueFromEvent: this.normFile,
                                                        rules: [{ required: true, message: `${intl.formatMessage(messages.errorFile)}` }]
                                                    })(<Upload
                                                        {...props}
                                                        onChange={this.onChangeFile}
                                                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel">
                                                        <Button>
                                                            <Icon type="upload" />
                                                            <FormattedMessage {...messages.buttonFileUpload} />
                                                        </Button>
                                                    </Upload>
                                                    )}
                                                </Form.Item>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row gutter={24}>
                                        <Col sm={{ span: 12 }} lg={{ span: 6 }} className="gutter-row">
                                            <div className="gutter-box">
                                                <Form.Item
                                                    label={intl.formatMessage(messages.importTeplate)}
                                                >
                                                    <a href={BASE_URL + 'public/resource/template/manifestTemplate.xlsx'} download><Icon type="download" /> <FormattedMessage {...messages.txtDownLoad} /></a>
                                                </Form.Item>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                <div className="box-footer">
                                    <Row gutter={24}>
                                        <Col xs={{ span: 24 }} className="gutter-row">
                                            <div className="gutter-box text-right">
                                                <Button
                                                    onClick={this.handleReset}
                                                    className="mr-10">
                                                    <FormattedMessage {...messages.buttonClear} />
                                                </Button>
                                                <Button
                                                    type="primary"
                                                    loading={loading}
                                                    htmlType="submit"
                                                    disabled={this.hasErrors(getFieldsError())}>
                                                    <FormattedMessage {...messages.buttonImport} />
                                                </Button>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Form>
                        </div>
                    </div>
                </Col>
            </Row >
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

const WrappedImporForm = Form.create({ name: 'normal_search' })(ImporForm);
export default injectIntl(withRouter(WrappedImporForm));