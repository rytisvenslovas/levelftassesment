import React,{useState} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

//redux
import {useSelector, useDispatch} from 'react-redux'
import { RootState } from '../store';
import { addNewEmployee } from '../Redux/Reducers/employeesReducer';

//types
import { EmployeeType } from '../Redux/Reducers/employeesReducer';


const AddNewEmployee: React.FC<{ handleCloseBackDrop: () => void;}> = ({ handleCloseBackDrop})=> {

    const [name, setName] = useState<string>('');
    const [hourlyWage, setHourlyWage] = useState<string>('');
    const [paidHours, setPaidHours] = useState<string>('');
    const [maxHoursPerWeek, setMaxHoursPerWeek] = useState<string>('');

    const dispatch = useDispatch();
    const employees = useSelector((state: RootState) => state.employees);




    const handleSaveEmployee = () => {
        const now = new Date().toISOString();

        const newEmployee: EmployeeType = {
            createdAt: now,
            name: name,
            hourlyWage: Number(hourlyWage),
            paidHours: Number(paidHours),
            maxHoursPerWeek: Number(maxHoursPerWeek),
            id: employees[employees.length - 1].id + 1,
        }


        // editEmployee(editedEmployee)(dispatch);
        addNewEmployee(newEmployee)(dispatch);
        handleCloseBackDrop();

      };
  

  return (
    <div>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': {
              m: 1,
              width: '25ch',
              color: 'white',
              '& .MuiInputBase-input': {
                color: 'white',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'white',
                },
                '&:hover fieldset': {
                  borderColor: 'white',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'greenyellow',
                },
              },
            },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              label="Name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              size="small"
              InputLabelProps={{ style: { color: 'white' } }}
              
            />
          </div>
          <div>
            <TextField
              label="Hourly wage"
              id="hourlyWage"
              value={hourlyWage}
              onChange={(e) => setHourlyWage(e.target.value)}
              InputLabelProps={{ style: { color: 'white' } }}
            />
          </div>
          <div>
            <TextField
              label="Paid hours"
              id="paidHours"
              value={paidHours}
              onChange={(e) => setPaidHours(e.target.value)}
              InputLabelProps={{ style: { color: 'white' } }}
            />
          </div>
          <div>
            <TextField
              label="Maximum hours per week"
              id="maxHoursPerWeek"
              value={maxHoursPerWeek}
              onChange={(e) => setMaxHoursPerWeek(e.target.value)}
              InputLabelProps={{ style: { color: 'white' } }}
            />
          </div>
          <Box style={{ display: 'flex', gap: '5px', justifyContent:'center'}}>
              <Button variant="contained" color="success" onClick={()=>{handleSaveEmployee()}}>
                Save
              </Button>
              <Button variant="contained" color="error" onClick={()=>{handleCloseBackDrop()}}>
                Cancel
              </Button>
            </Box>
        </Box>
    </div>
  );
}

export default AddNewEmployee
