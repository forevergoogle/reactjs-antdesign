import { FETCH_DASHBOARD } from './../../constants/ActionTypes';
let initialState = {
    data: [],
    loading: true
};

const dashboard = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DASHBOARD:
            let { data } = action;
            let rs = [];
            if (data && data._embedded.dashboard.length > 0) {
                rs = data._embedded.dashboard.map((item, key) => {
                    return (
                        {
                            key: key,
                            transportModel:'Transhipment',
                            total_orders_closed: item.total_orders_closed,
                            total_orders_processing: item.total_orders_processing,
                            transport_fee: item.transport_fee,
                            total_orders_canceled: item.total_orders_canceled,
                            total_orders: item.total_orders
                        }
                    )
                })
            } else {
                rs = []
            }
            return {data: rs, loading: false};
        default:
            return state;
    }
};

export default dashboard;