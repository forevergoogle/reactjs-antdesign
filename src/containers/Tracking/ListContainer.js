import React, { Component } from 'react';
import { connect } from 'react-redux';
import List from './../../components/Tracking/List';
import { actSearchRequest, actChangeQuery } from './../../actions/tracking';

class ListContainer extends Component {

    render() {
        let { data, query, lstBranch, loading , manifest, 
            onChangeQuery, onSearch, onAddUpdateItem, onGetDeleteRequest, onResetItem, language, trackingCount } = this.props;
        return (
            <List
                data={data}
                query={query}
                loading={loading}
                manifest={manifest}
                lstBranch={lstBranch}
                onChangeQuery={onChangeQuery}
                onSearch={onSearch}
                onAddUpdateItem={onAddUpdateItem}
                onGetDeleteRequest={onGetDeleteRequest}
                onResetItem={onResetItem}
                language={language}
                trackingCount={trackingCount}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        query: state.orderSearch,
        data: state.tracking,
        language: state.language,
        trackingCount: state.trackingCount
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer);