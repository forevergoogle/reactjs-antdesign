import { FETCH_CUSTOMER_LIST } from './../../constants/ActionTypes';
let initialState = [];

const lstShipper = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CUSTOMER_LIST:
            let { data } = action;
            if (data && data._embedded && data._embedded.customer && data._embedded.customer.length > 0) {
                state = data._embedded.customer.map(item => {
                    return ({
                        value: item.id,
                        label: item.name
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

export default lstShipper;