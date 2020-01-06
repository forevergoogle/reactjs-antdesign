import React, { Component } from 'react';
import { connect } from 'react-redux';
import OrderList from './../../components/Order/OrderList';
import { actSearchRequest, actChangeQuery, actGetItem, actGetDeleteRequest, actAddUpdateRequest } from './../../actions/order';
import {actBagging} from "../../actions/order";

class ListContainer extends Component {

    render() {
        let { data, query, orderCount, lstBranch, loading , order, lstCountry, lstManifest, lstStatus,
            onChangeQuery, onSearch, onAddUpdateItem, onGetDeleteRequest, onResetItem, lstFee, onUpdateItem, language,
            onBagging } = this.props;
        return (
            <OrderList
                data={data}
                query={query}
                loading={loading}
                order={order}
                orderCount={orderCount}
                lstFee={lstFee}
                lstBranch={lstBranch}
                lstStatus={lstStatus}
                lstCountry={lstCountry}
                lstManifest={lstManifest}
                onChangeQuery={onChangeQuery}
                onSearch={onSearch}
                onAddUpdateItem={onAddUpdateItem}
                onGetDeleteRequest={onGetDeleteRequest}
                onResetItem={onResetItem}
                onUpdateItem={onUpdateItem}
                language={language}
                onBagging={onBagging}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        query: state.orderSearch,
        data: state.orders,
        order: state.orderItem,
        orderCount: state.orderCount,
        language: state.language
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearch: (query, isCount, lang) => {
            dispatch(actSearchRequest(query, isCount, lang));
        },
        onChangeQuery: (query) => {
            dispatch(actChangeQuery(query));
        },
        onAddUpdateItem: (type, item, query, setStateAction, resetFields, onResetItem, lang) => {
            dispatch(actAddUpdateRequest(type, item, query, setStateAction, resetFields, onResetItem, lang));
        },
        onGetDeleteRequest: (type, id, query, loading, lang) => {
            dispatch(actGetDeleteRequest(type, id, query, loading, lang));
        },
        onResetItem: () => {
            dispatch(actGetItem({}));
        }, 
        onUpdateItem: (data) => {
            dispatch(actGetItem(data));
        },
        onBagging: (data, lang) => {
            dispatch(actBagging(data, lang));
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer);