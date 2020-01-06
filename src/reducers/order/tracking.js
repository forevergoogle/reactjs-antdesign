import { FETCH_ORDER_TRACKING } from './../../constants/ActionTypes';
let initialState = [];

const tracking = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ORDER_TRACKING:
            let { data } = action;
            if (data && data._embedded && data._embedded.tracking && data._embedded.tracking.length > 0) {
                state = data._embedded.tracking.map((item) => {
                    let color = null;
                    if (parseInt(item.status_id) === 1 || parseInt(item.status_id) === 2 || parseInt(item.status_id) === 3) {
                        color = '#722ed1';
                    } else if (parseInt(item.status_id) === 4 || parseInt(item.status_id) === 5 || parseInt(item.status_id) === 6) {
                        color = '#1890ff';
                    } else if (parseInt(item.status_id) === 7 || parseInt(item.status_id) === 8) {
                        color = '#2f54eb';
                    } else if (parseInt(item.status_id) === 9 || parseInt(item.status_id) === 10 || parseInt(item.status_id) === 11) {
                        color = '#faad14';
                    } else if (parseInt(item.status_id) === 12) {
                        color = '#52c41a';
                    }
                    return ({
                        key: item.id,
                        vnpost_no: item.vnpost_no,
                        status_id: item.status_id,
                        destination_country_name: item.destination_country_name,
                        origin_country_name: item.origin_country_name,
                        status_name: item.status_name,
                        status_value: item.status_value,
                        tracking_type: item.tracking_type,
                        origin_branch_id: item.origin_branch_id,
                        destination_branch_id: item.destination_branch_id,
                        origin_country_id: item.origin_country_id,
                        destination_country_id: item.destination_country_id,
                        sender_name: item.sender_name,
                        sender_id: item.sender_id,
                        order_no: item.order_no,
                        create_date: item.create_date,
                        color: color,
                        list_transit: item.list_transit,
                        transport_model: item.transport_model
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

export default tracking;