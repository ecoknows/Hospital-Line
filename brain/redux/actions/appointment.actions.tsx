import { ActionCreator } from 'redux';
import { HospitalDepartmentsTypes, DepartmentInterface, HOSPITAL_UPDATE_DEPARTMENT, ClinicDepartmentTypes, CLINIC_UPDATE_DEPARTMENT } from '../../redux/types'
import { appointmentService } from '../services/services';
import { failure, request } from './common.actions';

const updateHospitalDepartmentSuccess : ActionCreator<HospitalDepartmentsTypes> = (data: DepartmentInterface) =>{
    return { 
        type: HOSPITAL_UPDATE_DEPARTMENT,
        payload: data
        };
}
const updateClinicDepartmentSuccess : ActionCreator<ClinicDepartmentTypes> = (data: DepartmentInterface) =>{
    return { 
        type: CLINIC_UPDATE_DEPARTMENT,
        payload: data
    };
}


export function updateHospitalDepartment({departments, name}:{departments: number[], name: string}){
    return dispatch => {
        dispatch(request());
        return appointmentService.updateDepartment({departments, name})
        .then(
            response=>{
                dispatch(updateHospitalDepartmentSuccess(response))
            },
            error => {
                dispatch(failure('Server Error'))
            }
        )
    }
}

export function updateCliniclDepartment({departments, name}:{departments: number[], name: string}){
    return dispatch => {
        dispatch(request());
        return appointmentService.updateDepartment({departments, name})
        .then(
            response=>{
                dispatch(updateClinicDepartmentSuccess(response))
            },
            error => {
                dispatch(failure('Server Error'))
            }
        )
    }
}