import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SearchForm from './../../components/Tracking/SearchForm';
import { actChangeQuery, actSearchRequest } from './../../actions/tracking';

class SearchContainer extends Component {

    render() {
        let { query, lstBranch, lstCountry, lstManifest, lstShipper, lstStatus, onChangeQuery, onSearch, language } = this.props;
        return (
            <SearchForm
                query={query}
                lstBranch={lstBranch}
                lstCountry={lstCountry}
                lstManifest={lstManifest}
                lstShipper={lstShipper}
                lstStatus={lstStatus}
                onChangeQuery={onChangeQuery}
                onSearch={onSearch}
                language={language}
            />
        );
    }
}

SearchContainer.propTypes = {
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
const mapStateToProps = state => {
    return {
        query: state.orderSearch,
        language: state.language
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onChangeQuery: (query) => {
            dispatch(actChangeQuery(query));
        },
        onSearch: (query, isCount, lang) => {
            dispatch(actSearchRequest(query, isCount, lang));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);