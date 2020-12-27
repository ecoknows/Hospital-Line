import { DashboardHomeButtonTypes, DASHBOARD_HOME_BUTTON } from '../types';

interface dashBoardHomeBtnStates{
  homebtn: boolean
}
const initialState: dashBoardHomeBtnStates = {
    homebtn :false
}



export function dashboardHomeBtnReducer(state: dashBoardHomeBtnStates = initialState, action: DashboardHomeButtonTypes): dashBoardHomeBtnStates {
    switch (action.type) {
      case DASHBOARD_HOME_BUTTON: {
        return {
            homebtn: action.payload
        };
      }
      default:
        return state
    }
};

