export interface DepartmentInterface{
    name: string,
    departments: number[],
 }

export const HOSPITAL_UPDATE_DEPARTMENT = 'HospitalUpdateDepartment';
export const CLINIC_UPDATE_DEPARTMENT = 'ClinicUpdateDepartment'

interface HospitalUpdateDepartment {
    type: typeof HOSPITAL_UPDATE_DEPARTMENT,
    payload: DepartmentInterface
}

interface ClinicUpdateDepartment {
    type: typeof CLINIC_UPDATE_DEPARTMENT,
    payload: DepartmentInterface
}


export type ClinicDepartmentTypes = ClinicUpdateDepartment
export type HospitalDepartmentsTypes = HospitalUpdateDepartment