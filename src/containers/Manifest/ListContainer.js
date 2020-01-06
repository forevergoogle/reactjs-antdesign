import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import List from './../../components/Manifest/List';
import { actChangeQuery, actAddUpdateRequest, actSearchRequest, actGetDeleteRequest, actGetItem, actGetExportRequest } from './../../actions/manifest';

class ListContainer extends Component {

    render() {
        let { data, query, lstBranch, loading , manifest, 
            onChangeQuery, onSearch, onAddUpdateItem, onGetDeleteRequest, onExportManifest, onResetItem, language } = this.props;
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
                onExportManifest = {onExportManifest}
                // checkExport = {checkExport}
                language={language}
            />
        );
    }
}

ListContainer.propTypes = {
    query: PropTypes.shape({
        transport_model: PropTypes.string.isRequired,
        origin_branch_id: PropTypes.string.isRequired,
        manifest_number: PropTypes.string.isRequired,
        create_date_from: PropTypes.string.isRequired,
        create_date_to: PropTypes.string.isRequired,
        page_size: PropTypes.number.isRequired,
        page: PropTypes.number.isRequired
    })
}

const mapStateToProps = state => {
    return {
        query: state.manifestSearch,
        data: state.manifest,
        manifest: state.manifestItem,
        language: state.language
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearch: (query, lang) => {
            dispatch(actSearchRequest(query, lang));
        },
        onChangeQuery: (query) => {
            dispatch(actChangeQuery(query));
        },
        onAddUpdateItem: (type, item, query, setStateAction, resetFields, onResetItem, lang, intl) => {
            dispatch(actAddUpdateRequest(type, item, query, setStateAction, resetFields, onResetItem, lang, intl));
        },
        onGetDeleteRequest: (type, id, query, loading, lang) => {
            dispatch(actGetDeleteRequest(type, id, query, loading, lang));
        },
        onResetItem: () => {
            dispatch(actGetItem({}));
        },
        onExportManifest: (id, query,lang) => {
            dispatch(actGetExportRequest(id, query, lang));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer);