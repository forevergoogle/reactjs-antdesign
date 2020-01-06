import React, { Component } from 'react';
import { connect } from 'react-redux';
import ImportForm from './../../components/Order/Import/ImportForm';
import { actFetchImport } from './../../actions/order';
import { actLogout } from './../../actions/login';

class ImportContainer extends Component {

    render() {
        let { lstManifest, orderImport, onResetOrder, onFetchImport, onFetchList, onLogout, language } = this.props;
        return (
            <ImportForm
                lstManifest={lstManifest}
                orderImport={orderImport}
                onResetOrder={onResetOrder}
                onFetchImport={onFetchImport}
                onFetchList={onFetchList}
                onLogout={onLogout}
                language={language}
            />
        );
    }
}
const mapStateToProps = state => {
    return {
        orderImport: state.orderImport,
        language: state.language
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // onFetchImport: (data) => {
        //     dispatch(actFetchImport(data));
        // },
        onResetOrder: () => {
            dispatch(actFetchImport());
        },
        onLogout: () => {
            dispatch(actLogout());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportContainer);