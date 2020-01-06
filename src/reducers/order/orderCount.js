import { FETCH_ORDER_COUNT } from './../../constants/ActionTypes';
let initialState = [];

const orderCount = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ORDER_COUNT:
            let { data } = action;
            if (data && data._embedded && data._embedded.order && data._embedded.order.length > 0) {
                state = data._embedded.order;
            } else {
                state = [];
            }
            return [...state];
        default:
            return state;
    }
};

export default orderCount;