import { combineReducers } from 'redux';
import {clinicDepartmentReducer, hospitalDepartmentReducer} from './appointment.reducer';

export const rootReducer = combineReducers({
    hospital: hospitalDepartmentReducer,
    clinic: clinicDepartmentReducer,
})

export type RootState = ReturnType<typeof rootReducer>;