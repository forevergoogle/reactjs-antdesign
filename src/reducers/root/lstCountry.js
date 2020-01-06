import { FETCH_COUNTRY_LIST } from './../../constants/ActionTypes';
let initialState = [];

const lstCountry = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_COUNTRY_LIST:
            let { data } = action;
            if (data && data._embedded && data._embedded.country && data._embedded.country.length > 0) {
                state = data._embedded.country.map(item => {
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

export default lstCountry;