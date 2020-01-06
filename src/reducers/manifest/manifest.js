import { FETCH_MANIFEST } from './../../constants/ActionTypes';
let initialState = [];

const manifest = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MANIFEST:
            let { data } = action;
            if (data && data._embedded && data._embedded.manifest_data && data._embedded.manifest_data.length > 0) {
                state = data._embedded.manifest_data.map((item, index) => {
                    return ({
                        key: item.id,
                        idc: ((data.page - 1) * data.page_size) + (index + 1),
                        manifest_number: item.manifest_number,
                        status_id: item.status_id,
                        order_count: item.order_count,
                        gross_weight: item.gross_weight,
                        pcs: item.pcs,
                        note: item.note,
                        create_date: item.create_date,
                        attactment_link: item.attactment_link,
                        bag_transhipment_id: item.bag_transhipment_id,
                        flag_export: item.flag_export
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

export default manifest;