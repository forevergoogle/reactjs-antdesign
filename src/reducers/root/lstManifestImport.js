import { FETCH_IMPORT_MANIFEST_LIST } from './../../constants/ActionTypes';
let initialState = [];

const lstManifestImport = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_IMPORT_MANIFEST_LIST:
            let { data } = action;
            if (data && data._embedded && data._embedded.manifest_data && data._embedded.manifest_data.length > 0) {
                state = data._embedded.manifest_data.map(item => {
                    return ({
                        value: item.id,
                        label: item.manifest_number
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

export default lstManifestImport;