import React, {useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { useTheme } from '@mui/material/styles';


//types
import {EmployeeType} from '../Redux/Reducers/employeesReducer';

interface EmployeesTableProps {
  employees: EmployeeType[];
  handleOpenBackdrop: (type: string, emplpyee:EmployeeType) => void;
}

interface Column {
  id: 'id' | 'name' | 'buttons' 
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'id', label: 'ID', minWidth: 5 },
  { id: 'name', label: 'NAME', minWidth: 90 },
  { id: 'buttons', label: '', minWidth: 120},
];




const EmployeesTable: React.FC<EmployeesTableProps> = ({ employees, handleOpenBackdrop }) => {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const theme = useTheme();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const buttonStyles = {
    marginRight: '2px',
  };



  return (
    <Paper sx={{
      minWidth: 500,
      [theme.breakpoints.down('sm')]: {
        minWidth: '100%',
      },
    }}>
      <TableContainer component={Paper} sx={{ maxHeight: 500, overflow: 'auto' }}>
        <Table stickyHeader aria-label="sticky table" sx={{ minWidth: 375 }}>
          <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell 
                    key={column.id}
                    align={column.align}
                    style={{ width: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
          <TableBody>
            {employees?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((employee) => (
              <TableRow
                key={employee.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {employee.id}
                </TableCell>
                <TableCell align="left">{employee.name}</TableCell>
                <TableCell align="right" sx={{ '& > button': buttonStyles }}>
                  <button onClick={()=>{handleOpenBackdrop("view", employee)}}>view</button>
                  <button onClick={()=>{handleOpenBackdrop("edit", employee)}}>edit</button>
                  <button onClick={()=>{handleOpenBackdrop("delete", employee)}} style={{backgroundColor: 'pink', borderRadius: '4px' }}>delete</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination         
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={employees?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}/>
    </Paper>
  );
}

export default EmployeesTable;