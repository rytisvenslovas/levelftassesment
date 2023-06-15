import React from 'react'
import Button from '@mui/material/Button';
//redux
import {useSelector, useDispatch} from 'react-redux'
import { EmployeeType, deleteEmployee } from '../Redux/Reducers/employeesReducer';


const Delete:React.FC<{employee:EmployeeType | null, handleCloseBackDrop: () => void;}> = ({employee, handleCloseBackDrop}) => {

    const dispatch = useDispatch();

    const handleDeleteEmployee = () => {
        if(employee){
            deleteEmployee(employee)(dispatch);
            handleCloseBackDrop();
        }

    }
  return (
    <div>
      <h3>Are you sure you want to delete <b style={{color:"greenyellow"}}>{employee ? employee.name : 'this employee'}</b>?</h3>
      <div style={{ display: 'flex', gap: '5px', justifyContent:'center' }}>
        <Button size="small" variant="contained" color="error" onClick={handleDeleteEmployee}>Delete</Button>
        <Button size="small" variant="contained" color="success" onClick={handleCloseBackDrop}>Cancel</Button>
      </div>
    </div>
  )
}

export default Delete
