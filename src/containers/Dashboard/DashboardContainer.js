import { connect } from 'react-redux';
import React, { Component } from 'react';
import { actGetDataAnalysisRequest } from '../../actions/dashboard';
import Dashboard from '../../components/Dashboard/Dashboard';


class DashboardContainer extends Component {

    componentWillMount(){
        let { language } = this.props;
        this.props.actGetData(language);
    }
    
    render() {
       let {rs} = this.props;
        return (
           <Dashboard rs={rs} ></Dashboard>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        rs: state.dashboard,
        language: state.language
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        actGetData: (lang) => {
            dispatch(actGetDataAnalysisRequest(lang))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer)


