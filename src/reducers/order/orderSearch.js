import { SEARCH_ORDER } from './../../constants/ActionTypes'
import { initIdStatusCreatedByCustomer } from './../../constants/constants'

let initialState = {
    order_no: '', 
    status_id: '', 
    origin_country_id: '', 
    destination_country_id: '', 
    actual_date_of_pickup: '', 
    origin_branch_id: '', 
    destination_branch_id: '', 
    manifest_data_id: '', 
    actual_date_of_delivery: '', 
    tracking_no: '', 
    receiver_address: '', 
    receiver_name: '', 
    create_date_from: '', 
    create_date_to: '',
    transport_model: '',
    search_status_id: '',
    bag_transhipment_id: '',
    label_base64: '',
    chk_bagging: false,
    page: 1,
    page_size: 10,
    total: 0,
    loading: false 
};

const orderSearch = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_ORDER:
            state = action.query;
            return {...state};
        default: return {...state};
    }
};

export default orderSearch;
