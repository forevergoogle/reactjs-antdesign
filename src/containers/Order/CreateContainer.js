import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CreateOrderForm from './../../components/Order/CreateOrderForm';
import { actChangeQuery, actSearchRequest, actGetItem, actAddUpdateRequest, actGetOrder, actGetOrderRequest } from './../../actions/order';
import * as Type from './../../constants/constants';
import { EDIT_ORDER } from '../../constants/ActionTypes';

class CreateContainer extends Component {

    componentDidMount() {
        this.props.onResetItem();
        let { onGetOrder } = this.props;
        if (this.props.id) {
            onGetOrder(this.props.id);
        }
    }

    render() {
        let { query, lstBranch, lstCountry, lstManifest, lstManifestImport, lstShipper, lstStatus, onChangeQuery, onSearch, language, lstItem,
            order, onUpdateItem, onAddUpdateItem, onResetItem } = this.props;
        return (
            <CreateOrderForm
                query={query}
                lstStatus={lstStatus}
                // lstBranch={lstBranch}
                lstCountry={lstCountry}
                lstManifest={lstManifest}
                lstManifestImport={lstManifestImport}
                lstShipper={lstShipper}
                onChangeQuery={onChangeQuery}
                onSearch={onSearch}
                language={language}
                lstItem={lstItem}
                order={order}
                onUpdateItem={onUpdateItem}
                onAddUpdateItem={onAddUpdateItem}
                onResetItem={onResetItem}
            />
        );
    }
}

CreateContainer.propTypes = {
    query: PropTypes.shape({
        order_no: PropTypes.string.isRequired,
        status_id: PropTypes.string.isRequired,
        origin_country_id: PropTypes.string.isRequired,
        destination_country_id: PropTypes.string.isRequired,
        actual_date_of_pickup: PropTypes.string.isRequired,
        origin_branch_id: PropTypes.string.isRequired,
        destination_branch_id: PropTypes.string.isRequired,
        manifest_data_id: PropTypes.string.isRequired,
        actual_date_of_delivery: PropTypes.string.isRequired,
        tracking_no: PropTypes.string.isRequired,
        receiver_address: PropTypes.string.isRequired,
        receiver_name: PropTypes.string.isRequired,
        create_date_from: PropTypes.string.isRequired,
        create_date_to: PropTypes.string.isRequired,
        page_size: PropTypes.number.isRequired,
        page: PropTypes.number.isRequired,
    })
}
const mapStateToProps = (state) => {
    return {
        query: state.orderSearch,
        language: state.language,
        order: state.orderItem,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onChangeQuery: (query) => {
            dispatch(actChangeQuery(query));
        },
        onSearch: (query, isCount, lang) => {
            dispatch(actSearchRequest(query, isCount, lang));
        },
        onUpdateItem: (data) => {
            dispatch(actGetItem(data));
        },
        onAddUpdateItem: (type, item, query, setStateAction, resetFields, onResetItem, lang, intl) => {
            dispatch(actAddUpdateRequest(type, item, query, setStateAction, resetFields, onResetItem, lang, intl));
        },
        onResetItem: () => {
            dispatch(actGetItem({}));
        },
        onGetOrder: (id) => {
            dispatch(actGetOrderRequest(id));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateContainer);