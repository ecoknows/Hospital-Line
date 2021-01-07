import { DepartmentInterface } from '../types';

export const appointmentService = {
    updateDepartment,
    updateHomeBtn,
};

async function updateDepartment({id, departments, name}: {id:string, departments: number[], name: string}): Promise<DepartmentInterface> {
    // return await getFromServer('/api/'
    return {id, departments, name}
}
async function updateHomeBtn(status: boolean): Promise<boolean> {
    // return await getFromServer('/api/'
    return status;
}