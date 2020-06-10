import React from 'react';
import './empdata.css';

const ListEmp = ({id, employee_name,employee_salary ,employee_age, handleChange }) =>{
    return (

            <div className="list-item">
                <div><span>{id}</span>{employee_name}</div>
            </div>
    )
}
export default ListEmp;