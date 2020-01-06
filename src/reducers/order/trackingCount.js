import { FETCH_ORDER_TRACKING_COUNT } from './../../constants/ActionTypes';
let initialState = {};

const trackingCount = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ORDER_TRACKING_COUNT:
            let { data } = action;
            if (data && data._embedded && data._embedded.tracking && data._embedded.tracking[0]) {
                state = data._embedded.tracking[0];
            } else {
                state = {};
            }
            return {...state};
        default:
            return state;
    }
};

export default trackingCount;