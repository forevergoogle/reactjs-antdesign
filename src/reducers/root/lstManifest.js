import { FETCH_MANIFEST_LIST } from './../../constants/ActionTypes';
let initialState = [];

const lstManifest = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MANIFEST_LIST:
            let { data } = action;
            if (data && data._embedded && data._embedded.manifest_data && data._embedded.manifest_data.length > 0) {
                state = data._embedded.manifest_data.map(item => {
                    return ({
                        value: item.id,
                        label: item.manifest_number,
                        transport_model: item.transport_model,
                        origin_branch_id: parseInt(item.origin_branch_id),
                        origin_country_id: item.origin_country_id,
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