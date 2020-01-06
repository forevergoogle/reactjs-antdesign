import { FETCH_BRANCH_LIST } from './../../constants/ActionTypes';
let initialState = [];

const lstBranch = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BRANCH_LIST:
            let { data } = action;
            if (data && data._embedded && data._embedded.branch && data._embedded.branch.length > 0) {
                state = data._embedded.branch.map(item => {
                    return ({
                        value: item.id,
                        label: item.name,
                        country_id: +item.country_id,
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

export default lstBranch;