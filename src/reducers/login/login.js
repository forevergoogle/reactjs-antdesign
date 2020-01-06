import * as Types from './../../constants/ActionTypes';
var initialState = {
    accessToken: '',
    user: {
        login_name: ''
    },
    isLoginPage: true
};

const login = (state = initialState, action) => {
    switch (action.type) {
        case Types.LOGIN:
            return action.data;
        case Types.LOGIN_ERROR:
            return action.data;
        case Types.LOGOUT:
            let logout = {
                accessToken: '',
                user: {
                    login_name: ''
                },
                isLoginPage: true
            }
            return logout;
        default: return state;
    }
};

export default login;