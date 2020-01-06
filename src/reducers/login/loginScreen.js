import { CHANGE_LOGIN_SCREEN } from './../../constants/ActionTypes';
import { LOGIN_STATUS_NORMAL } from './../../constants/constants';
let initialState = LOGIN_STATUS_NORMAL;

const loginScreen = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_LOGIN_SCREEN:
            state = action.screen;
            return state;
        default: 
            return state;
    }
};

export default loginScreen;