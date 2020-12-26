import { DepartmentInterface } from '../types';

export const appointmentService = {
    updateDepartment,
};

async function updateDepartment({departments, name}: {departments: number[], name: string}): Promise<DepartmentInterface> {
    // return await getFromServer('/api/'
    return {departments, name}
}