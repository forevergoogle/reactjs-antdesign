import { SEARCH_MANIFEST } from './../../constants/ActionTypes'
let initialState = {
    transport_model: '',
    origin_branch_id: '',
    create_date_from: '',
    create_date_to: '',
    manifest_number: '',
    page: 1,
    page_size: 10,
    total: 0,
    loading: false
};

const manifestSearch = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_MANIFEST:
            state = action.query;
            return {...state};
        default: return {...state};
    }
};

export default manifestSearch;
