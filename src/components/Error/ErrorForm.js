import React, { Component } from 'react';

class ErrorForm extends Component {

    render() {
        var { error_list, item_name } = this.props;
        var error = false;
        var error_content = '';
        var message = '';
        if (error_list.length > 0) {
            error_list.forEach(error_item => {
                if(error_item.item_name === item_name){
                    error = true;
                    message = error_item.message;
                }
            });
        }

        if (error){
            error_content = <span className="error">{message}</span>;
        }
        
        return(
            error_content
        );
    }
}

export default (ErrorForm);