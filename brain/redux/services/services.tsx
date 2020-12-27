import { DepartmentInterface } from '../types';

export const appointmentService = {
    updateDepartment,
    updateHomeBtn,
};

async function updateDepartment({departments, name}: {departments: number[], name: string}): Promise<DepartmentInterface> {
    // return await getFromServer('/api/'
    return {departments, name}
}
async function updateHomeBtn(status: boolean): Promise<boolean> {
    // return await getFromServer('/api/'
    return status;
}