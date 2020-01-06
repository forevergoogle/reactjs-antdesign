import * as Types from './../../constants/ActionTypes';

let initialState = {};

const manifestItem = (state = initialState, action) => {
    switch (action.type) {
        case Types.EDIT_MANIFEST:
        let { data } = action;
            if (Object.keys(data).length > 0) {
                state = {
                    id: data.id,
                    manifest_number: data.manifest_number,
                    attactment_link: data.attactment_link,
                    transport_model: parseInt(data.transport_model),
                    origin_branch_id: parseInt(data.origin_branch_id),
                    status_id: parseInt(data.status_id),
                    start_date: data.start_date,
                    qty_of_bags: data.qty_of_bags,
                    gross_weight: data.gross_weight,
                    total_order: data.total_order,
                    weight: data.weight,
                    pcs: data.pcs,
                    note: data.note,
                };
            } else {
                state = {};
            }
            return {...state};
        default:
            return state;
    }
}

export default manifestItem;
