import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actChangeQuery, actSearchRequest } from './../../actions/manifest';
import SearchForm from './../../components/Manifest/SearchForm';

class SearchContainer extends Component {

    render() {
        let { query, lstBranch, language } = this.props;
        return (
            <SearchForm
                query={query}
                lstBranch={lstBranch}
                onChangeQuery={this.props.onChangeQuery}
                onSearch={this.props.onSearch}
                language={language}
            />
        );
    }
}

SearchContainer.propTypes = {
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
        language: state.language
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onChangeQuery: (query) => {
            dispatch(actChangeQuery(query));
        },
        onSearch: (query, lang) => {
            dispatch(actSearchRequest(query, lang));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);