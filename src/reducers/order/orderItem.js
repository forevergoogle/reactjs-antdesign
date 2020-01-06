import { EDIT_ORDER } from './../../constants/ActionTypes';

let initialState = {};

const orderItem = (state = initialState, action) => {
    switch (action.type) {
        case EDIT_ORDER:
            let { data } = action;
            if (Object.keys(data).length > 0) {
                state = {
                    id: data.id,
                    order_no: data.order_no,
                    connote: data.connote,
                    tracking_no: data.tracking_no,
                    manifest_data_id: data.manifest_data_id ? parseInt(data.manifest_data_id) : null,
                    transport_model: data.transport_model ? parseInt(data.transport_model) : null,
                    origin_country_id: data.origin_country ? parseInt(data.origin_country) : null,
                    origin_city: data.origin_city ? data.origin_city : null,
                    pickup_address: data.pickup_address ? data.pickup_address : null,
                    destination_country_id: data.destination_country ? parseInt(data.destination_country) : null,
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
                    actual_date_of_pickup: data.actual_date_of_pickup,
                    actual_date_of_delivery: data.actual_date_of_delivery,
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
                    error: data.error ? data.error : [],
                };
            } else {
                state = {};
            }
            return { ...state };
        default:
            return state;
    }
}

export default orderItem;
