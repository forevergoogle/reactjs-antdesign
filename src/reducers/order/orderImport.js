import { FETCH_ORDER_IMPORT } from './../../constants/ActionTypes';
let initialState = {
    orders: [],
    valid: 0,
    inValid: 0,
};

const orderImport = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ORDER_IMPORT:
            let { data } = action;
            if (data && data.orders) {
                state = data;
            } else {
                state = {
                    orders: [],
                    valid: 0,
                    inValid: 0,
                }
            }
            return {...state};
        default:
            return state;
    }
};

export default orderImport;