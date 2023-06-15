import React,{useState} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
//redux
import {useSelector, useDispatch} from 'react-redux'
import { editEmployee } from '../Redux/Reducers/employeesReducer';

//types
import { EmployeeType } from '../Redux/Reducers/employeesReducer';


const Edit: React.FC<{employee:EmployeeType | null, handleCloseBackDrop: () => void;}> = ({employee, handleCloseBackDrop})=> {

    const [name, setName] = useState<string>(employee ? employee.name : '');
    const [hourlyWage, setHourlyWage] = useState<string>(employee ? employee.hourlyWage.toString() : '');
    const [paidHours, setPaidHours] = useState<string>(employee ? employee.paidHours.toString() : '');
    const [maxHoursPerWeek, setMaxHoursPerWeek] = useState<string>(employee ? employee.maxHoursPerWeek.toString() : '');

    const dispatch = useDispatch();

    const handleSaveEmployee = () => {

        if(employee){
            
            const editedEmployee = {
                createdAt: employee.createdAt,
                name: name,
                hourlyWage: Number(hourlyWage),
                paidHours: Number(paidHours),
                maxHoursPerWeek: Number(maxHoursPerWeek),
                id: employee.id,
            }
    
            editEmployee(editedEmployee)(dispatch);
        }

      };
  

  return (
    <div>
      {employee ? (
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
      ) : (
        <h1>No information available</h1>
      )}
    </div>
  );
}

export default Edit
