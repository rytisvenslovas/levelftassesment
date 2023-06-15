import React from 'react'
import { useTheme } from '@mui/material/styles';
//compoenents
import View from './View'
import Edit from './Edit'
import Delete from './Delete'
import AddNewEmployee from './AddNewEmployee'



//types
import { EmployeeType } from '../Redux/Reducers/employeesReducer'


const BackdropItem: React.FC<{typeOfBackdrop:string|null, employee:EmployeeType | null, handleCloseBackDrop: () => void;}> = ({typeOfBackdrop, employee, handleCloseBackDrop}) => {
    const theme = useTheme();

    let content = null;

    switch (typeOfBackdrop) {
        case 'view':
            content = <View employee={employee} />;
            break;
        case 'edit':
            content=  <Edit employee={employee} handleCloseBackDrop={handleCloseBackDrop}/>;
            break;
        case 'delete':
            content = <Delete employee={employee} handleCloseBackDrop={handleCloseBackDrop}/>;
            break;
        case 'add-new-employee':
            content = <AddNewEmployee handleCloseBackDrop={handleCloseBackDrop}/>;
            break;
        default:
            content =  <div>Invalid backdrop type</div>;
      }

    return (
        <div>
            <h2 style={{
                position: 'absolute', 
                top: 35, 
                left: 25,

            }}>{typeOfBackdrop?.replaceAll("-", " ").toUpperCase()}</h2>
            <div style={{
                 display: 'flex',
                 justifyContent: 'center',
                 alignItems: 'flex-start',
                 height: '100vh',
                 marginTop: '30vh',
                 [theme.breakpoints.down('sm')]: {
                   alignItems: 'center',
                   marginTop: 0,
                 },
            }}>
            {content}
            </div>
        </div>
    )
}

export default BackdropItem
