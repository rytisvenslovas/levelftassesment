import axios  from 'axios';
import { EmployeeType } from '../Redux/Reducers/employeesReducer';

const baseURL = "https://6475b297e607ba4797dc5e3f.mockapi.io/api/v1/Employees";

const getEmployeesFromAPI = async () => {
    const response = await axios.get(baseURL);
    return response.data;
};

const addNewEmployeeToAPI = async (employee: EmployeeType) => {
    const response = await axios.post(baseURL, employee);
    if(response.status !== 201){
        throw new Error("Error adding new employee");
    }else{
        return response.data;

    }

};

const editEmployeeInAPI = async (employee: EmployeeType) => {
    const response = await axios.put(`${baseURL}/${employee.id}`, employee);
    if(response.status !== 200){
        throw new Error("Error editing employee");
    }else {
        return response.data;
    }
};

const deleteEmployeeInAPI = async (employee: EmployeeType) => {
    const response = await axios.delete(`${baseURL}/${employee.id}`);
    if(response.status !== 200){
        throw new Error("Error deleting employee");
    }else {
        return response.data;
    }
};

export default { getEmployeesFromAPI, addNewEmployeeToAPI, editEmployeeInAPI, deleteEmployeeInAPI };

