import React,{useEffect, useState} from 'react'
import './App.css';
import { CircularProgress, Backdrop } from '@mui/material';
//redux
import {useSelector, useDispatch} from 'react-redux';
import { RootState } from './store';
import {getEmployees}  from './Redux/Reducers/employeesReducer';
//compnents
import NavBar from './Components/NavBar';
import EmployeesTable from './Components/EmployeesTable';
import BackdropItem from './Components/BackdropItem';
//types
import { EmployeeType } from './Redux/Reducers/employeesReducer';

const App: React.FC = () => {
  const [openBackdrop, setOpenBackdrop] = useState<boolean>(false);
  const [typeOfBackdrop, setTypeOfBackdrop] = useState<string|null>(null);
  const [employee, setEmployee] = useState<EmployeeType|null>(null);

  const currentState = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    getEmployees()(dispatch);
  }, []);

  const handleCloseBackDrop = () => {
    setOpenBackdrop(false);
    setTypeOfBackdrop(null);
  };
  const handleOpenBackdrop = (type:string|null, employee:EmployeeType|null) => {
    setEmployee(employee)
    setTypeOfBackdrop(type)
    setOpenBackdrop(true)
  };


  return (
    <div style={{
      textAlign: 'center',
      backgroundColor: '#282c34',
      height: '100vh',
      width: '100vw',
      position: 'absolute',
      maxHeight: '100vh',
    }}>
      <NavBar/>
      <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          maxHeight: '100vh',
          paddingTop: '10px'
      }}>
        {currentState.employees === null ? <CircularProgress/> : <EmployeesTable employees={currentState.employees} handleOpenBackdrop={handleOpenBackdrop} />}
        <button style={{
            backgroundColor: 'greenyellow',
            borderRadius: '4px',
            position: 'absolute',
            bottom: '0',
            right: '0',
            margin: '10px',
        }} onClick={()=>{handleOpenBackdrop("add-new-employee", null)}}>Add new employee</button>
      </div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme: any) => theme.zIndex.drawer + 1, backgroundColor: 'rgba(0, 0, 0, 0.95)' }}
        open={openBackdrop}
        // onClick={handleClose}
      >
          <button
            style={{
              position: 'absolute',
              top: '25px',
              right: '10px',
              fontSize: '20px',
              color: 'pink',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
            className="close-button"
            onClick={handleCloseBackDrop}
            aria-label="Close"
          >
            <h2>x</h2>
          </button>
          <BackdropItem typeOfBackdrop={typeOfBackdrop} employee={employee} handleCloseBackDrop={handleCloseBackDrop}/>
      </Backdrop>
    </div>
  )
}

export default App
