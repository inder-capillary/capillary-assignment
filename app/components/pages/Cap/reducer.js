import { fromJS } from 'immutable';
import * as types from './constants';
import * as constants from '../App/constants';

import initialState from '../../../initialState';

const { REQUEST, SUCCESS, FAILURE } = constants;

const capReducer = (state = fromJS(initialState.loyaltyCap), action) => {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return state.set('loginStatus', REQUEST).set('loginError', null);
    case types.LOGIN_SUCCESS:
      return state
        .set('loginStatus', SUCCESS)
        .set('loginError', null)
        .set('token', action.res.token)
        .set('user', fromJS(action.res.user))
        .set('orgID', action.res.user.orgID);
    case types.LOGIN_FAILURE:
      return state.set('loginStatus', FAILURE).set(
        'loginError',
        fromJS({
          message: action.error.message,
          errorCode: action.error.response?.status,
        }),
      );
    case types.LOGOUT_REQUEST:
      return state.set('logoutStatus', REQUEST);
    case types.LOGOUT_SUCCESS:
      return state.set('logoutStatus', SUCCESS);
    case types.LOGOUT_FAILURE:
      return state
        .set('logoutStatus', FAILURE)
        .set('logoutError', fromJS(action.error));
    case types.GET_SIDEBAR_MENU_DATA_REQUEST:
      return state.set('sidebarMenuData', fromJS({ status: REQUEST }));
    case types.GET_SIDEBAR_MENU_DATA_SUCCESS:
      return state.set(
        'sidebarMenuData',
        fromJS({ status: SUCCESS, data: action.data }),
      );
    case types.GET_SIDEBAR_MENU_DATA_FAILURE:
      return state.set(
        'sidebarMenuData',
        fromJS({ status: FAILURE, error: action.error }),
      );
    case types.CLEAR_SIDEBAR_MENU_DATA:
      return state.set('sidebarMenuData', fromJS({}));
    case types.GET_TOPBAR_MENU_DATA_REQUEST:
      return state.set('topbarMenuData', fromJS({ status: REQUEST }));
    case types.GET_TOPBAR_MENU_DATA_SUCCESS:
      return state.set(
        'topbarMenuData',
        fromJS({ status: SUCCESS, data: action.data }),
      );
    case types.GET_TOPBAR_MENU_DATA_FAILURE:
      return state.set(
        'topbarMenuData',
        fromJS({ status: FAILURE, error: action.error }),
      );
    case types.CLEAR_TOPBAR_MENU_DATA:
      return state.set('topbarMenuData', fromJS({}));
    case types.SWITCH_ORG_REQUEST:
      return state.set('changeOrg', REQUEST);
    case types.SWITCH_ORG_SUCCESS:
      return state.set('orgID', action.orgID).set('changeOrg', SUCCESS);
    case types.SWITCH_ORG_FAILURE:
      return state.set(
        'changeOrg',
        fromJS({ status: FAILURE, error: action.error }),
      );
    case types.GET_USER_DATA_REQUEST:
      return state.set('fetchingUserdata', REQUEST);
    case types.GET_USER_DATA_SUCCESS:
      return state
        .set('fetchingUserdata', SUCCESS)
        .set('user', fromJS(action.userData))
        .set('currentOrgDetails', fromJS(action.currentOrgDetails))
        .set('orgID', action.currentOrgId);
    case types.GET_USER_DATA_FAILURE:
      return state.set('fetchingUserdata', FAILURE);
    case types.LAST_SYNC_TIME_REQUEST:
      return state
        .set('getLastSyncTimeStatus', REQUEST)
        .set('lastSyncTime', '')
        .set('lastSyncTimeError', null);
    case types.LAST_SYNC_TIME_SUCCESS:
      return state
        .set('getLastSyncTimeStatus', SUCCESS)
        .set('lastSyncTime', action.result);
    case types.LAST_SYNC_TIME_FAILURE:
      return state
        .set('getLastSyncTimeStatus', FAILURE)
        .set('lastSyncTimeError', action.error);
    default:
      return state;
  }
};

export default capReducer;
