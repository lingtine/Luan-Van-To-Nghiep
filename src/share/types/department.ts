export interface IDepartment {
  id: string;
  name: string;
  description: string;
  employeeIds: string[];
}

export interface IDepartmentInput {
  name: string;
  description: string;
  employeeIds: string[];
}

export interface IAddEmployeeInput {
  departmentId: string;
  employeeIds: string[];
}
