import React from 'react'
import { EmployeeType } from '../Redux/Reducers/employeesReducer'

const View: React.FC<{employee:EmployeeType | null}> = ({employee}) => {

    const weeklyAvailableAdvance = employee ? (employee.hourlyWage * (employee.paidHours / employee.maxHoursPerWeek) * 0.3) : 0;
    const monthlyAvailableAdvance = (weeklyAvailableAdvance * 52) / 12;

    return (
        <div>
        {employee ?
            <div style={{ textAlign: 'left' }}>
                <h2 style={{ textAlign: 'left' }}>Name: <b style={{color:"greenyellow"}}>{employee.name}</b></h2> 
                <p style={{ textAlign: 'left' }}>Hourly wage: <b>{employee.hourlyWage}£</b></p> 
                <p style={{ textAlign: 'left' }}>Paid hours: <b>{employee.paidHours} hours</b></p> 
                <p style={{ textAlign: 'left' }}>Maximum hours per week: <b>{employee.maxHoursPerWeek} hours</b></p> 
                <h3 style={{ textAlign: 'left' }}>Weekly Available Advance: <b style={{color:"greenyellow"}}>{weeklyAvailableAdvance.toFixed(2)}£</b></h3> 
                <h3 style={{ textAlign: 'left' }}>Monthly Available Advance: <b style={{color:"greenyellow"}}>{monthlyAvailableAdvance.toFixed(2)}£</b></h3> 
            </div>
        : <h1>no information</h1> }
        </div>
    )
}

export default View
