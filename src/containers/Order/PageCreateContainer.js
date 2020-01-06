import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actFetchListRequest } from './../../actions';
import { FETCH_MANIFEST_LIST, FETCH_IMPORT_MANIFEST_LIST, FETCH_STATUS_LIST, FETCH_COUNTRY_LIST } from './../../constants/ActionTypes';
import CreateOrderPage from '../../pages/Order/CreateOrderPage';
import { actUpdateItem, actGetOrder } from './../../actions/order';
import { withRouter } from 'react-router-dom';


class PageCreateContainer extends Component {

    componentDidMount() {

        let { onFetchList } = this.props;
        onFetchList(FETCH_IMPORT_MANIFEST_LIST);
        onFetchList(FETCH_MANIFEST_LIST);
        onFetchList(FETCH_STATUS_LIST);
        onFetchList(FETCH_COUNTRY_LIST);
    }

    render() {
        let { lstManifest, lstManifestImport, orderImport, onFetchList, lstStatus, lstCountry, id } = this.props;
        return (
            <CreateOrderPage
                orderImport={orderImport}
                lstManifest={lstManifest}
                lstManifestImport={lstManifestImport}
                onFetchList={onFetchList}
                lstStatus={lstStatus}
                lstCountry={lstCountry}
                id={id} />
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        lstManifest: state.lstManifest,
        lstManifestImport: state.lstManifestImport,
        orderImport: state.orderImport,
        lstStatus: state.lstStatus,
        lstCountry: state.lstCountry,
        id: ownProps.match.params.id
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchList: (type) => {
            dispatch(actFetchListRequest(type));
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PageCreateContainer));
