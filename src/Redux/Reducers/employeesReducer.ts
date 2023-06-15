import { Dispatch, AnyAction } from 'redux';
import services from '../../Services/services';

export interface EmployeeType {
  createdAt: string;
  name: string;
  hourlyWage: number;
  paidHours: number;
  maxHoursPerWeek: number;
  id: number;
}


const employeesReducer = (state: EmployeeType[] | null = null, action: any) => {
  switch (action.type) {
    case 'GET_EMPLOYEES':
      return action.data;
    case 'EDIT_EMPLOYEE':
      return state?.map((employee) => {
        if (employee.id === action.data.id) {
          return {
            ...employee,
            name: action.data.name,
            hourlyWage: action.data.hourlyWage,
            paidHours: action.data.paidHours,
            maxHoursPerWeek: action.data.maxHoursPerWeek,
          };
        }
        return employee;
      });
    case 'DELETE_EMPLOYEE':
      return state?.filter(employee => employee.id !== action.data);
    case 'ADD_NEW_EMPLOYEE':
        return state ? [...state, action.data] : [action.data];
    default:
      return state;
  }
};

export const getEmployees = () => {
  return async (dispatch: Dispatch) => {
    const employees = await services.getEmployeesFromAPI();
    dispatch({
      type: 'GET_EMPLOYEES',
      data: employees
    });
  };
};

export const editEmployee = (employee: EmployeeType) => {
  return async (dispatch: Dispatch) => {
      const editedEmployee:EmployeeType | null = await services.editEmployeeInAPI(employee);
      if(editedEmployee){
        dispatch({
          type: 'EDIT_EMPLOYEE',
          data: editedEmployee
      });
      } 
  };
};

export const deleteEmployee = (employee: EmployeeType) => {

  return async (dispatch: Dispatch) => {
      const deletedEmployee = await services.deleteEmployeeInAPI(employee);
      if(deletedEmployee){
        dispatch({
          type: 'DELETE_EMPLOYEE',
          data: deletedEmployee.id
        });
      }
  };
};


export const addNewEmployee = (employee: EmployeeType)=> {
  return async (dispatch: Dispatch) => {
    const newEmployee = await services.addNewEmployeeToAPI(employee);
    if(newEmployee){
      dispatch({
        type: 'ADD_NEW_EMPLOYEE',
        data: newEmployee
      });
    };
  };
} 

export default employeesReducer;
