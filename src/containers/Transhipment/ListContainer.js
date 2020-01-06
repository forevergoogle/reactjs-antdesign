import React, { Component } from 'react';
import { connect } from 'react-redux';
import List from './../../components/Order/List';
import { actSearchRequest, actChangeQuery, actGetItem, actGetDeleteRequest, actAddUpdateRequest } from './../../actions/order';

class ListContainer extends Component {

    render() {
        let { data, query, orderCount, lstBranch, loading , order, lstCountry, lstManifest, lstStatus,
            onChangeQuery, onSearch, onAddUpdateItem, onGetDeleteRequest, onResetItem, lstFee, onUpdateItem, language } = this.props;
        return (
            <List
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer);