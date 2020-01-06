import React, { Component } from 'react';
import { connect } from 'react-redux';
import ManifestPage from './../../pages/ManifestPage/ManifestPage';
import { actFetchListRequest } from './../../actions';
import { FETCH_BRANCH_LIST } from './../../constants/ActionTypes';

class PageContainer extends Component {

    componentDidMount() {
        let { lstBranch, onFetchList } = this.props;
        if(lstBranch.length == 0) {
            onFetchList(FETCH_BRANCH_LIST);
        }
    }

    render() {
        let { lstBranch } = this.props;
        return (
            <ManifestPage lstBranch={lstBranch} />
        );
    }
}

const mapStateToProps = state => {
    return {
        lstBranch: state.lstBranch
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