import { combineReducers } from 'redux';
import * as Types from './../constants/ActionTypes';
import login from './login/login';
import loginScreen from './login/loginScreen';
import manifest from './manifest/manifest';
import manifestSearch from './manifest/manifestSearch';
import manifestItem from './manifest/manifestItem';
import orders from './order/orders';
import orderCount from './order/orderCount';
import orderItem from './order/orderItem';
import orderImport from './order/orderImport';
import orderSearch from './order/orderSearch';
import tracking from './order/tracking';
import trackingCount from './order/trackingCount';
import lstFee from './root/lstFee';
import lstBranch from './root/lstBranch';
import lstStatus from './root/lstStatus';
import lstCountry from './root/lstCountry';
import lstManifest from './root/lstManifest';
import lstManifestImport from './root/lstManifestImport';
import lstShipper from './root/lstShipper';
import language from './root/language';
import dashboard from './dashboard/dashboard';

const appReducers = combineReducers({
    lstFee,
    lstBranch,
    lstStatus,
    lstCountry,
    lstManifest,
    lstManifestImport,
    lstShipper,
    login,
    loginScreen,
    manifest,
    manifestItem,
    manifestSearch,
    tracking,
    trackingCount,
    orders,
    orderCount,
    orderItem,
    orderImport,
    orderSearch,
    language,
    dashboard,
});

const rootReducer = (state, action) => {
    if (action.type === Types.LOGOUT) {
        state = undefined;
    }

    if (action.type === Types.CHANGE_PAGE) {
        state.loginScreen = undefined;
        // dashboard
        state.dashboard = undefined;
        
        // manifest
        state.manifest = undefined;
        state.manifestItem = undefined;
        state.manifestSearch = undefined;

        // order
        state.tracking = undefined;
        state.trackingCount = undefined;
        state.orders = undefined;
        state.orderItem = undefined;
        state.orderCount = undefined;
        state.orderSearch = undefined;
        state.orderImport = undefined;
    }

    return appReducers(state, action)
}

export default rootReducer;