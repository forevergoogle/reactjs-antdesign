import { FETCH_ORDER } from './../../constants/ActionTypes';
let initialState = [];

const orders = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ORDER:
            let { data } = action;
            if (data && data._embedded && data._embedded.order && data._embedded.order.length > 0) {
                state = data._embedded.order.map((item, index) => {
                    return ({
                        key: item.id,
                        idc: ((data.page - 1) * data.page_size) + (index + 1),
                        sender_id: item.sender_id,
                        weight: item.weight,
                        order_no: item.order_no,
                        chk_bagging: item.chk_bagging,
                        manifest_number: item.manifest_number,
                        status_id: item.status_id,
                        manifest_status_id: item.manifest_status_id,
                        partner_no: item.partner_no,
                        tracking_no: item.tracking_no,
                        create_date: item.create_date,
                        status_name: item.status_name,
                        status_value: item.status_value,
                        item_content: item.item_content,
                        receiver_name: item.receiver_name,
                        receiver_phone: item.receiver_phone,
                        receiver_address: item.receiver_address,
                        declared_value: item.declared_value,
                        actual_date_of_pickup: item.actual_date_of_pickup,
                        actual_date_of_delivery: item.actual_date_of_delivery,
                        origin_country_name: item.origin_country_name,
                        destination_country_name: item.destination_country_name,
                        manifest_data_id : item.manifest_data_id,
                        bag_transhipment_id: item.bag_transhipment_id,
                        label_base64: item.label_base64
                    });
                });
            } else {
                state = [];
            }
            return [...state];
        default:
            return state;
    }
};

export default orders;