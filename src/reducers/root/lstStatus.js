import { FETCH_STATUS_LIST } from './../../constants/ActionTypes';
let initialState = [];

const lstStatus = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_STATUS_LIST:
            let { data } = action;
            if (data && data._embedded && data._embedded.status && data._embedded.status.length > 0) {
                state = data._embedded.status.map(item => {
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

export default lstStatus;