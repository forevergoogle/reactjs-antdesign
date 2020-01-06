import React, { Component } from 'react';
import { connect } from 'react-redux';
import TrackingPage from './../../pages/TrackingPage/TrackingPage';
import { actFetchListRequest } from './../../actions';
import { FETCH_COUNTRY_LIST, FETCH_STATUS_LIST, FETCH_BRANCH_LIST, FETCH_MANIFEST_LIST, FETCH_CUSTOMER_LIST } from './../../constants/ActionTypes';

class PageContainer extends Component {

    componentDidMount() {
        let { lstCountry, onFetchList } = this.props;
        if (lstCountry.length == 0) {
            onFetchList(FETCH_COUNTRY_LIST);
        }
        onFetchList(FETCH_BRANCH_LIST);
        onFetchList(FETCH_MANIFEST_LIST);
        onFetchList(FETCH_CUSTOMER_LIST);
        onFetchList(FETCH_STATUS_LIST);
    }

    render() {
        let { lstBranch, lstCountry, lstManifest, lstShipper, lstStatus } = this.props;
        return (
            <TrackingPage
                lstBranch={lstBranch}
                lstCountry={lstCountry}
                lstManifest={lstManifest}
                lstStatus={lstStatus}
                lstShipper={lstShipper} />
        );
    }
}

const mapStateToProps = state => {
    return {
        lstBranch: state.lstBranch,
        lstCountry: state.lstCountry,
        lstManifest: state.lstManifest,
        lstShipper: state.lstShipper,
        lstStatus: state.lstStatus
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