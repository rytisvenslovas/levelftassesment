import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
//logo
import logo from '../Assets/level.png'

const  NavBar:React.FC = () => {

  return (
    <AppBar position="static" sx={{ backgroundColor: 'transparent'}}>
        <Toolbar sx={{ marginLeft:"1%", width:"100%"}} disableGutters>
            <img src={logo} alt="Logo" style={{ height: '30px' }} />
        </Toolbar>
    </AppBar>
  );
}
export default NavBar;