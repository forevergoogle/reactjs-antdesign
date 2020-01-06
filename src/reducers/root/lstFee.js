import { FETCH_FEE_LIST } from './../../constants/ActionTypes';
let initialState = [];

const lstManifest = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_FEE_LIST:
            let { data } = action;
            if (data && data._embedded && data._embedded.fee && data._embedded.fee.length > 0) {
                state = data._embedded.fee.map(item => {
                    return ({
                        value: item.id,
                        label: item.name,
                        type: item.type,
                        fee: item.value,
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

export default lstManifest;