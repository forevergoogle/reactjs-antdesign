import React, { Component } from 'react';
import { connect } from 'react-redux';
import OrderImportPage from './../../pages/Order/OrderImportPage';
import { actFetchListRequest } from './../../actions';
import { FETCH_IMPORT_MANIFEST_LIST } from './../../constants/ActionTypes';
import { actFetchImport } from './../../actions/order';

class PageContainer extends Component {

    componentDidMount() {
        let { onFetchList } = this.props;
        onFetchList(FETCH_IMPORT_MANIFEST_LIST);
    }

    render() {
        let { lstManifest, orderImport, onFetchList, onFetchImport } = this.props;
        return (
            <OrderImportPage
                orderImport={orderImport}
                lstManifest={lstManifest}
                onFetchList={onFetchList}
                onFetchImport={onFetchImport} />
        );
    }
}

const mapStateToProps = state => {
    return {
        lstManifest: state.lstManifestImport,
        orderImport: state.orderImport,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchList: (type) => {
            dispatch(actFetchListRequest(type));
        },
        onFetchImport: (data) => {
            dispatch(actFetchImport(data));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageContainer);
