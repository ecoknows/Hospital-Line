import { ActionCreator } from 'redux';
import { DashboardHomeButtonTypes, DASHBOARD_HOME_BUTTON } from '../../redux/types'
import { appointmentService } from '../services/services';
import { failure, request } from './common.actions';

const updateHomeBtnSuccess : ActionCreator<DashboardHomeButtonTypes> = (data: boolean) =>{
    return { 
        type: DASHBOARD_HOME_BUTTON,
        payload: data
        };
}


export function updateHomeBtn(status: boolean){
    return dispatch => {
        dispatch(request());
        return appointmentService.updateHomeBtn(status)
        .then(
            response=>{
                dispatch(updateHomeBtnSuccess(response))
            },
            error => {
                dispatch(failure('Server Error'))
            }
        )
    }
}