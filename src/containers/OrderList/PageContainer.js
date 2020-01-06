import React, { Component } from 'react';
import { connect } from 'react-redux';
import TranshipmentPage from './../../pages/TranshipmentPage/TranshipmentPage';
import { actFetchListRequest } from './../../actions';
import { FETCH_COUNTRY_LIST, FETCH_BRANCH_LIST, FETCH_MANIFEST_LIST, FETCH_CUSTOMER_LIST, FETCH_STATUS_LIST, FETCH_FEE_LIST } from './../../constants/ActionTypes';
import OrderListPage from "../../pages/OrderListPage/OrderListPage";

class PageContainer extends Component {

    componentDidMount() {

        let { onFetchList } = this.props;
        onFetchList(FETCH_COUNTRY_LIST);
        onFetchList(FETCH_BRANCH_LIST);
        onFetchList(FETCH_MANIFEST_LIST);
        onFetchList(FETCH_CUSTOMER_LIST);
        onFetchList(FETCH_STATUS_LIST);
        onFetchList(FETCH_FEE_LIST);
    }

    render() {
        let { lstBranch, lstCountry, lstManifest, lstShipper, lstStatus, lstFee } = this.props;
        return (
            <OrderListPage
                lstFee={lstFee}
                lstBranch={lstBranch}
                lstStatus={lstStatus}
                lstCountry={lstCountry}
                lstManifest={lstManifest}
                lstShipper={lstShipper} />
        );
    }
}

const mapStateToProps = state => {
    return {
        lstFee: state.lstFee,
        lstBranch: state.lstBranch,
        lstStatus: state.lstStatus,
        lstCountry: state.lstCountry,
        lstManifest: state.lstManifest,
        lstShipper: state.lstShipper,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchList: (type) => {
            dispatch(actFetchListRequest(type));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageContainer);