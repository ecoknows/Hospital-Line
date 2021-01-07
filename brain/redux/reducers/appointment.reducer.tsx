import {HOSPITAL_UPDATE_DEPARTMENT, DepartmentInterface, HospitalDepartmentsTypes, ClinicDepartmentTypes, CLINIC_UPDATE_DEPARTMENT } from '../types';

interface hospitalStates{
  hospital: DepartmentInterface
}

interface clinicStates{
  clinic: DepartmentInterface
}

const initialStateHospital: hospitalStates = {
    hospital : {
      id: '',
      name: '',
      departments: [],
   }
}



const initialStateClinic: clinicStates = {
  clinic : {
    id: '',
    name: '',
    departments: [],
 }
}



export function hospitalDepartmentReducer(state: hospitalStates = initialStateHospital, action: HospitalDepartmentsTypes): hospitalStates {
    switch (action.type) {
      case HOSPITAL_UPDATE_DEPARTMENT: {
        return {
          hospital: action.payload
        };
      }
      default:
        return state
    }
};


export function clinicDepartmentReducer(state: clinicStates = initialStateClinic, action: ClinicDepartmentTypes): clinicStates {
  switch (action.type) {
    case CLINIC_UPDATE_DEPARTMENT: {
      return {
        clinic: action.payload
      };
    }
    default:
      return state
  }
};