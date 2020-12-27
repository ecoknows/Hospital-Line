import { combineReducers } from 'redux';
import {clinicDepartmentReducer, hospitalDepartmentReducer} from './appointment.reducer';
import { dashboardHomeBtnReducer } from './dashboard.reducer';

export const rootReducer = combineReducers({
    hospital: hospitalDepartmentReducer,
    clinic: clinicDepartmentReducer,
    dashboard: dashboardHomeBtnReducer,
})

export type RootState = ReturnType<typeof rootReducer>;